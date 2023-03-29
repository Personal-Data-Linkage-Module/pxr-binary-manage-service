/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer from './StubOperatorServer';
import { sprintf } from 'sprintf-js';
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
     * ファイルアップロード開始
     */
    describe('ファイルアップロード開始', () => {
        test('正常：', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

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
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('正常：Cookie使用, 運営メンバー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).not.toBeNull();
        });
        test('異常：Cookie使用, オペレータサービス未起動', async () => {
            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：Cookie使用, オペレータサービス応答401', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(401);

            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(400);

            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用, オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(500);

            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッションなし', async () => {
            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：パラメータ異常、空文字(fileName)', async () => {
            // 送信データを生成
            const json = {
                fileName: '',
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('fileName');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('異常：パラメータ異常、文字列(chunkCount)', async () => {
            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 'test'
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('chunkCount');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：パラメータ異常、数値範囲外(chunkCount)', async () => {
            // 送信データを生成
            const json = {
                fileName: 'test.jpg',
                chunkCount: 0
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.OUT_OF_SCOPE, 'chunkCount'));
        });
        test('異常：パラメータ不足(fileName))', async () => {
            // 送信データを生成
            const json = {
                chunkCount: 3
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('fileName');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('異常：パラメータ不足(chunkCount))', async () => {
            // 送信データを生成
            const json = {
                fileName: 'test.jpg'
            };
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.uploadStartURI)
                .set({ accept: 'application/json' })
                .set({ 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons.length).toBe(1);
            expect(response.body.reasons[0].property).toBe('chunkCount');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
    });
});
