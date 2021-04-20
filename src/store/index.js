/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 14:48:57
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-16 14:25:40
 */
import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from './reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
console.log(compose);
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default store;
