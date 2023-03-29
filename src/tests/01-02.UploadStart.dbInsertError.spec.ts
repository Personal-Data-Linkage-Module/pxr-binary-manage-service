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
import Config from '../common/Config';
import FileUploadManageEntity from '../repositories/postgres/FileUploadManageEntity';
import EntityOperation from '../repositories/EntityOperation';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

// テストモジュールをインポート
jest.spyOn(EntityOperation, 'insertFileUploadManage')
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
     * ファイルアップロード開始
     */
    describe('ファイルアップロード開始', () => {
        test('異常：DBインサートエラー', async () => {
            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
    });
});
