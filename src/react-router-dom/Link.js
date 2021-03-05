/*
 * @Author: dfh
 * @Date: 2021-03-05 18:01:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 18:06:39
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router-dom/Link.js
 */
import React from 'react';
import { __RouterContext as RouterContext } from '../react-router';

function Link(props) {
    return <RouterContext.Consumer>{
        ({ history }) => <a onClick={event => {
            event.preventDefault();
            history.push(props.to);
        }} {...props}>{props.children}</a>
    }</RouterContext.Consumer>
}
export default Link;