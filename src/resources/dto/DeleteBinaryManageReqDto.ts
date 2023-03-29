/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsString,
    IsNotEmpty
} from 'class-validator';
/* eslint-enable */

/**
 * ファイル管理データ削除リクエストモデル
 */
export default class DeleteBinaryManageReqDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    manageId: string = null;
}
