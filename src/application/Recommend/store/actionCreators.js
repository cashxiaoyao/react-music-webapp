/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-14 15:10:05
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-14 18:38:56
 */
import * as actionTypes from './constants';
import { fromJS } from "immutable";
import { getBannerRequest, getRecommendListRequest } from "../../../api/request";


export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
});

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            let action = changeBannerList(data.banners)
            dispatch(action)
        }).catch(() => {
            console.log('banner图片传输错误');
        })
    }
}

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            let action = changeRecommendList(data.result)
            dispatch(action)
            dispatch(changeEnterLoading(false))
        }).catch(err => {
            console.log('推荐歌单数据传输错误');
        })
    }
}