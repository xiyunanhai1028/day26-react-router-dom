/*
 * @Author: dfh
 * @Date: 2021-03-07 10:31:34
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-07 10:48:11
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/hooks.js
 */
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export function useParams() {
    const match = React.useContext(RouterContext).match;
    debugger
    return match ? match.params : {};
}

export function useLocation() {
    return React.useContext(RouterContext).location;
}

export function useHistory() {
    return React.useContext(RouterContext).history;
}

export function useRouteMatch(options) {
    const location = useLocation();//获取当前的路径pathname
    const match = React.useContext(RouterContext).match;//获取匹配结果
    return options ? matchPath(location.pathname, options) : match;
}