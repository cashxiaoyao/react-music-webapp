import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle,useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../loading';
import { debounce } from "../../api/utils";
import LoadingV2 from '../loading-v2';
/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-14 10:50:31
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-15 19:02:42
 */

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
    // batter-scroll 实例对象
    const [bScroll, setBScroll] = useState();
    // current 指向初始化bs实例需要的DOM元素
    const scrollContaninerRef = useRef();


    // 解构props里面的参数
    const { direction, click, refresh, bounceTop, bounceBottom } = props
    // 解构props里面的函数
    const { onScroll, pullUp, pullDown, pullUpLoading, pullDownLoading } = props

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp,300)
    }, [pullUp])

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown,300)
    }, [pullDown])

    // 通过useEffect 模拟生命周期  创建better-scroll
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizental',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll)
        // 清除副作用
        return () => {
            setBScroll(null)
        }
        // eslint-disable-next-line
    }, []);

    // 通过useEffect 模拟生命周期  每次重新渲染都要刷新实例，防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh()
        }
    });

    // 通过useEffect 模拟生命周期 给实例绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        });
        // 清除副作用
        return () => {
            bScroll.off('scroll')
        }
    }, [bScroll, onScroll]);

    // 通过useEffect 模拟生命周期 进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return
        const handlePullUp = () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce();
            }
        }
        bScroll.on('scrollEnd', handlePullUp);
        return () => {
            bScroll.off('scrollEnd',handlePullUp);
        }
    }, [bScroll,pullUpDebounce, pullUp]);

    // 通过useEffect 模拟生命周期 进行下拉到顶的判断，调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return
        const hanldePullDown= (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce();
            }
        }
        bScroll.on('touchEnd', hanldePullDown);
        return () => {
            bScroll.off('touchEnd',hanldePullDown);
        }
    }, [bScroll, pullDownDebounce,pullDown]);

    // useImperativeHandle 可以配合 forwardRef 自定义暴露给父组件的实例值,  从而暴露实例上的方法
    // useImperativeHandle(ref, () => ({
    //     // 给外界暴露refresh方法
    //     refresh() {
    //         if (bScroll) {
    //             bScroll.refresh();
    //             bScroll.scrollTo(0, 0);
    //         }
    //     },
    //     // 给外界暴露getBScroll方法，提供bs实例
    //     getBScroll(){
    //         if (bScroll) {
    //             return bScroll;
    //         }
    //     }
    // }));
    useImperativeHandle(ref, () => {
        const handleRefs = {
            // 给外界暴露refresh方法
            refresh() {
                if (bScroll) {
                    bScroll.refresh();
                    bScroll.scrollTo(0, 0);
                }
            },
            // 给外界暴露getBScroll方法，提供bs实例
            getBScroll() {
                if (bScroll) {
                    return bScroll;
                }
            }
        }
        return handleRefs
    });

    const PullUpDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
    const PullDownDisplayStyle = pullDownLoading?{ display: '' } : { display: 'none' }

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={PullUpDisplayStyle}><Loading></Loading></PullUpLoading>
            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={PullDownDisplayStyle}><LoadingV2></LoadingV2></PullDownLoading>
        </ScrollContainer>
    );
})

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']), // 滚动的方向
    // click: true, // 是否支持点击
    refresh: PropTypes.bool, // 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func, // 上拉加载逻辑
    pullDown: PropTypes.func, // 下拉加载的逻辑
    pullUpLoading: PropTypes.bool, // 是否显示上拉loading动画
    pullDownLoading: PropTypes.bool,//是否显示下拉loading动画
    bounceTop: PropTypes.bool, // 是否支持向上吸顶
    bounceBottom: PropTypes.bool // 是否支持向下吸底
};

Scroll.defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: true,
    onScroll: null,
    pullUp: null,
    pullDown: null,
    pullUpLoading: false,
    pullDownLoading: false,
    bounceTop: true,
    bounceBottom: true
};

export default Scroll;