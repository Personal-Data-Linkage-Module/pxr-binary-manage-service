/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform } from 'class-transformer';
import {
    IsOptional,
    IsNumber,
} from 'class-validator';
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

/**
 * ファイル管理データ取得リクエストモデル
 */
export default class GetBinaryManageReqDto {
    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    status: number = null;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    offset: number = 0;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    limit: number = 10;
}
