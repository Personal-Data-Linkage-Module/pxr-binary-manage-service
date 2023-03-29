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
import { Request, Response } from 'express';
import {
    JsonController, Header, Res, Req, UseBefore, Post
} from 'routing-controllers';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import { ResponseCode } from '../common/ResponseCode';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import DownloadPostValidator from './validator/DownloadPostValidator';
import DownloadStartPostValidator from './validator/DownloadStartPostValidator';
import DownloadEndPostValidator from './validator/DownloadEndPostValidator';
import DownloadCancelPostValidator from './validator/DownloadCancelPostValidator';
import PostDownloadStartReqDto from './dto/PostDownloadStartReqDto';
import PostDownloadEndReqDto from './dto/PostDownloadEndReqDto';
import PostDownloadCancelReqDto from './dto/PostDownloadCancelReqDto';
import PostDownloadReqDto from './dto/PostDownloadReqDto';
import OperatorService from '../services/OperatorService';
import DownloadService from '../services/DownloadService';
import DownloadServiceDto from '../services/dto/DownloadServiceDto';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/binary-manage/download')
export default class DownloadStartController {
    @Post('/start/:manageId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(DownloadStartPostValidator)
    async postDownloadStart (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostDownloadStartReqDto, req.params);
        dto = <PostDownloadStartReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new DownloadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;
        // サービス層の処理を実行
        const ret = await new DownloadService().downloadStart(serviceDto);
        return ret;
    }

    @Post('/end/:manageId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(DownloadEndPostValidator)
    async postDownloadEnd (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostDownloadEndReqDto, req.params);
        dto = <PostDownloadEndReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new DownloadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;

        // サービス層の処理を実行
        const ret = await new DownloadService().downloadEnd(serviceDto);
        return ret;
    }

    @Post('/cancel/:manageId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(DownloadCancelPostValidator)
    async postDownloadCancel (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostDownloadCancelReqDto, req.params);
        dto = <PostDownloadCancelReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new DownloadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;

        // サービス層の処理を実行
        const ret = await new DownloadService().downloadCancel(serviceDto);
        return ret;
    }

    @Post('/:manageId/:chunkNo')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(DownloadPostValidator)
    async postDownload (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(PostDownloadReqDto, req.params);
        dto = <PostDownloadReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new DownloadServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;
        serviceDto.chunkNo = dto.chunkNo;

        // サービス層の処理を実行
        const service = new DownloadService();
        const dataInfo = await service.download(serviceDto);

        // レスポンスを戻す
        res.setHeader('content-type', 'application/octet-stream');
        res.status(ResponseCode.OK).send(dataInfo.fileData);
    }
}
