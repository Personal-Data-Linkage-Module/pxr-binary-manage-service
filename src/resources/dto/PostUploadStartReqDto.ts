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
 * ファイルアップロード開始(POST)リクエストモデル
 */
export default class PostUploadStartReqDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    fileName: string = null;

    @IsDefined()
    @IsNotEmpty()
    @Transform(chunkCount => parseInt(chunkCount))
    @IsNumber()
    chunkCount: number = null;
}
