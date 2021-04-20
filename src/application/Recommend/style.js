/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-14 13:49:33
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-14 14:23:31
 */
import Styled from 'styled-components';
import style from '../../assets/global-style'

export const Content = Styled.div`
    position:fixed;
    top:90px;
    bottom:0;
    width:100%;
    &>.before {
        position: absolute;
        top: -300px;
        height: 400px;
        width: 100%;
        background: ${style["theme-color"]};
    }
`