/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 18:05:04
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-22 19:28:08
 */
import { fromJS } from "immutable";
import * as actionType from './constants';
import { playMode } from "../../../api/config";

//mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
// const list = [
//    {
//      ftype: 0,
//      djId: 0,
//      a: null,
//      cd: '01',
//      crbt: null,
//      no: 1,
//      st: 0,
//      rt: '',
//      cf: '',
//      alia: [
//        '手游《梦幻花园》苏州园林版推广曲'
//      ],
//      rtUrls: [],
//      fee: 0,
//      s_id: 0,
//      copyright: 0,
//      h: {
//        br: 320000,
//        fid: 0,
//        size: 9400365,
//        vd: -45814
//      },
//      mv: 0,
//      al: {
//        id: 84991301,
//        name: '拾梦纪',
//        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
//        tns: [],
//        pic_str: '109951164627180052',
//        pic: 109951164627180050
//      },
//      name: '拾梦纪',
//      l: {
//        br: 128000,
//        fid: 0,
//        size: 3760173,
//        vd: -41672
//      },
//      rtype: 0,
//      m: {
//        br: 192000,
//        fid: 0,
//        size: 5640237,
//        vd: -43277
//      },
//      cp: 1416668,
//      mark: 0,
//      rtUrl: null,
//      mst: 9,
//      dt: 234947,
//      ar: [
//        {
//          id: 12084589,
//          name: '妖扬',
//          tns: [],
//          alias: []
//        },
//        {
//          id: 12578371,
//          name: '金天',
//          tns: [],
//          alias: []
//        }
//      ],
//      pop: 5,
//      pst: 0,
//      t: 0,
//      v: 3,
//      id: 1416767593,
//      publishTime: 0,
//      rurl: null
//    }
// ];

const defaultState = fromJS ({
    fullScreen: false,// 播放器是否为全屏模式
    playing: false, // 当前歌曲是否播放
    sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList: [],
    mode: playMode.sequence,// 播放模式
    currentIndex: -1,// 当前歌曲在播放列表的索引位置
    showPlayList: false,// 是否展示播放列表
    currentSong: {} 
});
  
// 定义reducer函数
 // eslint-disable-next-line
export default (state=defaultState,action) => {
    switch (action.type) {
        case actionType.SET_CURRENT_SONG:
           return state.set('currentSong',action.data)
        case actionType.SET_FULL_SCREEN:
           return state.set('fullScreen',action.data)
        case actionType.SET_PLAYING_STATE:
           return state.set('playing',action.data)
        case actionType.SET_SEQUECE_PLAYLIST:
           return state.set('sequencePlayList',action.data)
        case actionType.SET_PLAYLIST:
           return state.set('playList',action.data)
        case actionType.SET_PLAY_MODE:
           return state.set('mode',action.data)
        case actionType.SET_CURRENT_INDEX:
           return state.set('currentIndex',action.data)
        case actionType.SET_SHOW_PLAYLIST:
           return state.set('showPlayList',action.data)
        default:
            return state
    }
}