/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */
/* eslint-disable */
import express = require('express');
import {
    Middleware,
    ExpressMiddlewareInterface,
    MethodNotAllowedError,
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    NotAcceptableError
} from 'routing-controllers';
import { Validator } from 'class-validator';
/* eslint-enable */

@Middleware({ type: 'before' })
export default class GlobalValidate implements ExpressMiddlewareInterface {
    validator: Validator = new Validator();

    use (request: express.Request, response: express.Response, next: express.NextFunction): void {
        // XMLHttpRequestのチェック
        // if (request.headers['x-requested-with'] !== 'XMLHttpRequest') {
        //     throw new BadRequestError();
        // }

        // Acceptヘッダーのチェック
        if (request.method === 'GET' || request.method === 'POST' || request.method === 'PUT') {
            if (
                !request.headers.accept ||
                (request.headers.accept.indexOf('application/json') < 0 &&
                request.headers.accept.indexOf('application/octet-stream') < 0)
            ) {
                console.log(request.headers.accept);
                throw new NotAcceptableError();
            }
        }

        // Content-Typeのチェック
        if (request.method === 'POST' || request.method === 'PUT') {
            const contentType = request.headers['content-type'];
            const contentLength = Number(request.headers['content-length']);
            if (contentLength > 0 &&
                (!contentType ||
                    (contentType.indexOf('application/json') < 0 && contentType.indexOf('application/octet-stream') < 0))) {
                throw new NotAcceptableError();
            }
        }

        if (next) {
            next();
        }
    }
}
