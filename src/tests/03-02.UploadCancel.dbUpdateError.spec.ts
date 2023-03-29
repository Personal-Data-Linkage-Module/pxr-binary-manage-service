/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/

/* eslint-disable */
import { InsertResult, UpdateResult, EntityManager } from 'typeorm';
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import { Url } from './Common';
import { Session } from './Session';
import FileUploadManageEntity from '../repositories/postgres/FileUploadManageEntity';
import Config from '../common/Config';
import urljoin = require('url-join');
import EntityOperation from '../repositories/EntityOperation';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

// テストモジュールをインポート
jest.spyOn(EntityOperation, 'updateFileUploadManage')
    .mockImplementation(async (em: EntityManager, domain: FileUploadManageEntity): Promise<InsertResult> => {
        throw new Error('Unit Test DB Error');
    });

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;

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
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
    });
    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
    });

    /**
     * ファイルアップロードキャンセル
     */
    describe('ファイルアップロードキャンセル', () => {
        test('異常：DBアップデートエラー', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
