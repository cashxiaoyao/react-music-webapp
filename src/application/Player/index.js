/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 18:29:46
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-21 13:11:17
 */
import React, { memo } from 'react'
import { connect } from "react-redux";
import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen
} from "./store/actionCreator";

import MiniPlayer from './miniPlayer';

function Player(props) {
    const currentSong = {
        al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
        name: "木偶人",
        ar: [{ name: "薛之谦" }]
    }
    return (
        <div>
            <MiniPlayer song={currentSong} />
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        fullScreen: state.getIn(['player', 'fullScreen']),// 播放器是否为全屏模式
        playing: state.getIn(['player', 'playing']), // 当前歌曲是否播放
        sequencePlayList: state.getIn(['player', 'sequencePlayList']), // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
        playList: state.getIn(['player', 'playList']),
        mode: state.getIn(['player', 'mode']),// 播放模式
        currentIndex: state.getIn(['player', 'currentIndex']),// 当前歌曲在播放列表的索引位置
        showPlayList: state.getIn(['player', 'showPlayList']),// 是否展示播放列表
        currentSong: state.getIn(['player', 'currentSong'])
    }
}
const mapDispatchToProps = dispatch => {
    return {
        togglePlayingDispatch(data) {
            dispatch(changePlayingState(data));
        },
        toggleFullScreenDispatch(data) {
            dispatch(changeFullScreen(data));
        },
        togglePlayListDispatch(data) {
            dispatch(changeShowPlayList(data));
        },
        changeCurrentIndexDispatch(index) {
            dispatch(changeCurrentIndex(index));
        },
        changeCurrentDispatch(data) {
            dispatch(changeCurrentSong(data));
        },
        changeModeDispatch(data) {
            dispatch(changePlayMode(data));
        },
        changePlayListDispatch(data) {
            dispatch(changePlayList(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Player))
