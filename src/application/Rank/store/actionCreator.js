/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-16 15:30:17
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 16:42:50
 */
import { getRankListRequest } from "../../../api/request";
import { fromJS } from "immutable";
import { CHANGE_RANK_LIST,CHANGE_LOADING} from "./constans";

export const changeRanlList = (data) => {
    return {
        type: CHANGE_RANK_LIST,
        data:fromJS(data)
    }
}

export const changeLoading = data => {
    return {
        type: CHANGE_LOADING,
        data
    }
}

export const getRankList = () => {
    return dispatch => {
        getRankListRequest().then(res => {
            let list = res && res.list
            dispatch(changeRanlList(list))
            dispatch(changeLoading(false))
        })
    }
}