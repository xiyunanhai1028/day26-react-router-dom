/*
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-07 10:47:03
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, useParams, useHistory, useLocation, useRouteMatch } from './react-router-dom';

function Home() {
  return <div>首页</div>
}

function UserDetail() {
  const params = useParams();
  console.log('params--',params)
  const history = useHistory();
  console.log('history', history);
  const location = useLocation();
  return <div>User id:{params.id} <br /> name:{location.state.name}</div>
}

function Post() {
  const match = useRouteMatch({
    path: '/post/:id',
    strict: true,
    sensitive: true
  })
  return match ? <div>id:{match.params.id}</div> : <div>Not Found</div>
}

ReactDOM.render(<BrowserRouter>
  <div>
    <ul>
      <li><Link to='/'>首页</Link></li>
      <li><Link to={{ pathname: '/user/detail/1', state: { id: 1, name: '张三' } }}>张三用户</Link></li>
      <li><Link to='/post/1'>张三详情</Link></li>
    </ul>
    <Route path='/' component={Home} />
    <Route path='/user/detail/:id' component={UserDetail} />
    <Route path='/post/:id' component={Post} />
  </div>
</BrowserRouter>, document.getElementById('root'))
