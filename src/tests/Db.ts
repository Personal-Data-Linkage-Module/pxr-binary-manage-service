/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, createConnection, getConnectionManager } from 'typeorm';
/* eslint-enable */
import FileUploadDataEntity from '../repositories/postgres/FileUploadDataEntity';
import FileUploadManageEntity from '../repositories/postgres/FileUploadManageEntity';
import fs = require('fs');

// configファイルを読み込む
const connectOption = JSON.parse(fs.readFileSync('./config/ormconfig.json', 'UTF-8'));

// エンティティを設定
connectOption['entities'] = [
    FileUploadDataEntity,
    FileUploadManageEntity
];

/**
 * DBクラス
 */
export default class Db {
    /**
     * DB接続オブジェクト
     */
    private connection: Connection = null;

    /**
     * DB接続オブジェクト取得
     */
    public getConnect (): Connection {
        return this.connection;
    }

    /**
     * DB接続
     */
    public async connect () {
        try {
            // DBに接続
            this.connection = await createConnection(connectOption);
        } catch (err) {
            if (err.name === 'AlreadyHasActiveConnectionError') {
                this.connection = getConnectionManager().get('postgres');
            } else {
                throw err;
            }
        }
    }

    /**
     * DB切断
     */
    public async disconnect () {
        if (this.connection && this.connection.isConnected) {
            // DB切断
            await this.connection.close();
        }
    }
}
