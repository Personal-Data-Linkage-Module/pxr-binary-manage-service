/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * ファイルダウンロード開始(POST)レスポンスモデル
 */
export default class PostDownloadStartResDto {
    /**
     * ファイル管理ID
     */
    public id: string = null;

    /**
     * ファイル分割数
     */
    public chunkCount: number = null;

    /**
     * ファイル名
     */
    public fileName: string = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const obj: {} = {
            id: this.id,
            chunkCount: this.chunkCount,
            fileName: this.fileName
        };
        return obj;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (obj: {}): void {
        this.id = obj['id'];
        this.chunkCount = obj['chunkCount'] ? Number(obj['chunkCount']) : 0;
        this.fileName = obj['fileName'];
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
