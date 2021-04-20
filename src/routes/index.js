/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 17:36:16
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-19 16:07:43
 */
//routes/index.js
import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../application/Album';
import Singer from '../application/Singer';
// eslint-disable-next-line
export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"} />
        )
      },
      {
        path: "/recommend/",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            // path:'/recommend',
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers,
        key: 'singers',
        routes: [
          {
            path: '/singers/:id',
            component:Singer
          }
        ]
      },
      {
        path: "/rank/",
        component: Rank,
        key: 'rank',
        routes: [
          {
            path: "/rank/:id",
            component: Album
          }
        ]
      }
    ]
  }
]