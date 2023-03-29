/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsString,
    IsUrl,
    IsNumber,
    IsInt,
    ValidateNested,
    IsDate,
    IsBoolean,
    IsNotEmpty
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

/**
 * ファイルダウンロードキャンセル(POST)リクエストモデル
 */
export default class PostDownloadCancelReqDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    manageId: string = null;
}
