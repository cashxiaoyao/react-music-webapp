/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-19 14:08:47
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-19 15:19:13
 */
import * as actionType from './constants';
import { fromJS } from "immutable";

const defaultState = fromJS({
    currentAlbum: {},
    enterLoading: false,
})
// eslint-disable-next-line
export default (state =defaultState,action ) => {
    switch (action.type) {
        case actionType.CHANGE_CURRENT_ALBUM:
            return state.set('currentAlbum', action.data)
        case actionType.CHANGE_ENTER_LOADING:
            return state.set('enterLoading',action.data)
        default:
            return state;
    }
}