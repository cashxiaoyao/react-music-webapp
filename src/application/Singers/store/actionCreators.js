/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-15 15:58:52
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 09:54:13
 */
import { getHotSingerListRequest, getSingerListRequest } from "../../../api/request";
import { CHANGE_ENTER_LOADING, CHANGE_PAGE_COUNT, CHANGE_PULLDOWN_LOADING, CHANGE_PULLUP_LOADING, CHANGE_SINGER_LIST } from "./constants";
import { fromJS } from "immutable";

export const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data:fromJS(data)
})

export const changePageCount = (data) => ({
    type: CHANGE_PAGE_COUNT,
    data
})

export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
})

export const changePullUpLodaing = (data) => ({
    type: CHANGE_PULLUP_LOADING,
    data
})

export const changePullDownLoading = (data) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
})


// 第一次加载热门歌手
export const getHotSingerList = () => {
    return (dispatch) => {
        getHotSingerListRequest(0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('热门歌手数据获取失败')
        })
    }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then(res =>{
            const data = [...singerList, ...res.artists]
            dispatch(changeSingerList(data))
            dispatch(changePullUpLodaing(false))
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        })
    }
}

//第一次加载对应类别歌手
export const getSingerList = (categroy,alpha) => {
    return (dispatch) => {
        getSingerListRequest(categroy, alpha, 0).then(res => {
            const data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('歌手数据获取失败');
        })
    }
}

//加载更多歌手
export const refreshMoreSingerList = (categroy, alpha) => {
    return (dispatch, getState) => {
        console.log(getState);
        const pageCount = getState().getIn(['singers','pageCount'])
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerListRequest(categroy, alpha, pageCount).then(res => {
            const data = [...singerList, ...res.artists]
            dispatch(changeSingerList(data))
            dispatch(changePullUpLodaing(false))
        }).catch(() => {
            console.log('歌手数据获取失败');
        })
    }
}