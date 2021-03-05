/*
 * @Author: dfh
 * @Date: 2021-03-04 10:45:22
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 11:29:58
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router-dom/HashRouter.js
 */
import React from 'react';
import { createHashHistory } from '../history';
import { Router } from '../react-router';
class HashRouter extends React.Component {
    history = createHashHistory();
    render() {
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}
export default HashRouter;