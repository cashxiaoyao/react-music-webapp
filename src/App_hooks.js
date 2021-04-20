/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-16 11:33:21
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 11:33:46
 */
/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-12 15:46:12
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 10:57:33
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
import { Data } from "./application/Singers/data";

function App() {
  return (
    <Provider store={ store }>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          {renderRoutes(routes)}
        </Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
