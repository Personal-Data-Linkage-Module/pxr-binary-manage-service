/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import FileUploadDataEntity from './postgres/FileUploadDataEntity';
import FileUploadManageEntity from './postgres/FileUploadManageEntity';
/* eslint-enable */
import { getConnect } from '../common/GetConnection';
import Log from '../common/LogDecorator';

@Service()
export default class EntityOperation {
    /**
     * アップロードファイル管理レコード取得
     * @param manageId
     */
    @Log()
    public static async getFileUploadManage (manageId: string): Promise<FileUploadManageEntity> {
        const connection = await getConnect();
        // SQLを生成及び実行
        const ret = await connection
            .createQueryBuilder()
            .from(FileUploadManageEntity, 'file_upload_manage')
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('id = :id', { id: manageId })
            .getRawOne();
        return ret ? new FileUploadManageEntity(ret) : null;
    }

    /**
     * アップロードファイル管理レコード取得
     * @param manageId
     */
    @Log()
    public static async getFileUploadManages (status: number, offset: number, limit: number): Promise<FileUploadManageEntity[]> {
        const connection = await getConnect();
        // SQLを生成及び実行
        const sql = connection
            .createQueryBuilder()
            .from(FileUploadManageEntity, 'file_upload_manage')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (status !== null) {
            sql.andWhere('status = :status', { status: status });
        }
        const rets = await sql.offset(offset).limit(limit).getRawMany();
        const list: FileUploadManageEntity[] = [];
        for (const ret of rets) {
            list.push(new FileUploadManageEntity(ret));
        }
        return list;
    }

    /**
     * アップロードファイル管理レコード追加
     * @param em
     * @param entity
     */
    @Log()
    public static async insertFileUploadManage (em: EntityManager, entity: FileUploadManageEntity): Promise<InsertResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(FileUploadManageEntity)
            .values({
                id: entity.id,
                fileName: entity.fileName,
                status: entity.status,
                chunkCount: entity.chunkCount,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * アップロードファイル管理レコード更新
     * @param em
     * @param entity
     */
    @Log()
    public static async updateFileUploadManage (em: EntityManager, entity: FileUploadManageEntity): Promise<UpdateResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .update(FileUploadManageEntity)
            .set({
                status: entity.status,
                updatedBy: entity.updatedBy
            })
            .where('id = :id', { id: entity.id })
            .execute();
        return ret;
    }

    /**
     * アップロードファイル管理レコード更新
     * @param em
     * @param entity
     */
    @Log()
    public static async deleteFileUploadManage (em: EntityManager, entity: FileUploadManageEntity): Promise<UpdateResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .update(FileUploadManageEntity)
            .set({
                isDisabled: entity.isDisabled,
                updatedBy: entity.updatedBy
            })
            .where('id = :id', { id: entity.id })
            .execute();
        return ret;
    }

    /**
     * ファイルアップロードデータレコード取得
     * @param manageId
     * @param status
     */
    @Log()
    public static async getFileUploadDataCount (manageId: string, statusList: number[]): Promise<number> {
        const connection = await getConnect();
        // SQLを生成及び実行
        const ret = await connection
            .createQueryBuilder()
            .select('COUNT(file_upload_data.id)', 'count')
            .from(FileUploadDataEntity, 'file_upload_data')
            .innerJoin(FileUploadManageEntity, 'file_upload_manage', 'file_upload_manage.id = file_upload_data.file_upload_manage_id')
            .where('file_upload_manage.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('file_upload_data.file_upload_manage_id = :file_upload_manage_id', { file_upload_manage_id: manageId })
            .andWhere('file_upload_manage.status IN (:...status)', { status: statusList })
            .getRawOne();
        return Number(ret['count']);
    }

    /**
     * ファイルアップロードデータレコード取得
     * @param manageId
     * @param chunkNo
     */
    @Log()
    public static async getFileUploadDataByChunkNo (manageId: string, chunkNo: number): Promise<FileUploadDataEntity> {
        const connection = await getConnect();
        // SQLを生成及び実行
        const ret = await connection
            .createQueryBuilder()
            .from(FileUploadDataEntity, 'file_upload_data')
            .innerJoin(FileUploadManageEntity, 'file_upload_manage', 'file_upload_manage.id = file_upload_data.file_upload_manage_id')
            .where('file_upload_manage.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('file_upload_data.file_upload_manage_id = :file_upload_manage_id', { file_upload_manage_id: manageId })
            .andWhere('file_upload_data.seq_no = :seq_no', { seq_no: chunkNo })
            .getRawOne();
        return ret ? new FileUploadDataEntity(ret) : null;
    }

    /**
     * ファイルアップロードデータレコード追加
     * @param em
     * @param entity
     */
    @Log()
    public static async insertFileUploadData (em: EntityManager, entity: FileUploadDataEntity): Promise<InsertResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(FileUploadDataEntity)
            .values({
                fileUploadManageId: entity.fileUploadManageId,
                seqNo: entity.seqNo,
                fileData: entity.fileData,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return ret;
    }
}
