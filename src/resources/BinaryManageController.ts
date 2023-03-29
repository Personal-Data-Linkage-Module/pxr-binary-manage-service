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
    JsonController, Header, Req, UseBefore, Get, Delete
} from 'routing-controllers';
/* eslint-enable */
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import { transformAndValidate } from 'class-transformer-validator';
import DeleteBinaryManageReqDto from './dto/DeleteBinaryManageReqDto';
import GetBinaryManageReqDto from './dto/GetBinaryManageReqDto';
import DeleteBinaryManageValidator from './validator/DeleteBinaryManageValidator';
import GetBinaryManageValidator from './validator/GetBinaryManageValidator';
import BinaryManageServiceDto from '../services/dto/BinaryManageServiceDto';
import BinaryManageService from '../services/BinaryManageService';

// SDE-IMPL-REQUIRED REST API のベースルートを指定します。("/")をベースルートにする場合は引数なしとしてください。
@JsonController('/binary-manage')
export default class BinaryManageController {
    /**
     * ファイル管理データ取得
     */
    @Get()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(GetBinaryManageValidator)
    async getBinaryManage (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(GetBinaryManageReqDto, req.query);
        dto = <GetBinaryManageReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new BinaryManageServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.status = dto.status;
        serviceDto.offset = dto.offset;
        serviceDto.limit = dto.limit;
        // サービス層の処理を実行
        const ret = await new BinaryManageService().getBinaryManage(serviceDto);
        return ret;
    }

    /**
     * ファイル管理データ削除
     */
    @Delete('/:manageId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(DeleteBinaryManageValidator)
    async deleteBinaryManage (@Req() req: Request): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(DeleteBinaryManageReqDto, req.params);
        dto = <DeleteBinaryManageReqDto>dto;

        // サービス層のDTOを生成
        const serviceDto = new BinaryManageServiceDto();
        serviceDto.operator = await OperatorService.authMe(req);
        serviceDto.manageId = dto.manageId;
        // サービス層の処理を実行
        const ret = await new BinaryManageService().deleteBinaryManage(serviceDto);
        return ret;
    }
}
