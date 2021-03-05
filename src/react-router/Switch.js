/*
 * @Author: dfh
 * @Date: 2021-03-05 16:25:53
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 17:00:57
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/Switch.js
 */
import React from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';
class Switch extends React.Component {
    static contextType = RouterContext;

    render() {
        const { location } = this.context;
        let element, match;
        React.Children.forEach(this.props.children,child => {
            if (!match && React.isValidElement(child)) {
                match = matchPath(location.pathname, child.props);
                element = child;
            }
        })
        return match ? React.cloneElement(element, { computedMatch: match }) : null;
    }
}

export default Switch;