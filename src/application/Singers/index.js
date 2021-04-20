/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 17:36:16
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-19 15:59:44
 */
import React, { useState, useEffect } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Scroll from '../../baseUI/scroll';
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreHotSingerList,
    changePullUpLodaing,
    changePullDownLoading,
    refreshMoreSingerList
} from "./store/actionCreators";
import { connect } from "react-redux";
import Lazyload, { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';




function Singers(props) {
    let [category, setCategory] = useState('')
    let [alpha, setAlpha] = useState('')

    const { singerList, /* enterLoading */ pullUpLoading, pullDownLoading, pageCount } = props;

    const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

    useEffect(() => {
        if (!singerList.size) {
            getHotSingerDispatch()
        }
        // eslint-disable-next-line
    }, [])

    let handleUpdateCategory = (val) => {
        setCategory(val)
        updateDispatch(category, val)
    }

    let handleUpdateAlpha = (val) => {
        setAlpha(val)
        updateDispatch(val, alpha)
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount)
    }

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha)
    }

    const enterDetail = id => {
        props.history.push(`/singers/${id}`)
    }

    //mock 数据
    // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
    //     return {
    //         picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    //         name: "隔壁老樊",
    //         accountId: 277313426,
    //     }
    // });

    //渲染函数，返回歌手列表
    const renderSingerList = () => {
        let list = singerList ? singerList.toJS() : [];
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <Lazyload placeholder={<img src={require("./singer.png")} alt="music" width="100%" height="100%" />}>
                                        <img src={`${item.picUrl}?param=300x300`} alt="music" width="100%" height="100%" />
                                    </Lazyload>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    return (
        <div>
            <NavContainer>
                <Horizen list={categoryTypes} title={"分类 (默认热门):"} handleClick={(val) => handleUpdateCategory(val)} oldVal={category}></Horizen>
                <Horizen list={alphaTypes} title={"首字母:"} handleClick={(val => handleUpdateAlpha(val))} oldVal={alpha}></Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
            {renderRoutes(props.route.routes)}
        </div>
    )
}


// 映射Redux全局的state到组件的props上
const mapStateToProps = state => {
    return {
        singerList: state.getIn(['singers', 'singerList']),
        enterLoading: state.getIn(['singers', 'enterLoading']),
        pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
        pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
        pageCount: state.getIn(['singers', 'pageCount'])
    }
}

// 映射Redux全局的dispatch到组件的props上
const mapDispatchToProps = dispatch => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        updateDispatch(categroy, alpha) {
            dispatch(changePageCount(0));
            dispatch(changeEnterLoading(true));
            dispatch(getSingerList(categroy, alpha))
        },
        //滑到最底部刷新部分的处理
        pullUpRefreshDispatch(categroy, alpha, hot, count) {
            dispatch(changePullUpLodaing(true))
            dispatch(changePageCount(count + 1))
            if (hot) {
                dispatch(refreshMoreHotSingerList());
            } else {
                dispatch(refreshMoreSingerList(categroy, alpha))
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(categroy, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));
            if (categroy === '' && alpha === '') {
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(categroy, alpha));
            }
        }
    }
}
// console.log(connect);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
