/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { sprintf } from 'sprintf-js';
import StubOperatorServer from './StubOperatorServer';
import Config from '../common/Config';
import urljoin = require('url-join');
import fs = require('fs');
const Message = Config.ReadConfig('./config/message.json');

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
     * ファイルアップロード
     */
    describe('ファイルアップロード', () => {
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
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
            expect(response.body.chunkNo).toBe(1);
        });
        test('異常：重複アップロード', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(409);
        });
        /*
        test('異常：content-lengthと送信データに差異', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.SIZE_ERROR, 'content-length'));
        });
        */
        test('正常：Cookie使用, 個人', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_binary_manage.file_upload_manage
                (
                    id, file_name, status, chunk_count, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '990e8400-e29b-41d4-a716-446655440010', 'test.jpg', 0, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440010', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, アプリケーション', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_binary_manage.file_upload_manage
                (
                    id, file_name, status, chunk_count, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '990e8400-e29b-41d4-a716-446655440030', 'test.jpg', 0, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440030', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, 運営メンバー', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_binary_manage.file_upload_manage
                (
                    id, file_name, status, chunk_count, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '990e8400-e29b-41d4-a716-446655440040', 'test.jpg', 0, 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440040', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('異常：Cookie使用, オペレータサービス未起動', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：Cookie使用, オペレータサービス応答401', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(401);

            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(400);

            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用, オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(500);

            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッションなし', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '1');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：パラメータ異常、文字列(chunkNo)', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', 'test');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('chunkNo');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：パラメータ異常、数値範囲外(chunkNo)', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.OUT_OF_SCOPE, 'chunkNo'));
        });
        test('異常：パラメータ異常、空文字(data)', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000', '3');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'data'));
        });
        test('異常：パラメータ不足(chunkNo)', async () => {
            // 送信データを生成
            const url = urljoin(Url.uploadURI, '990e8400-e29b-41d4-a716-446655440000');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('異常：パラメータ不足(全て)', async () => {
            // 送信データを生成
            const url = Url.uploadURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/octet-stream' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(fs.readFileSync('./src/tests/test.jpg'));

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
    });
});
