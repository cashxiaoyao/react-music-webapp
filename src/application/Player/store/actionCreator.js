/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 18:05:17
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-20 18:23:11
 */
import { fromJS } from "immutable";
import * as actionType from './constants';

export const changeCurrentSong = (data) => ({
    type: actionType.SET_CURRENT_SONG,
    data: fromJS (data)
  });
  
  export const changeFullScreen =  (data) => ({
    type: actionType.SET_FULL_SCREEN,
    data
  });
  
  export const changePlayingState = (data) => ({
    type: actionType.SET_PLAYING_STATE,
    data
  });
  
  export const changeSequecePlayList = (data) => ({
    type: actionType.SET_SEQUECE_PLAYLIST,
    data: fromJS (data)
  });
  
  export const changePlayList  = (data) => ({
    type: actionType.SET_PLAYLIST,
    data: fromJS (data)
  });
  
  export const changePlayMode = (data) => ({
    type: actionType.SET_PLAY_MODE,
    data
  });
  
  export const changeCurrentIndex = (data) => ({
    type: actionType.SET_CURRENT_INDEX,
    data
  });
  
  export const changeShowPlayList = (data) => ({
    type: actionType.SET_SHOW_PLAYLIST,
    data
  });