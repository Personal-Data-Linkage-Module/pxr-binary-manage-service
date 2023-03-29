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
import BinaryManageServiceDto from './dto/BinaryManageServiceDto';
/* eslint-enable */
import { getConnect } from '../common/GetConnection';
import EntityOperation from '../repositories/EntityOperation';
import FileUploadManageEntity from '../repositories/postgres/FileUploadManageEntity';
import GetBinaryManageResDto from '../resources/dto/GetBinaryManageResDto';
import DeleteBinaryManageResDto from '../resources/dto/DeleteBinaryManageResDto';

/**
 * バイナリ管理サービス
 */
export default class BinaryManageService {
    /**
     * ファイル管理データ取得
     * @param dto
     */
    public async getBinaryManage (dto: BinaryManageServiceDto): Promise<GetBinaryManageResDto[]> {
        // 対象ファイル管理ID、ファイル分割Noのバイナリデータを取得
        const fileUploadManages = await EntityOperation.getFileUploadManages(dto.status, dto.offset, dto.limit);
        const res: GetBinaryManageResDto[] = [];
        for (const fileUploadManage of fileUploadManages) {
            const ele = new GetBinaryManageResDto();
            ele.id = fileUploadManage.id;
            ele.status = fileUploadManage.status;
            ele.fileName = fileUploadManage.fileName;
            ele.chunkCount = fileUploadManage.chunkCount;
            res.push(ele);
        }
        // レスポンスを返す
        return res;
    }

    /**
     * ファイル管理データ削除
     * @param dto
     */
    public async deleteBinaryManage (dto: BinaryManageServiceDto): Promise<DeleteBinaryManageResDto> {
        // トランザクション開始
        const connection = await getConnect();
        await connection.transaction(async (em: EntityManager) => {
            // ファイルダウンロード管理テーブル更新データを生成
            const entity = new FileUploadManageEntity({
                id: dto.manageId,
                is_disabled: true,
                updated_by: dto.operator.loginId
            });
            // ステータスをダウンロード中で更新
            await EntityOperation.deleteFileUploadManage(em, entity);
        }).catch(err => {
            throw err;
        });

        // レスポンスを生成
        const res = new DeleteBinaryManageResDto();
        res.id = dto.manageId;
        // レスポンスを返す
        return res;
    }
}
