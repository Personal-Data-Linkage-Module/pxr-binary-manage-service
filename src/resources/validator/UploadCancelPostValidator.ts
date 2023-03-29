/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import PostUploadCancelReqDto from '../dto/PostUploadCancelReqDto';

/**
 * アップロードキャンセルAPIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class UploadCancelPostValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        await transformAndValidate(PostUploadCancelReqDto, request.params);
        if (next) {
            next();
        }
    }
}
