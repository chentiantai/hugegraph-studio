/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/29
 */
export const CHANGE_HEAD_MODE='change_head_mode';
export const CHANGE_LOADING_MODE='change_loading_mode';

export function changeHeadMode(mode) {
    return {
        type:CHANGE_HEAD_MODE,
        mode
    }
}

export function changeLoadingMode(mode) {

    return {
        type:CHANGE_LOADING_MODE,
        mode
    }
}