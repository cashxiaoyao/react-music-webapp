/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-12 15:46:12
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 14:45:23
 */
import React from 'react';
// 全局样式
import { GlobalStyle } from './style';
import { IconStyle } from "./assets/iconfont/iconfont";
//  路由模块
import { renderRoutes } from "react-router-config";
import routes from './routes/index.js';
import { HashRouter } from "react-router-dom";
// 状态管理模块  redux
import store from './store/index'
import { Provider } from 'react-redux'
// import { compose } from "redux";

// // function f
// const f = (arg) => `函数f(${arg})` 
 
// // function g
// const g = (arg) => `函数g(${arg})`
 
// // function h 最后一个函数可以接受多个参数
// const h = (...arg) => `函数h(${arg.join('_')})`
 
// console.log(compose(f,g,h)('a', 'b', 'c')) 
// function compose(...funcs){
//   if(funcs.length===0) {
//     return (arg)=>arg
//   }
//   if(funcs.length===1) {
//     return funcs[0]
//   }

//   return funcs.reduce((a,b)=>{
//     console.log(a,'+++++++++++++++++++++',b)
//     return (...args) => {
//       a(b(...args))
//     }
//   })
// }

// function f1(demo){
//   console.log('f1',demo)
//   return demo
// }
// function f2(demo){
//   console.log('f2',demo)
//   return demo
// }
// function f3(demo){
//   console.log('f3',demo)
//   return demo
// }

// console.log(compose(f1,f2,f3)('demo'))



// console.log(store);

function App() {
  return (
    <Provider store={ store }>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
