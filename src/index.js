/*
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 17:44:10
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch ,Redirect} from './react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/user' component={User} />
      <Route path='/profile' component={Profile} />
      <Redirect to='/' />
    </Switch>
  </Router>
  , document.getElementById('root')
);
