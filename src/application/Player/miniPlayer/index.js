/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-20 18:51:58
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-21 13:10:39
 */
import React from 'react';
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";

function MiniPlayer(props) {
    const { song } = props
    return (
        <MiniPlayerContainer>
            <div className="icon">
                <div className="imgWrapper">
                    <img src={song.al.picUrl} alt="img" className="play" width="40" height="40" />
                </div>
            </div>
            <div className="text">
                <h2 className="name">{song.name}</h2>
                <p className="desc">{getName(song.ar)}</p>
            </div>
            <div className="control">
                <i className="iconfont">&#xe650;</i>
            </div>
            <div className="control">
                <i className="iconfont">&#xe640;</i>
            </div>
        </MiniPlayerContainer>
    )
}

export default React.memo (MiniPlayer);