/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-19 14:08:21
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-19 14:29:12
 */
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from "./constants";
import { getAlbumDetailRequest } from "../../../api/request";
import { fromJS } from "immutable";

export const changeCurrentAlbum = data => {
    return {
        type: CHANGE_CURRENT_ALBUM,
        data:fromJS(data)
    }
}

export const changeEnterLoading = data => {
    return {
        type: CHANGE_ENTER_LOADING,
        data
    }
}

export const getAblumList = id => {
    return dispatch => {
        getAlbumDetailRequest(id).then(res => {
            let data = res.playlist;
            dispatch(changeCurrentAlbum(data))
            dispatch(changeEnterLoading(false))
        }).catch(() => {
            console.log('获取album数据失败');
        })
    }
}