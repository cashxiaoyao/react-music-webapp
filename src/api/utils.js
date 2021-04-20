/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 18:47:37
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-19 15:12:11
 */
import { RankTypes } from "./config";
/**
 * @name: 初始化大数字的
 * @test: test font
 * @msg: 
 * @param {*} count 数字
 * @return {*}
 */
export const getCount = (count) => {
    if (count < 0) return
    if (count < 10000) {
        return count
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count/1000)/10 + '万'
    } else {
        return Math.floor(count/10000000)/10 + '亿'
    }
}

/**
 * @name: 防抖函数
 * @test: test font
 * @msg: 
 * @param {*} func 函数
 * @param {*} delay 延迟时间
 * @return {*}
 */
export const debounce = (func, delay) => {
    let timer;
    return function () {
        let args = [...arguments]
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        },delay)
    }
}

/**
 * @name: 过滤排行榜数据
 * @test: test font
 * @msg: 
 * @param {*} rankList 数组
 * @return {*} 返回第一个没有tracks的索引
 */
export const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i+1
        }
    }
}


//找出排行榜的编号
export const filterIdx = name => {
    for (var key in RankTypes) {
      if (RankTypes[key] === name) return key;
    }
    return null;
  };
  
// 处理歌手列表拼接歌手名字
export const getName = list => {
    let str = "";
    list.map ((item, index) => {
      str += index === 0 ? item.name : "/" + item.name;
      return item;
    });
    return str;
};
  
// 判断一个对象是否为空
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;



