/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- 対象テーブルのデータをすべて削除
DELETE FROM pxr_binary_manage.file_upload_data;
DELETE FROM pxr_binary_manage.file_upload_manage;

-- 対象テーブルのシーケンスを初期化
SELECT SETVAL('pxr_binary_manage.file_upload_data_id_seq', 1, false);
