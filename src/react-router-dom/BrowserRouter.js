/*
 * @Author: dfh
 * @Date: 2021-03-04 10:45:31
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 11:30:14
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router-dom/BrowserRouter.js
 */
import React from 'react';
import { Router } from '../react-router'
import { createBrowserHistory } from 'history'
class BrowserRouter extends React.Component {
    history = createBrowserHistory();
    render() {
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}
export default BrowserRouter;