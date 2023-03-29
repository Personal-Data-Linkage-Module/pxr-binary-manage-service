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

export default class DownloadServiceDto {
    /**
     * オペレータ情報
     */
    operator: OperatorDomain = null;

    /**
     * ファイルアップロード管理ID
     */
    manageId: string = null;

    /**
     * 分割No
     */
    chunkNo: number = null;
}
