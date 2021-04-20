/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-12 18:05:47
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-13 14:34:04
 */
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";
import { Top, Tab, TabItem } from "./style";
import { NavLink } from 'react-router-dom'


function Home(props) {
  const { route: { routes } } = props;
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(routes)}
    </div>
  )
}

export default React.memo(Home);