/*
 * @Author: dfh
 * @Date: 2021-03-06 10:48:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-06 11:02:09
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router-dom/NavLink.js
 */
import React from 'react';
import { Link } from './'
import { __RouterContext as RouterContext, matchPath } from '../react-router'
function NavLink(props) {
    const context = React.useContext(RouterContext);
    const { pathname } = context.location;//输入栏的路径
    const {
        to,//指定的路径
        className: classNameProps = '',//自定义类名
        activeClassName = 'active',//激活状态下的类名
        style: styleProps = {},//普通样式
        activeStyle = {},//激活下的样式
        children,
        exact
    } = props;
    //判断输入地址和指定地址
    const isActive = matchPath(pathname, { path: to, exact });
    const className = isActive ? joinClassNames(classNameProps, activeClassName) : classNameProps;
    const style = isActive ? { ...styleProps, ...activeStyle } : styleProps;
    const linkProps = {
        className,
        style,
        children,
        to
    }
    return <Link {...linkProps} />
}

//合并类名
function joinClassNames(...classNames) {
    //filter过滤掉null,undefined,'',然后在空格连接
    return classNames.filter(c => c).join(' ');
}
export default NavLink;