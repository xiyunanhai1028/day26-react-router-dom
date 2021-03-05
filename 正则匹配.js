/*
 * @Author: dfh
 * @Date: 2021-03-05 14:12:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 14:28:09
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/正则匹配.js
 */
const pathToRegexp = require('path-to-regexp');
const keys = [];
const path = '/user/:id/:name';
const regexp = pathToRegexp(path, keys, { end: true });
const [url, ...values] = regexp.exec('/user/123/zhangsan');
const obj = keys.reduce((memo, key, index) => {
    memo[key.name] = values[index];
    return memo
}, {})
console.log(obj);//{ id: '123', name: 'zhangsan' }