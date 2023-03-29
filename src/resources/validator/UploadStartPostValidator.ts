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
import PostUploadStartReqDto from '../dto/PostUploadStartReqDto';
import Config from '../../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

/**
 * アップロード開始APIのバリデーションチェッククラス
 */
@Middleware({ type: 'before' })
export default class UploadStartPostValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        // パラメータを取得
        let dto = await transformAndValidate(PostUploadStartReqDto, request.body);
        dto = <PostUploadStartReqDto>dto;

        // chunkCountがnumberであるか、分割数が0以下もしくは最大数を超えた場合
        if (!this.isScopeNumber(dto.chunkCount, 1, config['chunkCountMax'])) {
            // エラーレスポンスを返す
            throw new AppError(sprintf(Message.OUT_OF_SCOPE, 'chunkCount'), ResponseCode.BAD_REQUEST);
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
