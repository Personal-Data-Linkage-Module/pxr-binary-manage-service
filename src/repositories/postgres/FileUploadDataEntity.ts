/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

/**
 * アップロードファイルデータテーブル エンティティクラス
 */
@Entity('file_upload_data')
export default class FileUploadDataEntity extends BaseEntity {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * アップロードファイル管理ID
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'file_upload_manage_id' })
    fileUploadManageId: string = null;

    /**
     * 連番
     */
    @Column({ type: 'bigint', nullable: false, default: 0, name: 'seq_no' })
    seqNo: number = 0;

    /**
     * ファイルデータ(バイナリ)
     */
    @Column({ type: 'bytea', nullable: false, name: 'file_data' })
    fileData: Uint8Array = null;

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
            this.id = entity['id'] ? Number(entity['id']) : 0;
            this.fileUploadManageId = entity['file_upload_manage_id'];
            this.seqNo = entity['seq_no'] ? Number(entity['seq_no']) : 0;
            this.fileData = entity['file_data'];
            this.createdBy = entity['created_by'];
            this.createdAt = entity['created_at'] ? new Date(entity['created_at']) : null;
            this.updatedBy = entity['updated_by'];
            this.updatedAt = entity['updated_at'] ? new Date(entity['updated_at']) : null;
        }
    }
}
