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
import FileUploadDataEntity from '../repositories/postgres/FileUploadDataEntity';
import DownloadServiceDto from './dto/DownloadServiceDto';
/* eslint-enable */
import AppError from '../common/AppError';
import Config from '../common/Config';
import { getConnect } from '../common/GetConnection';
import { ResponseCode } from '../common/ResponseCode';
import EntityOperation from '../repositories/EntityOperation';
import FileUploadManageEntity, { StatusCode, StatusName } from '../repositories/postgres/FileUploadManageEntity';
import PostDownloadStartResDto from '../resources/dto/PostDownloadStartResDto';
import PostDownloadEndResDto from '../resources/dto/PostDownloadEndResDto';
import PostDownloadCancelResDto from '../resources/dto/PostDownloadCancelResDto';
const message = Config.ReadConfig('./config/message.json');

/**
 * ダウンロードサービス
 */
export default class DownloadService {
    // SDE-IMPL-REQUIRED サービスレイヤの処理を以下に実装します。

    /**
     * ダウンロード
     * @param dto
     */
    public async download (dto: DownloadServiceDto): Promise<FileUploadDataEntity> {
        // 対象ファイル管理ID、ファイル分割Noのバイナリデータを取得
        const dataInfo = await EntityOperation.getFileUploadDataByChunkNo(dto.manageId, dto.chunkNo);
        if (!dataInfo) {
            // 対象データが存在しない場合、エラーを返す
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }
        // レスポンスを返す
        return dataInfo;
    }

    /**
     * ダウンロード開始
     * @param dto
     */
    public async downloadStart (dto: DownloadServiceDto): Promise<any> {
        // アップロード完了のデータを取得
        const statusList = [StatusCode.UploadComplete, StatusCode.DownloadComplete, StatusCode.DownloadCanceled, StatusCode.DownloadFailed];
        const uploadCount: number = await EntityOperation.getFileUploadDataCount(dto.manageId, statusList);
        if (uploadCount <= 0) {
            // アップロード完了のデータが存在しない場合、エラーを返す
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }
        // アップロード完了のデータを取得
        const uploadInfo = await EntityOperation.getFileUploadManage(dto.manageId);

        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // ファイルダウンロード管理テーブル更新データを生成
            const entity = new FileUploadManageEntity({
                id: dto.manageId,
                status: StatusCode.Downloading,
                updated_by: dto.operator.loginId
            });
            // ステータスをダウンロード中で更新
            await EntityOperation.updateFileUploadManage(em, entity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const response = new PostDownloadStartResDto();
        response.id = dto.manageId;
        response.chunkCount = uploadCount;
        response.fileName = uploadInfo.fileName;

        // レスポンスを返す
        return response;
    }

    /**
     * ダウンロード終了
     * @param dto
     */
    public async downloadEnd (dto: DownloadServiceDto): Promise<any> {
        // 対象ファイル管理IDの分割ファイル数を取得
        const manageInfo = await EntityOperation.getFileUploadManage(dto.manageId);
        if (!manageInfo) {
            // 対象データが存在しない場合、エラーを返す
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        // 対象ファイル管理IDのダウンロード中ファイル数を取得
        const status = [StatusCode.Downloading];
        const downloadCount = await EntityOperation.getFileUploadDataCount(dto.manageId, status);

        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // 分割ファイル数とダウンロード中ファイル数が一致しない場合
            if (manageInfo.chunkCount !== downloadCount) {
                // ファイルアップロード管理テーブル更新データを生成
                const failedEntity = new FileUploadManageEntity({
                    id: dto.manageId,
                    status: StatusCode.DownloadFailed,
                    updated_by: dto.operator.loginId
                });
                // ステータスをダウンロード失敗で更新
                await EntityOperation.updateFileUploadManage(em, failedEntity);

                // エラーを返す
                throw new AppError(message.FILE_COUNT_ERROR, ResponseCode.BAD_REQUEST);
            }
            // ファイルダウンロード管理テーブル更新データを生成
            const completeEntity = new FileUploadManageEntity({
                id: dto.manageId,
                status: StatusCode.DownloadComplete,
                updated_by: dto.operator.loginId
            });
            // ステータスをダウンロード完了で更新
            await EntityOperation.updateFileUploadManage(em, completeEntity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const response = new PostDownloadEndResDto();
        response.id = dto.manageId;
        response.result = StatusName.DownloadComplete;

        // レスポンスを返す
        return response;
    }

    /**
     * ダウンロードキャンセル
     * @param dto
     */
    public async downloadCancel (dto: DownloadServiceDto): Promise<any> {
        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // ファイルダウンロード管理テーブル更新データを生成
            const entity = new FileUploadManageEntity({
                id: dto.manageId,
                status: StatusCode.DownloadCanceled,
                updated_by: dto.operator.loginId
            });

            // ステータスをダウンロードキャンセルで更新
            await EntityOperation.updateFileUploadManage(em, entity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const response = new PostDownloadCancelResDto();
        response.id = dto.manageId;
        response.result = StatusName.DownloadCanceled;

        // レスポンスを返す
        return response;
    }
}
