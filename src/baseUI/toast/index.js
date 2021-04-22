/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-22 17:17:00
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-22 17:26:03
 */
//Toast/index.js
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import style from '../../assets/global-style';

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  /* background: ${style["highlight-background-color"]}; */
  &.drop-enter{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.drop-enter-active{
    opacity: 1;
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.drop-exit-active{
    opacity: 0;
    transition: all 0.3s;
    transform: translate3d(0, 100%, 0);
  }
  .text{
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: ${style["font-size-l"]};
  }
`

const Toast = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)
    const [timer, setTimer] = useState('')
    const { text } = props

    //外面组件拿函数组件ref的方法，用useImperativeHandle这个hooks
    useImperativeHandle(ref, () => {
        return {
            show() {
                //做防抖处理
                if (timer) clearTimeout(timer)
                setShow(true)
                setTimer(setTimeout(() => {
                    setShow(false)
                }, 3000))
            }
        }
    })

    return (
        <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
            <ToastWrapper>
                <div className="text">{text}</div>
            </ToastWrapper>
        </CSSTransition>
    )
})

export default React.memo(Toast)