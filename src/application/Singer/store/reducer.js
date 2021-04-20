/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 12:55:26
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-20 13:01:28
 */
import * as actionType from './constants';
import { fromJS } from "immutable";

const defaultState = fromJS({
    artist: {},
    songsOfArtist: [],
    loading: true
})

// eslint-disable-next-line
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionType.CHANGE_ARTIST:
            return state.set('artist',action.data)
        case actionType.CHANGE_SONGS_OF_ARTIST:
            return state.set('songsOfArtist',action.data)
        case actionType.CHANGE_ENTER_LOADING:
            return state.set('loading',action.data)
        default:
            return state
    }
}