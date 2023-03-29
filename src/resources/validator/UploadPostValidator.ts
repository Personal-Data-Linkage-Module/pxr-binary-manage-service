/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import { ResponseCode } from '../../common/ResponseCode';
import PostUploadReqDto from '../dto/PostUploadReqDto';
import Config from '../../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

/**
 * アップロードAPIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class UploadPostValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // パラメータを取得
        let dto = await transformAndValidate(PostUploadReqDto, request.params);
        dto = <PostUploadReqDto>dto;

        // chunkNoがnumberであるか、分割数が0以下もしくは最大数を超えた場合
        if (!this.isScopeNumber(dto.chunkNo, 1, config['chunkCountMax'])) {
            // エラーレスポンスを返す
            throw new AppError(sprintf(Message.OUT_OF_SCOPE, 'chunkNo'), ResponseCode.BAD_REQUEST);
        }
        // content-lengthとbodyのサイズが一致していない場合
        if (!request.body.length || request.body.length <= 0) {
            // エラーレスポンスを返す
            throw new AppError(sprintf(Message.NO_PARAM, 'data'), ResponseCode.BAD_REQUEST);
        }
        const contentlength: number = Number(request.headers['content-length']);
        if (contentlength !== request.body.length) {
            // エラーレスポンスを返す
            throw new AppError(sprintf(Message.SIZE_ERROR, 'content-length'), ResponseCode.BAD_REQUEST);
        }
        if (next) {
            next();
        }
    }

    /**
     * 数値範囲判定
     * @param target
     * @param from
     * @param to
     */
    protected isScopeNumber (target: any, from: number, to: number | null): boolean {
        // null, undefined, falseは数値ではないと判定
        const targetNum: number = Number(target);
        if (targetNum < from) {
            return false;
        }
        if (to && to < targetNum) {
            return false;
        }
        return true;
    }
}
