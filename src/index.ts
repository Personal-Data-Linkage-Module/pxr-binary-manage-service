/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Application } from './resources/config/Application';
import { getConnect } from './common/GetConnection';

// 起動時にDB Connectionを取得
(async () => {
    try {
        await getConnect();
    } catch (err) {
        console.error(err);
        process.exit(-101);
    }
})();

export default new Application();
