/*
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-07 10:31:17
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink } from './react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
import Protected from './components/Protected';
import Login from './components/Login';
import NavHeader from './components/NavHeader';

ReactDOM.render(
  <Router>
    <NavHeader title='你好，欢迎光临！'/>
    <ul>
      <li><NavLink to='/' exact className="strong" style={{ textDecoration: 'line-through' }} activeStyle={{ color: 'red' }}>Home</NavLink></li>
      <li><NavLink to='/user' className="strong" style={{ textDecoration: 'line-through' }} activeStyle={{ color: 'red' }}>user</NavLink></li>
      <li><NavLink to='/profile' className="strong" style={{ textDecoration: 'line-through' }} activeStyle={{ color: 'red' }}>Profile</NavLink></li>
    </ul>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/user' component={User} />
      <Protected path='/profile' component={Profile} />
      <Route path='/login' component={Login} />
      <Redirect to='/' />
    </Switch>
  </Router>
  , document.getElementById('root')
);
