/*
 * @Author: dfh
 * @Date: 2021-03-04 11:18:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 11:41:29
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/Route.js
 */
import React from 'react';
import RouterContext from './RouterContext';
/**
 * 1.获取context中的值
 * 2.匹配路由规则里的path,是否和当前地址中的url地址相等
 * 3.如果相等，渲染component；如果不等，不渲染任何东西
 */
class Route extends React.Component {
    static contextType = RouterContext;
    render() {
        const { location, history } = this.context;
        const { path, component: Component, exact } = this.props
        const match = location.pathname === path;
        const routeProps = { location, history };
        return match ? <Component {...routeProps} /> : null
    }
}
export default Route;