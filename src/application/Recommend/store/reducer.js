/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-14 15:10:31
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-14 18:36:50
 */
import * as actionTypes from './constants';
// 这里用到fromJS 把js数据结构转化成 immutable 数据结构
import { fromJS } from "immutable";


const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true,
});
// eslint-disable-next-line
export default (state=defaultState,action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading',action.data)
        default:
            return state;
    }
}