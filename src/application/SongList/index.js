/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-19 16:23:34
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-22 20:02:56
 */
import React, { memo,forwardRef } from 'react'
import { SongList, SongItem } from "./style";
import { getName } from '../../api/utils';
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from '../../application/Player/store/actionCreator';
import { connect } from 'react-redux';

const SongsList = forwardRef((props,refs) => {
    const {
        collectCount,
        showCollect,
        songs
    } = props;

    const {
        changePlayListDispatch,
        changeCurrentIndexDispatch,
        changeSequecePlayListDispatch
    } = props;

    const { musicAnimation } = props


    const totalCount = songs.length;
    const selectItem = (e, index) => {
        changePlayListDispatch(songs)
        changeSequecePlayListDispatch(songs)
        changeCurrentIndexDispatch(index)
        musicAnimation(e.nativeEvent.clientX,e.nativeEvent.clientY)
    }
    let songList = (list) => {
        let res = []
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            res.push(
                <li key={item.id} onClick={(e)=>selectItem(e,i)}> 
                    <span className="index">{i + 1}</span>
                    <div className="info">
                        <span>{item.name}</span>
                        <span>
                        { item.ar ? getName (item.ar): getName (item.artists) } - { item.al ? item.al.name : item.album.name}
                        </span>
                    </div>
                </li>
            )
        }
        return res
    }

    const collect = count => {
        return (
            <div className="add_list">
                <i className="iconfont">&#xe62d;</i>
                <span>收藏（{ Math.floor(count/1000)/10 }万）</span>
            </div>
        )
    }

    return (
        <SongList ref={refs} showBackground={props.showBackground}>
            <div className="first_line">
                <div className="play_all" onClick={(e)=>selectItem(e,0)}>
                    <i className="iconfont">&#xe6e3;</i>
                    <span> 播放全部 <span className="sum">（共{ totalCount}首）</span></span>
                </div>
                {showCollect?collect(collectCount):null}
            </div>
            <SongItem>
                {songList(songs)}
            </SongItem>
        </SongList>
    )
})

const mapDispatchToProps = dispatch => {
    return {
        changePlayListDispatch(data) {
            dispatch(changePlayList(data))
        },
        changeCurrentIndexDispatch(data) {
            dispatch(changeCurrentIndex(data))
        },
        changeSequecePlayListDispatch(data) {
            dispatch(changeSequecePlayList(data))
        }
    }
}

export default connect(null,mapDispatchToProps)(memo(SongsList))
