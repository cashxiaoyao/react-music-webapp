/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 12:55:11
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-20 13:32:45
 */
import * as actionType from './constants';
import { fromJS } from "immutable";
import { getSingerInfoRequest } from "../../../api/request";

export const changeArtist = data => {
    return {
        type: actionType.CHANGE_ARTIST,
        data:fromJS(data)
    }
}

export const changeSongsOfArtist = data => {
    return {
        type: actionType.CHANGE_SONGS_OF_ARTIST,
        data:fromJS(data)
    }
}

export const changeEnterLoading = data => {
    return {
        type: actionType.CHANGE_ENTER_LOADING,
        data
    }
}

// 请求数据
export const getSingerInfo = (id) => {
    return dispatch => {
        getSingerInfoRequest(id).then((res) => {
            
            dispatch(changeArtist(res.artist))
            dispatch(changeSongsOfArtist(res.hotSongs))
            dispatch(changeEnterLoading(false))
        })
    }
}