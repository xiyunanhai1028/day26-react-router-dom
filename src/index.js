/*
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 07:54:53
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from './react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';

ReactDOM.render(
  <Router>
    <Route path='/' component={Home} exact />
    <Route path='/user' component={User} exact />
    <Route path='/profile' component={Profile} exact />
  </Router>
  , document.getElementById('root')
);
