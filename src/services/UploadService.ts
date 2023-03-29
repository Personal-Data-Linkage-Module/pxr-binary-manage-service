/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーの処理を実装します。

/* eslint-disable */
import { EntityManager } from 'typeorm';
import UploadServiceDto from './dto/UploadServiceDto';
/* eslint-enable */
import { v4 as uuid } from 'uuid';
import AppError from '../common/AppError';
import Config from '../common/Config';
import { getConnect } from '../common/GetConnection';
import { ResponseCode } from '../common/ResponseCode';
import EntityOperation from '../repositories/EntityOperation';
import FileUploadDataEntity from '../repositories/postgres/FileUploadDataEntity';
import FileUploadManageEntity, { StatusCode, StatusName } from '../repositories/postgres/FileUploadManageEntity';
import PostUploadResDto from '../resources/dto/PostUploadResDto';
import PostUploadStartResDto from '../resources/dto/PostUploadStartResDto';
import PostUploadEndResDto from '../resources/dto/PostUploadEndResDto';
import PostUploadCancelResDto from '../resources/dto/PostUploadCancelResDto';
const message = Config.ReadConfig('./config/message.json');

/**
 * アップロードサービス
 */
export default class UploadService {
    // SDE-IMPL-REQUIRED サービスレイヤの処理を以下に実装します。

    /**
     * アップロード開始
     * @param connection
     * @param dto
     */
    public async uploadStart (dto: UploadServiceDto): Promise<any> {
        // UUIDを発行
        const id: string = uuid();

        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // ファイルアップロード管理テーブル追加データを生成
            const uploadEntity = new FileUploadManageEntity({
                id: id,
                file_name: dto.fileName,
                status: StatusCode.Uploading,
                chunk_count: dto.chunkCount,
                created_by: dto.operator.loginId,
                updated_by: dto.operator.loginId
            });

            // ステータスをアップロード中で登録
            await EntityOperation.insertFileUploadManage(em, uploadEntity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const response = new PostUploadStartResDto();
        response.id = id;

        // レスポンスを返す
        return response;
    }

    /**
     * アップロード終了
     * @param dto
     */
    public async uploadEnd (dto: UploadServiceDto): Promise<any> {
        // 対象ファイル管理IDの分割ファイル数を取得
        const manageInfo = await EntityOperation.getFileUploadManage(dto.manageId);
        if (!manageInfo) {
            // 対象データが存在しない場合、エラーを返す
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }
        // ステータスが既にアップロード完了の場合
        const response = new PostUploadEndResDto();
        if (manageInfo.status === StatusCode.UploadComplete) {
            // レスポンスを生成
            response.id = dto.manageId;
            response.result = StatusName.UploadComplete;

            // レスポンスを返す
            return response;
        }

        // 対象ファイル管理IDのアップロード中ファイル数を取得
        const status = [StatusCode.Uploading];
        const uploadCount = await EntityOperation.getFileUploadDataCount(dto.manageId, status);

        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // 分割ファイル数とアップロード中ファイル数が一致しない場合
            if (manageInfo.chunkCount !== uploadCount) {
                // ファイルアップロード管理テーブル更新データを生成
                const failedEntity = new FileUploadManageEntity({
                    id: dto.manageId,
                    status: StatusCode.UploadFailed,
                    updated_by: dto.operator.loginId
                });
                // ステータスをアップロード失敗で更新
                await EntityOperation.updateFileUploadManage(em, failedEntity);

                // エラーを返す
                throw new AppError(message.FILE_COUNT_ERROR, ResponseCode.BAD_REQUEST);
            }
            // ファイルアップロード管理テーブル更新データを生成
            const completeEntity = new FileUploadManageEntity({
                id: dto.manageId,
                status: StatusCode.UploadComplete,
                updated_by: dto.operator.loginId
            });
            // ステータスをアップロード完了で更新
            await EntityOperation.updateFileUploadManage(em, completeEntity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        response.id = dto.manageId;
        response.result = StatusName.UploadComplete;

        // レスポンスを返す
        return response;
    }

    /**
     * アップロードキャンセル
     * @param dto
     */
    public async uploadCancel (dto: UploadServiceDto): Promise<any> {
        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // ファイルアップロード管理テーブル更新データを生成
            const uploadEntity = new FileUploadManageEntity({
                id: dto.manageId,
                status: StatusCode.UploadCanceled,
                updated_by: dto.operator.loginId
            });

            // ステータスをアップロードキャンセルで更新
            await EntityOperation.updateFileUploadManage(em, uploadEntity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const response = new PostUploadCancelResDto();
        response.id = dto.manageId;
        response.result = StatusName.UploadCanceled;

        // レスポンスを返す
        return response;
    }

    /**
     * アップロード
     * @param dto
     */
    public async upload (dto: UploadServiceDto): Promise<any> {
        // 対象ファイル管理ID、ファイル分割Noのファイル情報を取得
        const dataInfo = await EntityOperation.getFileUploadDataByChunkNo(dto.manageId, dto.chunkNo);

        // 対象データが既に存在する場合
        if (dataInfo) {
            // エラーを返す
            throw new AppError(message.ALREADY_DATA, ResponseCode.CONFLICT);
        }

        // 対象ファイル管理IDの分割ファイル数を取得
        const status = [StatusCode.Uploading];
        const uploadCount = await EntityOperation.getFileUploadDataCount(dto.manageId, status);

        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // ファイルアップロードデータテーブル追加データを生成
            const uploadEntity = new FileUploadDataEntity({
                file_upload_manage_id: dto.manageId,
                seq_no: uploadCount + 1,
                file_data: dto.request.body,
                created_by: dto.operator.loginId,
                updated_by: dto.operator.loginId
            });
            // アップロードデータを追加
            await EntityOperation.insertFileUploadData(em, uploadEntity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const response = new PostUploadResDto();
        response.id = dto.manageId;
        response.chunkNo = dto.chunkNo;

        // レスポンスを返す
        return response;
    }
}
