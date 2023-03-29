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

// SDE-IMPL-REQUIRED 本ファイルをコピーして外部サービスに公開する REST API インタフェースを定義します。

/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Header, Req, UseBefore, Post
} from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import PostUploadReqDto from './dto/PostUploadReqDto';
import PostUploadStartReqDto from './dto/PostUploadStartReqDto';
import PostUploadEndReqDto from './dto/PostUploadEndReqDto';
import PostUploadCancelReqDto from './dto/PostUploadCancelReqDto';
import UploadPostValidator from './validator/UploadPostValidator';
import UploadStartPostValidator from './validator/UploadStartPostValidator';
import UploadEndPostValidator from './validator/UploadEndPostValidator';
import UploadCancelPostValidator from './validator/UploadCancelPostValidator';
import OperatorService from '../services/OperatorService';
import UploadService from '../services/UploadService';
import UploadServiceDto from '../services/dto/UploadServiceDto';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/binary-manage/upload')
export default class UploadController {
    @Post('/start')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UploadStartPostValidator)
    async postUploadStart (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostUploadStartReqDto, req.body);
        dto = <PostUploadStartReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new UploadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.chunkCount = dto.chunkCount;
        serviceDto.fileName = dto.fileName;

        // サービス層の処理を実行
        const ret = await new UploadService().uploadStart(serviceDto);
        return ret;
    }

    @Post('/end/:manageId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UploadEndPostValidator)
    async postUploadEnd (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostUploadEndReqDto, req.params);
        dto = <PostUploadEndReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new UploadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;

        // サービス層の処理を実行
        const ret = await new UploadService().uploadEnd(serviceDto);
        return ret;
    }

    @Post('/cancel/:manageId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UploadCancelPostValidator)
    async postUploadCancel (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostUploadCancelReqDto, req.params);
        dto = <PostUploadCancelReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new UploadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;

        // サービス層の処理を実行
        const ret = await new UploadService().uploadCancel(serviceDto);
        return ret;
    }

    @Post('/:manageId/:chunkNo')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UploadPostValidator)
    async postUpload (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostUploadReqDto, req.params);
        dto = <PostUploadReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new UploadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;
        serviceDto.chunkNo = dto.chunkNo;
        serviceDto.request = req;

        // サービス層の処理を実行
        const ret = await new UploadService().upload(serviceDto);
        return ret;
    }
}
