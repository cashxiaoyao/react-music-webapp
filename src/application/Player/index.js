/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 18:29:46
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-22 20:13:30
 */
import React, { memo, useState, useRef, useEffect } from 'react'
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
import NormalPlayer from './normalPlayer';
import { getSongUrl, isEmptyObject, findIndex, shuffle } from "../../api/utils";
import { playMode } from '../../api/config';
import Toast from '../../baseUI/toast';



function Player(props) {
    const {
        fullScreen,
        playing,
        currentIndex,
        currentSong: immutableCurrentSong,
        playList: immutablePlayList,
        mode,//播放模式
        sequencePlayList: immutableSequencePlayList,// 顺序列表
    } = props
    const {
        toggleFullScreenDispatch,
        togglePlayingDispatch,
        changeCurrentIndexDispatch,
        changeCurrentDispatch,
        changePlayingState,
        changePlayListDispatch,
        changeModeDispatch
    } = props

    let currentSong = immutableCurrentSong.toJS()
    const playList = immutablePlayList.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();

    // 目前播放时间
    const [currentTime, setCurrentTime] = useState(0)
    //歌曲总时长
    const [duration, setDuration] = useState(0)
    const [preSong, setpreSong] = useState({})
    const [modeText, setModeText] = useState('')
    const toastRef = useRef()

    // 歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
    // 绑定audio标签
    const audioRef = useRef()


    useEffect(() => {
        if (!playList.length || currentIndex === -1 || !playList[currentIndex] ||
            playList[currentIndex].id === preSong.id) return
        let current = playList[currentIndex]
        changeCurrentDispatch(current) // 赋值currentSong
        setpreSong(current)
        audioRef.current.src = getSongUrl(current.id)
        setTimeout(() => {
            audioRef.current.play().then(() => {
                // songReady.current = true;
            });
        });
        togglePlayingDispatch(true) //播放状态
        setCurrentTime(0) //从头开始播放
        setDuration((current.dt / 1000) | 0) // 歌曲时长
        // eslint-disable-next-line
    }, [playList,currentIndex])

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
    }, [playing])



    const clickPlaying = (e, state) => {
        e.stopPropagation()
        togglePlayingDispatch(state)
    }
    const onProgressChange = curPercent => {
        const newTime = curPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
            togglePlayingDispatch(true);
        }
        // if (currentLyric.current) {
        //     currentLyric.current.seek(newTime * 1000);
        // }
    };
    const updateTime = (e) => {
        setCurrentTime(e.target.currentTime)
    }

    //一首歌循环
    const handleLoop = () => {
        audioRef.current.currentTime = 0
        changePlayingState(true)
        audioRef.current.play()
    }

    //上一首歌曲
    const handlePrev = () => {
        // 如果播放列表只有一首歌时单曲循环
        if (playList.length === 1) {
            handleLoop()
            return
        }
        let index = currentIndex - 1
        if (index < 0) index = playList.length - 1
        if (!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }

    // 下一首歌曲
    const handleNext = () => {
        // 如果播放列表只有一首歌时单曲循环
        if (playList.length === 1) {
            handleLoop()
            return
        }
        let index = currentIndex + 1
        if (index === playList.length) index = 0
        if (!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }

    //修改播放模式
    const changeMode = () => {
        let newMode = (mode + 1) % 3
        if (newMode === 0) {
            // 顺序模式
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong, sequencePlayList)
            changeCurrentIndexDispatch(index)
            setModeText('顺序循环')
        } else if (newMode === 1) {
            //单曲循环模式
            changePlayListDispatch(sequencePlayList)
            setModeText('单曲循环')
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList)
            let index = findIndex(currentSong, newList)
            changePlayListDispatch(newList)
            changeCurrentIndexDispatch(index)
            setModeText('随机播放')
        }
        changeModeDispatch(newMode)
    }

    const handleEnd = () => {
        if (mode === playMode.loop) {
          handleLoop();
        } else {
          handleNext();
        }
      };

    return (
        <div>
            {
                isEmptyObject(currentSong) ? null :
                    <MiniPlayer
                        song={currentSong}
                        fullScreen={fullScreen}
                        toggleFullScreen={toggleFullScreenDispatch}
                        playing={playing}
                        clickPlaying={clickPlaying}
                        percent={percent} // 进度小数
                    />
            }

            {
                isEmptyObject(currentSong) ? null :
                    <NormalPlayer
                        song={currentSong}
                        fullScreen={fullScreen}
                        toggleFullScreen={toggleFullScreenDispatch}
                        clickPlaying={clickPlaying}
                        playing={playing}
                        onProgressChange={onProgressChange}
                        duration={duration} // 总时长
                        currentTime={currentTime} // 播放时间
                        percent={percent} // 进度
                        handlePrev={handlePrev} //上一首
                        handleNext={handleNext} //上一首
                        mode={mode} //本来的模式
                        changeMode={changeMode} //修改播放模式
                    />
            }
            <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}></audio>
            <Toast text={modeText} ref={ toastRef}></Toast>
        </div>
    )
}

const mapStateToProps = (state) => {
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
