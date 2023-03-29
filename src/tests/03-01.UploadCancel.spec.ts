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
import urljoin = require('url-join');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー（オペレータサービス）
let _operatorServer: StubOperatorServer = null;

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
     * ファイルアップロードキャンセル
     */
    describe('ファイルアップロードキャンセル', () => {
        test('正常：対象IDがアップロード中であること', async () => {
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
                INSERT INTO pxr_binary_manage.file_upload_data
                (
                    file_upload_manage_id, seq_no, file_data, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '990e8400-e29b-41d4-a716-446655440000', 1, 'MTExMTE=', 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe('990e8400-e29b-41d4-a716-446655440000');
        });
        test('正常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, 運営メンバー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('異常：Cookie使用, オペレータサービス未起動', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
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

            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
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

            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
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

            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send();

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッションなし', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadCancelURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：パラメータ不足(manageId)', async () => {
            // 送信データを生成
            const url = Url.uploadCancelURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
    });
});
