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
import OperatorDomain from 'domains/OperatorDomain';
/* eslint-enable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。

export default class BinaryManageServiceDto {
    /**
     * オペレータ情報
     */
    operator: OperatorDomain;

    /**
     * ファイルアップロード管理ID
     */
    manageId: string;

    /**
     * ステータス
     */
    status: number;

    /**
     * 取得開始位置
     */
    offset: number;

    /**
     * 取得件数
     */
    limit: number;
}
