/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-15 14:35:06
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-15 15:27:29
 */
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Scroll from '../scroll/index';
import style from '../../assets/global-style';


const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    /* vertical-align: middle; */
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`


function Horizen(props) {
    const { list, oldVal, title } = props;
    const { handleClick } = props;
    // console.log(handleClick);
    const Category = useRef(null);

    useEffect(() => {
        let categoryDOM = Category.current
        let tagElems = categoryDOM.querySelectorAll('span')
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        })
        categoryDOM.style.width = `${totalWidth}px`
    }, [])

    return (
        <Scroll direction = {'horizental'}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map(item => {
                            return (
                                <ListItem key={item.key} className={`${oldVal === item.key ? 'selected' : ''}`} onClick={()=>handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

Horizen.defaultProps = {
    list: [],//接收的列表数据
    oldVal: '',//为当前的item值
    title: '',//为列表左边的标题
    handleClick: null,//为点击不同的item的执行方法
}

Horizen.propTypes = {
    list: PropTypes.array,//接收的列表数据
    oldVal: PropTypes.string,//为当前的item值
    title: PropTypes.string,//为列表左边的标题
    handleClick: PropTypes.func,//为点击不同的item的执行方法
}

export default memo(Horizen)
