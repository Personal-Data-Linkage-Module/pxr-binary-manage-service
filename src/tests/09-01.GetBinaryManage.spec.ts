/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer from './StubOperatorServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// オペレーターサービスの宣言
let _operatorServer: StubOperatorServer = null;

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
        // スタブサーバー停止
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
    });

    /**
     * ファイル管理データ取得
     */
    describe('ファイル管理データ取得', () => {
        test('正常：statusの指定あり', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_binary_manage.file_upload_manage
                (id, file_name, status, chunk_count, is_disabled, created_by, created_at, updated_by, updated_at)
                VALUES
                ('990e8400-e29b-41d4-a716-446655440000', 'test.jpg', 0, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('db20d94d-aa3a-129c-9f78-35a1f25d2196', 'test2.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('905711e2-ccfe-019b-3a61-0d2d75fb06bd', 'test3.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('9ef4898e-fed9-a23f-14e9-e2714c3629fb', 'test4.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('b837253c-9c2f-9e51-2298-7ef3eb1242d5', 'test5.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('222f5e64-b991-0bb8-3947-072753797fa3', 'test6.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('5e44cd1b-853f-625b-8fca-43a1f335972b', 'test7.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('5d09c82a-da3d-e0fa-1823-c614a503a1ae', 'test8.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('688c1005-0bed-b2c0-acbf-55268f996c30', 'test9.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('3156438a-0fbd-2d6b-28c2-50a943c1845c', 'test10.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('baefb6c6-73a2-3cd1-46b4-599b568afba7', 'test11.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()),
                ('f0254450-cbfa-08ca-fb13-92128f6b8067', 'test12.jpg', 1, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW());
            `);
            const url = Url.baseURI + '?status=1&offset=0&limit=10';
            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(10);
            expect(response.body[0].status).toBe(1);
        });
        test('正常：statusの指定なし', async () => {
            // 事前データ準備
            const url = Url.baseURI + '?offset=0&limit=5';
            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(5);
            expect(response.body[0].status).toBe(0);
        });
        test('正常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(10);
            expect(response.body[0].status).toBe(0);
        });
        test('正常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(10);
            expect(response.body[0].status).toBe(0);
        });
        test('正常：Cookie使用, 運営メンバー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(10);
            expect(response.body[0].status).toBe(0);
        });
        test('異常：Cookie使用, オペレータサービス未起動', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：Cookie使用, オペレータサービス応答401', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(401);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用, オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(500);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.baseURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：パラメータ異常、文字列(status)', async () => {
            // 対象APIに送信
            const url = Url.baseURI + '?status=dummy';
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('status');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：パラメータ異常、文字列(offset)', async () => {
            // 対象APIに送信
            const url = Url.baseURI + '?offset=dummy';
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('offset');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：パラメータ異常、文字列(limit)', async () => {
            // 対象APIに送信
            const url = Url.baseURI + '?limit=dummy';
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('limit');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
    });
});
