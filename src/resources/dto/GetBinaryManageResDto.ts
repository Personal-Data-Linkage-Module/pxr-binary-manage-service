/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * ファイルダウンロードキャンセル(POST)リクエストモデル
 */
export default class GetBinaryManageResDto {
    /**
     * ID
     */
    id: string = null;

    /**
     * ファイル名
     */
    fileName: string = null;

    /**
     * ステータス
     */
    status: number = 0;

    /**
     * ファイル分割数
     */
    chunkCount: number = 0;
}
