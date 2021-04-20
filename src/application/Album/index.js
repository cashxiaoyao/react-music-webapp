/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-16 18:28:20
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-19 15:26:01
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Container, TopDesc, Menu, SongList, SongItem } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import { getName, getCount, isEmptyObject } from "../../api/utils";
import style from '../../assets/global-style';
import { HEADER_HEIGHT } from './../../api/config';
import { connect } from "react-redux";
import { changeEnterLoading, getAblumList } from "./store/actionCreators";
import Loading from '../../baseUI/loading/index';

function Album(props) {
    console.log(props);
    // 从路由中拿到歌单的 id
    const id = props.match.params.id;

    const [showStatus, setShowStatus] = useState(true)
    const [title, setTitle] = useState('歌单')
    const [isMarquee, setIsMarquee] = useState(false)

    const headerEle = useRef();

    const { currentAlbum: currentAlbumImmutable, enterLoading } = props
    const { getAlbumDataDispatch } = props


    useEffect(() => {
        getAlbumDataDispatch(id)
    }, [getAlbumDataDispatch, id])

    const handleBack = useCallback(() => {
        setShowStatus(false)
    },[])

    // //mock 数据
    // const currentAlbum = {
    //     creator: {
    //         avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
    //         nickname: "浪里推舟"
    //     },
    //     coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    //     subscribedCount: 2010711,
    //     name: "听完就睡，耳机是天黑以后柔软的梦境",
    //     tracks: [
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //         {
    //             name: "我真的受伤了",
    //             ar: [{ name: "张学友" }, { name: "周华健" }],
    //             al: {
    //                 name: "学友 热"
    //             }
    //         },
    //     ]
    // }

    let currentAlbum = currentAlbumImmutable.toJS();

    const readerTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                    <div className="decorate"></div>
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                        <i className="iconfont play">&#xe885;</i>
                        <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt="" />
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>
        )
    }

    const readerMenu = () => {
        return (
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                </div>
            </Menu>
        )
    }

    const readerSongList = () => {
        return (
            <SongList>
                <div className="first_line">
                    <div className="play_all">
                        <i className="iconfont">&#xe6e3;</i>
                        <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
                    </div>
                    <div className="add_list">
                        <i className="iconfont">&#xe62d;</i>
                        <span > 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
                    </div>
                </div>
                <SongItem>
                    {
                        currentAlbum.tracks.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="index">{index + 1}</span>
                                    <div className="info">
                                        <span>{item.name}</span>
                                        <span>
                                            {getName(item.ar)} - {item.al.name}
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </SongItem>
            </SongList>
        )
    }

    const handleScroll = useCallback((pos) => {
        // console.log(pos.y);
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y / minScrollY)
        let headerDom = headerEle.current
        // 滑过顶部的高度开始变化
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style['theme-color']
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
            setTitle(currentAlbum.name)
            setIsMarquee(true)
        } else {
            headerDom.style.backgroundColor = ''
            headerDom.style.opacity = 1
            setTitle('歌单')
            setIsMarquee(false)
        }
    },[currentAlbum])

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Header title={title} handleClick={handleBack} ref={headerEle} isMarquee={isMarquee}></Header>

                {
                    !isEmptyObject(currentAlbum) ?
                        (<Scroll bounceTop={false} onScroll={handleScroll}>
                            <div>
                                {readerTopDesc()}
                                {readerMenu()}
                                {readerSongList()}
                            </div>
                        </Scroll>) : null
                }
                {enterLoading ? <Loading></Loading> : null}
            </Container>
        </CSSTransition>
    )
}


// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => {
    return {
        currentAlbum: state.getIn(['album', 'currentAlbum']),
        enterLoading: state.getIn(['album', 'enterLoading']),
    }
}

// 映射 Redux 全局的 dispatch 到组件的 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumDataDispatch(id) {
            dispatch(changeEnterLoading(true))
            dispatch(getAblumList(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
