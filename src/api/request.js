/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-14 15:06:35
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-20 12:54:19
 */
import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (categroy, alpha, count) => {
  return axiosInstance.get(`/artists/list?cat=${categroy}&initial=${alpha.toLowerCase()}&offset=${count}`)
}

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`)
}

export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};

//api/request.js
export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
};