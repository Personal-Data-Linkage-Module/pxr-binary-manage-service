/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Db from './Db';
import path = require('path');
import fs = require('fs');

// テスト用にlisten数を無制限に設定
require('events').EventEmitter.defaultMaxListeners = 0;

/**
 * URL
 */
export namespace Url {
    /**
     * ベースURL
     */
    export const baseURI: string = '/binary-manage';

    /**
     * アップロード
     */
    export const uploadURI: string = baseURI + '/upload';

    /**
     * アップロード開始
     */
    export const uploadStartURI: string = uploadURI + '/start';

    /**
     * アップロード終了
     */
    export const uploadEndURI: string = uploadURI + '/end';

    /**
     * アップロードキャンセル
     */
    export const uploadCancelURI: string = uploadURI + '/cancel';

    /**
     * ダウンロード
     */
    export const downloadURI: string = baseURI + '/download';

    /**
     * ダウンロード開始
     */
    export const downloadStartURI: string = downloadURI + '/start';

    /**
     * ダウンロード終了
     */
    export const downloadEndURI: string = downloadURI + '/end';

    /**
     * ダウンロードキャンセル
     */
    export const downloadCancelURI: string = downloadURI + '/cancel';
}

/**
 * テスト用共通クラス
 */
export default class Common {
    /**
     * DBオブジェクトを取得
     */
    private db: Db = null;

    /**
     * コンストラクタ
     */
    public constructor () {
        this.db = new Db();
    }

    /**
     * DB接続
     */
    public async connect () {
        await this.db.connect();
    }

    /**
     * DB切断
     */
    public async disconnect () {
        await this.db.disconnect();
    }

    /**
     * SQLファイル実行
     * @param fileName
     */
    public async executeSqlFile (fileName: string) {
        // ファイルをオープン
        const fd: number = fs.openSync(path.join('./ddl/unit-test/', fileName), 'r');

        // ファイルからSQLを読込
        const sql: string = fs.readFileSync(fd, 'UTF-8');

        // ファイルをクローズ
        fs.closeSync(fd);

        // DBを初期化
        const connect = this.db.getConnect();
        if (!connect || !connect.isConnected) {
            await this.db.connect();
        }
        await this.db.getConnect().query(sql);
    }

    /**
     * SQL実行
     * @param sql
     */
    public async executeSqlString (sql: string) {
        // DBを初期化
        const connect = this.db.getConnect();
        if (!connect || !connect.isConnected) {
            await this.db.connect();
        }
        await this.db.getConnect().query(sql);
    }
}
