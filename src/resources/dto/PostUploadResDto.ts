/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * ファイルアップロード(POST)レスポンスモデル
 */
export default class PostUploadResDto {
    /**
     * ファイル管理ID
     */
    public id: string = null;

    /**
     * ファイル分割No
     */
    public chunkNo: number = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const obj: {} = {
            id: this.id,
            chunkNo: this.chunkNo
        };
        return obj;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (obj: {}): void {
        this.id = obj['id'];
        this.chunkNo = obj['chunkNo'] ? Number(obj['chunkNo']) : 0;
    }

    /**
     * データ構造コピー
     */
    public clone<T> (): T {
        const clone = new (this.constructor as { new(): T })();
        Object.assign(clone, this);
        return clone;
    }
}
