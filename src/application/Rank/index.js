/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 17:36:16
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-20 12:53:05
 */
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getRankList } from './store/actionCreator'
import { filterIndex } from "../../api/utils";
import {
    List, 
    ListItem,
    SongList,
    Container,
    EnterLoading
} from './style';
import Scroll from "../../baseUI/scroll";
import { renderRoutes } from 'react-router-config';
import Loading from '../../baseUI/loading';

function Rank(props) {
    const { rankList: list, loading } = props
    const { getRankListDataDispatch } = props

    let rankList = list ? list.toJS() : [];
    // console.log(rankList);
    
    useEffect(() => {
        if (!list.size) {
            getRankListDataDispatch()
        }
        // eslint-disable-next-line
    }, [])

    let globalStartIndex = filterIndex(rankList)
    // 官方榜单
    let officialList = rankList.slice(0, globalStartIndex)
    //全球榜单
    let globalList = rankList.slice(globalStartIndex)

    const enterDetail = (detail) => {
        props.history.push(`/rank/${detail.id}`)
    }

    const renderRankList = (list, global) => {
        return (
            <List globalRank = {global}>
                {
                    list.map(item => {
                        return (
                            <ListItem key={item.id} tracks={item.tracks} onClick={() => enterDetail(item)}>
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="decorate"></div>
                                    <span className="update_frequecy">{ item.updateFrequency }</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}.{item.first}-{ item.second}</li>
                    })
                }
            </SongList>
        ):null
    }

    // 榜单数据未加载出来之前都隐藏
    let displayStyle = loading ? {display:'none'}:{display:''}
    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}>官方榜</h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}>全球榜</h1>
                    {renderRankList(globalList, true)}
                    { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

//映射Redux全局的state到组件的props上
const mapStateToProps = state => {
    return {
        rankList: state.getIn(['rank', 'rankList']),
        loading:state.getIn(['rank','loading'])
    }
}

//映射Redux全局的dispatch到组件的props上
const mapDispatchToProps = dispatch => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Rank))