/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import FileUploadDataEntity from '../postgres/FileUploadDataEntity';
import FileUploadManageEntity from '../postgres/FileUploadManageEntity';
/* eslint-enable */
import Log from '../../common/LogDecorator';

@Service()
export default class EntityOperation {
    /**
     * アップロードファイル管理レコード取得
     * @param manageId
     */
    @Log()
    public static async getFileUploadManage (manageId: string): Promise<FileUploadManageEntity> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * アップロードファイル管理レコード取得
     * @param manageId
     */
    @Log()
    public static async getFileUploadManages (status: number, offset: number, limit: number): Promise<FileUploadManageEntity[]> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * アップロードファイル管理レコード追加
     * @param em
     * @param entity
     */
    @Log()
    public static async insertFileUploadManage (em: EntityManager, entity: FileUploadManageEntity): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * アップロードファイル管理レコード更新
     * @param em
     * @param entity
     */
    @Log()
    public static async updateFileUploadManage (em: EntityManager, entity: FileUploadManageEntity): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * アップロードファイル管理レコード更新
     * @param em
     * @param entity
     */
    @Log()
    public static async deleteFileUploadManage (em: EntityManager, entity: FileUploadManageEntity): Promise<UpdateResult> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * ファイルアップロードデータレコード取得
     * @param manageId
     * @param status
     */
    @Log()
    public static async getFileUploadDataCount (manageId: string, status: number): Promise<number> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * ファイルアップロードデータレコード取得
     * @param manageId
     * @param chunkNo
     */
    @Log()
    public static async getFileUploadDataByChunkNo (manageId: string, chunkNo: number): Promise<FileUploadDataEntity> {
        throw new Error('Unit Test DB Error');
    }

    /**
     * ファイルアップロードデータレコード追加
     * @param em
     * @param entity
     */
    @Log()
    public static async insertFileUploadData (em: EntityManager, entity: FileUploadDataEntity): Promise<InsertResult> {
        throw new Error('Unit Test DB Error');
    }
}
