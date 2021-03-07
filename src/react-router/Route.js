/*
 * @Author: dfh
 * @Date: 2021-03-04 11:18:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-07 10:11:48
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/Route.js
 */
import React from 'react';
import matchPath from './matchPath';
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
        const { component: Component, computedMatch, render, children } = this.props;
        //优化点，Switch判断过了，不用在判断
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        const routeProps = { location, history, match };
        let renderElement = null;
        if (match) {
            if (Component) {
                renderElement = <Component {...routeProps} />;
            } else if (render) {
                renderElement = render(routeProps);
            } else if (children) {
                renderElement = children(routeProps)
            }
        } else {
            if (children) {
                renderElement = children(routeProps)
            }
        }
        return renderElement;
    }
}
export default Route;