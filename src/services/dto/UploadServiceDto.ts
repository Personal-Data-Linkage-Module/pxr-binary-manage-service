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
import { Request } from 'express';
import OperatorDomain from 'domains/OperatorDomain';
/* eslint-enable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。

export default class UploadServiceDto {
    /**
     * オペレータ情報
     */
    operator: OperatorDomain = null;

    /**
     * リクエスト情報
     */
    request: Request = null;

    /**
     * ファイルアップロード管理ID
     */
    manageId: string = null;

    /**
     * ファイル名
     */
    fileName: string = null;

    /**
     * ファイル分割数
     */
    chunkCount: number = null;

    /**
     * ファイル分割No
     */
    chunkNo: number = null;
}
