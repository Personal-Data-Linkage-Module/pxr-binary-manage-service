/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
// eslint-disable-next-line no-unused-vars
import { createConnection, getConnection, Connection } from 'typeorm';
import FileUploadDataEntity from '../repositories/postgres/FileUploadDataEntity';
import FileUploadManageEntity from '../repositories/postgres/FileUploadManageEntity';
import fs = require('fs');

// 環境ごとにconfigファイルを読み込む
const ormConfig = JSON.parse(fs.readFileSync('./config/ormconfig.json', 'UTF-8'));

// エンティティを設定
ormConfig['entities'] = [
    FileUploadDataEntity,
    FileUploadManageEntity
];

export async function getConnect (): Promise<Connection> {
    let connection: Connection;

    try {
        connection = await createConnection(ormConfig);
    } catch (err) {
        if (err.name === 'AlreadyHasActiveConnectionError') {
            // 既にコネクションが張られている場合は流用する
            connection = getConnection(ormConfig['name']);
        } else {
            throw err;
        }
    }

    // 接続したコネクションを返却
    return connection;
}
