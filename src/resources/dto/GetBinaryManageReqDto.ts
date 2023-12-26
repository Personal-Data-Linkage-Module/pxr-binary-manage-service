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
    @Transform(({ value }) => { return transformToNumber(value); })
        status: number = null;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        offset: number = 0;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        limit: number = 10;
}
