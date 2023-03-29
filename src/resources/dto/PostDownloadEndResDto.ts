/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * ファイルダウンロード終了(POST)レスポンスモデル
 */
export default class PostDownloadEndResDto {
    /**
     * ファイル管理ID
     */
    public id: string = null;

    /**
     * ファイル管理ID
     */
    public result: string = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const obj: {} = {
            id: this.id,
            result: this.result
        };
        return obj;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (obj: {}): void {
        this.id = obj['id'];
        this.result = obj['result'];
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
