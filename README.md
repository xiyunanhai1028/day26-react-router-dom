<!--
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 09:38:01
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/README.md
-->
<!--
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 09:29:55
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/README.md
-->
## react-router-dom

### 1.React路由原理
- 不同的路径渲染不同的组件
- 有两种实现方式
    - HashRouter：利用hash实现路由切换
    - BrowserRouter：H5 API实现路由切换

#### 1.1.hash路由
> 利用hash实现路由切换

- hashchange：用来监听hash路由改变
- window.location.hash.slice(1)：用来获取路径

![hash](/Users/dufeihu/Documents/html/zhufeng/复习/day26-react-router-dom/hash.gif)


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="root"></div>
    <ul>
        <li><a href="#/a">a</a></li>
        <li><a href="#/b">b</a></li>
    </ul>
    <script>
      //用来监听hash路由改变
        window.addEventListener('hashchange', () => {
            console.log(window.location.hash);
            const pathname = window.location.hash.slice(1);//把#删除
            document.getElementById('root').innerHTML = pathname;
        })
    </script>
</body>

</html>
```

#### 1.2.history路由
> 利用H5 API实现路由切换

- HTML5规范给我们提供了一个[history](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/history)接口
- HTML5 History API包括2个方法：`history.pushState()`和`history.replaceState()`，和1个事件`window.onpopstate`

#### 1.2.1.pushState

> history.pushState(state, title,url)，包含三个参数

- state：用于存储该url对应的状态对象，该对象可在onpopstate事件中获取，也可以在history对象中获取
- title：标题，目前浏览器未实现
- url：设置的url地址

#### 1.2.2.replaceState

- 该接口与pushState参数相同，含义相同
- 唯一的区别在于`replaceState`是替换浏览器历史堆栈的当前历史记录为设定`url`
- 需要注意的是`replaceState`不会改动浏览器历史堆栈的当前指针

#### 1.2.3.onpopstate

- 该事件是window属性
- 该事件会在调用浏览器的前进，后退以及执行`history.forward`，`history.back`，`history.go`触发，因为这个操作有一个共性，即修改了历史堆栈的当前指针
- 在不改变`document`的前提下，一旦当前指针改变则会触发`onpopstate`事件

### 2.基本使用

> React17为什么可以不使用`import react from 'react'`还可以使用？
>
> - React17之前：`React.createElement`
> - React17之后：`require('react/js-runtime')`

```javascript
├── components
│   ├── Home.js
│   ├── Profile.js
│   └── User.js
└── index.js
```

#### 2.1.安装

```javascript
npm install react-router-dom -S
```

#### 2.2.`src/index.js`

```react
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
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
```

#### 2.3.`component/User.js`

```react
const User = () => {
    return <div>User</div>
}
export default User;
```

#### 2.4.`component/Home.js`

```react
const Home = () => {
    return <div>Home</div>
}
export default Home;
```

#### 2.5.`component/Profile.js`

```react
const Profile = () => {
    return <div>Profile</div>
}
export default Profile;
```

