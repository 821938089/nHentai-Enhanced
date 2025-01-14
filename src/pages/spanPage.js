import {
    $,
} from '../config.js'

import {
    json,
    currentPageNum,
} from '../variable.js'

import {
    scrollEventAjax,
    changeNumPosition,
    debugConsole,
    tagsTranslator,
    translatePlus,
} from '../utils'

/**
 * span 頁面
 */
export function spanPage () {
    debugConsole('偵測到 span 頁面')

    // 翻譯
    translatePlus(['nav'], json.NewSpanPage)

    // 翻譯 標籤
    tagsTranslator($('#content > h1 > a > .name'))

    changeNumPosition('span')

    // 獲取當前頁數
    currentPageNum = location.href.split('=').length == 1 ? 1 : Number(link[1])

    // ajax
    scrollEventAjax('span')
}