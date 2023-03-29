/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

/**
 * ステータスコード
 */
export namespace StatusCode {
    /**
     * アップロード中(0)
     */
    export const Uploading: number = 0;

    /**
     * アップロード完了(1)
     */
    export const UploadComplete: number = 1;

    /**
     * アップロードキャンセル(2)
     */
    export const UploadCanceled: number = 2;

    /**
     * アップロード失敗(3)
     */
    export const UploadFailed: number = 3;

    /**
     * ダウンロード中(10)
     */
    export const Downloading: number = 10;

    /**
     * ダウンロード完了(11)
     */
    export const DownloadComplete: number = 11;

    /**
     * ダウンロードキャンセル(12)
     */
    export const DownloadCanceled: number = 12;

    /**
     * ダウンロード失敗(13)
     */
    export const DownloadFailed: number = 13;
}

/**
 * ステータス名称
 */
export namespace StatusName {
    /**
     * アップロード中(0)
     */
    export const Uploading: string = 'Uploading';

    /**
     * アップロード完了(1)
     */
    export const UploadComplete: string = 'Complete';

    /**
     * アップロードキャンセル(2)
     */
    export const UploadCanceled: string = 'Canceled';

    /**
     * アップロード失敗(3)
     */
    export const UploadFailed: string = 'Failed';

    /**
     * ダウンロード中(10)
     */
    export const Downloading: string = 'Downloading';

    /**
     * ダウンロード完了(11)
     */
    export const DownloadComplete: string = 'Complete';

    /**
     * ダウンロードキャンセル(12)
     */
    export const DownloadCanceled: string = 'Canceled';

    /**
     * ダウンロード失敗(13)
     */
    export const DownloadFailed: string = 'Failed';
}

/**
 * アップロードファイル管理テーブル エンティティクラス
 */
@Entity('file_upload_manage')
export default class FileUploadManageEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryColumn({ type: 'varchar', length: 255 })
    id: string = null;

    /**
     * ファイル名
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'file_name' })
    fileName: string = null;

    /**
     * ステータス
     */
    @Column({ type: 'smallint', nullable: false, default: 0, name: 'status' })
    status: number = 0;

    /**
     * ファイル分割数
     */
    @Column({ type: 'bigint', nullable: false, default: 0, name: 'chunk_count' })
    chunkCount: number = 0;

    /**
     * 削除フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /**
     * 登録者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string = '';

    /**
     * 登録日時
     */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'created_at' })
    readonly createdAt: Date = new Date();

    /**
     * 更新者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string = '';

    /**
     * 更新日時
     */
    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'updated_at' })
    readonly updatedAt: Date = new Date();

    /**
     * コンストラクタ
     * @param entity
     */
    constructor (entity: {}) {
        super();
        if (entity) {
            this.id = entity['id'];
            this.fileName = entity['file_name'];
            this.status = entity['status'] ? Number(entity['status']) : 0;
            this.chunkCount = entity['chunk_count'] ? Number(entity['chunk_count']) : 0;
            this.isDisabled = entity['is_disabled'] ? Boolean(entity['is_disabled']) : false;
            this.createdBy = entity['created_by'];
            this.createdAt = entity['created_at'] ? new Date(entity['created_at']) : null;
            this.updatedBy = entity['updated_by'];
            this.updatedAt = entity['updated_at'] ? new Date(entity['updated_at']) : null;
        }
    }
}
