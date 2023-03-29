/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import GetBinaryManageReqDto from '../../resources/dto/GetBinaryManageReqDto';
/* eslint-enable */

/**
 * ファイル管理データ取得APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class GetBinaryManageValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        await transformAndValidate(GetBinaryManageReqDto, request.query);
        if (next) {
            next();
        }
    }
}
