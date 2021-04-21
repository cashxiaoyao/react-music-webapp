/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 14:49:15
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-20 18:28:24
 */
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";
import { reducer as singersReducer } from "../application/Singers/store/index";
import { reducer as rankReducer } from "../application/Rank/store/index";
import { reducer as albumReducer } from "../application/Album/store";
import { reducer as songerInfoReducer } from "../application/Singer/store";
import { reducer as playerReducer } from "../application/Player/store";

export default combineReducers({
    recommend: recommendReducer,
    singers: singersReducer,
    rank: rankReducer,
    album: albumReducer,
    songerInfo: songerInfoReducer,
    player:playerReducer,
})