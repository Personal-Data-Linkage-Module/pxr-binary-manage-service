/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
export namespace RequestJson {
    /**
     * データ蓄積定義追加_正常(workflow)
     */
    export const STORE_POST_WF = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_正常(application)
     */
    export const STORE_POST_APP = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(actorがwfまたはapp以外)
     */
    export const STORE_POST_DT = JSON.stringify({
        actor: {
            _value: 1000204,
            _ver: 1
        },
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(アクターカタログにcatalogItemがない)
     */
    export const STORE_POST_INVALID_ACTOR = JSON.stringify({
        actor: {
            _value: 1000304,
            _ver: 1
        },
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(アクターカタログにtemplate.workflowが無い)
     */
    export const STORE_POST_WF_MISSING_TEMPLATE = JSON.stringify({
        actor: {
            _value: 1000404,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(template.workflowにリクエスト.wfが無い)
     */
    export const STORE_POST_MISSING_REQ_WF = JSON.stringify({
        actor: {
            _value: 1000504,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(アクターカタログにtemplate.applicationが無い)
     */
    export const STORE_POST_APP_MISSING_TEMPLATE = JSON.stringify({
        actor: {
            _value: 1000604,
            _ver: 1
        },
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(template.applicationにリクエスト.appが無い)
     */
    export const STORE_POST_MISSING_REQ_APP = JSON.stringify({
        actor: {
            _value: 1000704,
            _ver: 1
        },
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000109,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000114,
                _ver: 1
            },
            {
                _value: 1000115,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(workflowカタログ内のtemplate.storeが空))
     */
    export const STORE_POST_WF_EMPTY_TMP_STORE = JSON.stringify({
        actor: {
            _value: 1000014,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000017,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(applicationカタログ内のtemplate.storeが空))
     */
    export const STORE_POST_APP_EMPTY_TMP_STORE = JSON.stringify({
        actor: {
            _value: 1000114,
            _ver: 1
        },
        app: {
            _value: 1000117,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常(template.store.eventにリクエスト.eventと一致するものが無い)
     */
    export const STORE_POST_STORE_EMPTY_EVENT = JSON.stringify({
        actor: {
            _value: 1000804,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000027,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常(template.store.eventにリクエスト.eventと一致するものが無い)
     */
    export const STORE_POST_STORE_UNMATCH_EVENT = JSON.stringify({
        actor: {
            _value: 1000904,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000037,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常(propがthingのものから_codeが取り出せない)
     */
    export const STORE_POST_EVENT_PROP_NOT_CODE = JSON.stringify({
        actor: {
            _value: 1001004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000047,
            _ver: 1
        },
        event: [
            {
                _value: 1000019,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常(イベントカタログに紐づいているモノカタログコードと一致しない)
     */
    export const STORE_POST_THING_CODE_NOT_EXIST = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1999999,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actorがない）
     */
    export const STORE_POST_MISSING_ACTOR = JSON.stringify({
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actorがnull）
     */
    export const STORE_POST_EMPTY_ACTOR = JSON.stringify({
        actor: null,
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actor._valueがない）
     */
    export const STORE_POST_MISSING_ACTOR_CODE = JSON.stringify({
        actor: {
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actor._valueが空）
     */
    export const STORE_POST_EMPTY_ACTOR_CODE = JSON.stringify({
        actor: {
            _value: null,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actor._valueが数字以外）
     */
    export const STORE_POST_ISNUM_ACTOR_CODE = JSON.stringify({
        actor: {
            _value: 'a',
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
        /**
     * データ蓄積定義追加_異常（actor._verがない）
     */
    export const STORE_POST_MISSING_ACTOR_VER = JSON.stringify({
        actor: {
            _value: 1000004
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: {
            _value: 1000009,
            _ver: 1
        },
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actor._verが空）
     */
    export const STORE_POST_EMPTY_ACTOR_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: null
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（actor._verが数字以外）
     */
    export const STORE_POST_ISNUM_ACTOR_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 'a'
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常（wfとappが両方ない）
     */
    export const STORE_POST_MISSING_WF_APP = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常（wfとappが両方とも空）
     */
    export const STORE_POST_EMPTY_WF_APP = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常（wfとappが両方ともobject）
     */
    export const STORE_POST_SETTING_WF_APP = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常（wf._valueがない）
     */
    export const STORE_POST_MISSING_WF_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（wf._valueが空）
     */
    export const STORE_POST_EMPTY_WF_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: null,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（wf._valueが数字以外）
     */
    export const STORE_POST_ISNUM_WF_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 'a',
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（wf._verがない）
     */
    export const STORE_POST_MISSING_WF_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（wf._verが空）
     */
    export const STORE_POST_EMPTY_WF_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: null
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（wf._verが数字以外）
     */
    export const STORE_POST_ISNUM_WF_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 'a'
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
        /**
     * データ蓄積定義追加_異常（app._valueがない）
     */
    export const STORE_POST_MISSING_APP_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（app._valueが空）
     */
    export const STORE_POST_EMPTY_APP_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _value: null,
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（app._valueが数字以外）
     */
    export const STORE_POST_ISNUM_APP_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _value: 'a',
            _ver: 1
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（app._verがない）
     */
    export const STORE_POST_MISSING_APP_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _value: 1000007
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（app._verが空）
     */
    export const STORE_POST_EMPTY_APP_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _value: 1000007,
            _ver: null
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（app._verが数字以外）
     */
    export const STORE_POST_ISNUM_APP_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: {
            _value: 1000007,
            _ver: 'a'
        },
        wf: null,
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（eventがない）
     */
    export const STORE_POST_MISSING_EVENT = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（eventが空）
     */
    export const STORE_POST_EMPTY_EVENT = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: null,
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（event._valueがない）
     */
    export const STORE_POST_MISSING_EVENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（event._valueが空）
     */
    export const STORE_POST_EMPTY_EVENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: null,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（event._valueが数字以外）
     */
    export const STORE_POST_ISNUM_EVENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 'a',
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（event._verがない）
     */
    export const STORE_POST_MISSING_EVENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（event._verが空）
     */
    export const STORE_POST_EMPTY_EVENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: null
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（event._verが空）
     */
    export const STORE_POST_ISNUM_EVENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 'a'
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thingがない）
     */
    export const STORE_POST_MISSING_THING = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thingが空）
     */
    export const STORE_POST_EMPTY_THING = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
        ]
    });
    /**
     * データ蓄積定義追加_異常（thingがArray以外）
     */
    export const STORE_POST_ISARRAY_THING = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: {
            _value: 10000014,
            _ver: 1
        }
    });
    /**
     * データ蓄積定義追加_異常（thing._valueがない）
     */
    export const STORE_POST_MISSING_THING_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._valueが空）
     */
    export const STORE_POST_EMPTY_THING_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: null,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._valueが数字以外）
     */
    export const STORE_POST_ISNUM_THING_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 'a',
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._verがない）
     */
    export const STORE_POST_MISSING_THING_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._verが空）
     */
    export const STORE_POST_EMPTY_THING_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: null
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._verが数字以外）
     */
    export const STORE_POST_ISNUM_THING_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 'a'
            }
        ]
    });
        /**
     * データ蓄積定義追加_異常（thing._valueがない）
     */
    export const STORE_POST_MISSING_THING_CODE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            },
            {
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._valueが空）
     */
    export const STORE_POST_EMPTY_THING_CODE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            },
            {
                _value: null,
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._valueが数字以外）
     */
    export const STORE_POST_ISNUM_THING_CODE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            },
            {
                _value: 'a',
                _ver: 1
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._verがない）
     */
    export const STORE_POST_MISSING_THING_VER2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            },
            {
                _value: 1000015
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._verが空）
     */
    export const STORE_POST_EMPTY_THING_VER2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            },
            {
                _value: 1000015,
                _ver: null
            }
        ]
    });
    /**
     * データ蓄積定義追加_異常（thing._verが数字以外）
     */
    export const STORE_POST_ISNUM_THING_VER2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        event: [
            {
                _value: 1000009,
                _ver: 1
            }
        ],
        thing: [
            {
                _value: 1000014,
                _ver: 1
            },
            {
                _value: 1000015,
                _ver: 'a'
            }
        ]
    });
}
