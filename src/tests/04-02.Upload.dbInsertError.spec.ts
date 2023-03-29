/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { InsertResult, UpdateResult, EntityManager } from 'typeorm';
import FileUploadDataEntity from '../repositories/postgres/FileUploadDataEntity';
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import urljoin = require('url-join');
import fs = require('fs');
import EntityOperation from '../repositories/EntityOperation';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

// テストモジュールをインポート
jest.spyOn(EntityOperation, 'getFileUploadDataByChunkNo')
    .mockImplementation(async (manageId: string, chunkNo: number): Promise<FileUploadDataEntity> => {
        return null;
    });
jest.spyOn(EntityOperation, 'getFileUploadDataCount')
    .mockImplementation(async (manageId: string, statusList: number[]): Promise<number> => {
        return 0;
    });
jest.spyOn(EntityOperation, 'insertFileUploadData')
    .mockImplementation(async (em: EntityManager, domain: FileUploadDataEntity): Promise<InsertResult> => {
        throw new Error('Unit Test DB Error');
    });

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

/**
 * binary-manage API のユニットテスト
 */
describe('binary-manage API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
    });
    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // DB切断
        // await common.disconnect();

        // サーバ停止
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
    });

    /**
     * ファイルアップロード
     */
    describe('ファイルアップロード', () => {
        test('異常：DBインサートエラー', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_binary_manage.file_upload_manage
                (
                    id, file_name, status, chunk_count, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '990e8400-e29b-41d4-a716-446655440000', 'test.jpg', 0, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
