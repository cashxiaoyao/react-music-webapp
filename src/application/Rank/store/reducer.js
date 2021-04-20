/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-16 15:30:39
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 16:46:46
 */
import { fromJS } from "immutable";
import * as actionTypes from './constans';

const defaultState = fromJS({
    rankList: [],
    loading: true
})


// eslint-disable-next-line
export default (state=defaultState,action) => {
   switch (action.type) {
       case actionTypes.CHANGE_RANK_LIST:
           return state.set('rankList',action.data)
       case actionTypes.CHANGE_LOADING:
           return state.set('loading',action.data)
       default:
           return state
   }
}