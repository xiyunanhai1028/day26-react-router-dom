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

### 3.基本实现

```javascript
├── react-router
│   ├── Route.js
│   ├── Router.js
│   ├── RouterContext.js
│   └── index.js
└── react-router-dom
    ├── BrowserRouter.js
    ├── HashRouter.js
    └── index.js
```

#### 3.1.`react-router-dom/index.js`

```javascript
export * from '../react-router';//把从react-dom导入的全部导出
export { default as HashRouter } from './HashRouter'; //导入HashRouter，再导出
export { default as BrowserRouter } from './BrowserRouter';//导入RrowserRouter，再导出
```

#### 3.2.`react-router-dom/HashRouter.js`

```react
import React from 'react';
import { createHashHistory } from 'history';//目前引入的是库中的
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
```

#### 3.3.`react-router-dom/BrowserRouter.js`

```react
import React from 'react';
import { Router } from '../react-router';
import { createBrowserHistory } from 'history';//目前引入的是库中的

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
```

#### 3.4.`react-router/index.js`

```javascript
export {default as Router} from './Router';
export {default as Route} from './Route';
export {default as __RouterContext} from './RouterContext';
```

#### 3.5.`react-router/RouterContext.js`

```javascript
import React from 'react';
export default React.createContext();
```

#### 3.6.`react-router/Router.js`

```react
import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.history.location
        }
        //监听路径变化
        this.unlisten = props.history.listen(location => {
            this.setState({location});
        })
    }

    componentWillUnmount() {
        this.unlisten();//销毁监听
    }

    render() {
        const value = {//通过value向下层传递数据
            location: this.state.location,//用来传递给Route判断路径是否匹配的
            history: this.props.history//用来让组件跳转路径的
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
export default Router;
```

#### 3.7.`react-router/Route.js`

```react
import React from 'react';
import RouterContext from './RouterContext';

class Route extends React.Component{
  static contextType=RouterContext;

	render(){
    const {location,history}=this.context;
    const {exact,component:Component,path}=this.props;
    const match=location.pathname===path;
    const routeProps={location,history};
    return match?<Component {...routeProps}/> :null;
  }
}
```

### 4.history

```javascript
history
├── createBrowserHistory.js
├── createHashHistory.js
└── index.js
```

#### 4.1.`history/index.js`

```javascript
export {default as createHashHistory} from './createHashHistory';
export {default as createBrowserHistory} from './createBrowserHistory'
```

#### 4.2.`history/createHashHistory.js`

```javascript
/*
 * @Author: dfh
 * @Date: 2021-03-04 13:40:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 17:43:52
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/history/createHashHistory.js
 */
function createHashHistory() {
    const listeners = [];
    let action;
    const historyStack = [];//历史栈
    let historyIndex = -1;//栈指针
    let state = undefined;//状态
  	//提取出来，以便后面路径不变刷新时调用
    function hashchange() {
        const pathname = window.location.hash.slice(1);
        Object.assign(history, { action, location: { pathname, state } });
        if (!action || action === 'PUSH') {//首次或者push的时候进入
            historyStack[++historyIndex] = history.location;
        } else if (action === 'REPLACE') {//替换路由
            historyStack[historyIndex] = history.location;
        }
        listeners.forEach(listen => listen(history.location))
    }
    window.addEventListener('hashchange', hashchange)

    function listen(listen) {
        listeners.push(listen);
        return () => {
            const idx = listeners.indexOf(listen);
            listeners.splice(idx, 1);//从找到位置删除
        }
    }

    /**
     * 两种情况 push('/',{})  push({pathname:'/',state:{}})
     * @param {*} pathname 可能是字符串，也可能是对象
     * @param {*} newState 状态
     */
    function push(pathname, newState) {
        action = 'PUSH';
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = newState;
        }
        //给hash赋值是不需要添加#，取得是带#
        window.location.hash = pathname;
    }

    /**
     * 两种情况 replace('/',{})  replace({pathname:'/',state:{}})
     * @param {*} pathname 可能是字符串，也可能是对象
     * @param {*} newState 状态
     */
    function replace(pathname, newState) {
        action = 'REPLACE';
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = newState;
        }
        window.location.hash = pathname;
    }

    function go(n) {
        action = 'POP';
        historyIndex += n;
        const nextLocation = historyStack[historyIndex];
        state = nextLocation.state;
        window.location.hash = nextLocation.pathname;
    }

    function goBack() {
        go(-1)
    }

    function goForward() {
        action = 'POP'
        go(1)
    }

    const history = {
        action: 'POP',
        location: { pathname: '/', state: undefined },
        push,
        replace,
        go,
        goForward,
        goBack,
        listen
    }
    action = 'PUSH';
    if (window.location.hash) {
        hashchange()
    } else {
        //赋值默认路径
        window.location.hash = '/'
    }

    return history;
}
export default createHashHistory;
```

#### 4.3.`history/createBrowserHistory.js`

```javascript
function createBrowserHistory() {
    const globalHistory = window.history;
    const listeners = [];
    let action;
    let state;
    function listen(listener) {
        listeners.push(listener);
        return () => {
            const idx = listeners.indoxOf(listener);
            listeners.splice(idx, 1);
        }
    }

    //重新原生的pushState方法
    function push(pathname, nextState) {
        action = 'PUSH';
        if (typeof pathname === 'object') {
            state = pathname.state;
            pathname = pathname.pathname;
        } else {
            state = nextState;
        }

        //调用原生方法
        globalHistory.pushState(state, null, pathname);
        const location = { state, pathname };
        notify({ action, location });
    }

    function notify(newHistory) {
        Object.assign(history, newHistory);
        listeners.forEach(listen => listen(history.location));
    }

    //原生方法，回退/前进的时候这个方法会执行
    window.onpopstate = event => {
        notify({ action: 'POP', location: { pathname: window.location.pathname, state: globalHistory.state } })
    }

    function go(n) {
        globalHistory.go(n)
    }

    function goBack() {
        go(-1)
    }

    function goForward() {
        go(1)
    }

    const history = {
        action: 'POP',
        location: { pathname: window.location.pathname, state: globalHistory.state },//刷新state不会丢失
        go,
        goBack,
        goForward,
        push,
        listen,
    }
    return history;
}

export default createBrowserHistory;
```

### 5.path-to-regexp

- [regulex](https://jex.im/regulex)
- path-to-regexp
  - sensitive 是否大小写敏感 (默认值: false)
  - strict 是否允许结尾有一个可选的/ (默认值: false)
  - end 是否匹配整个字符串 (默认值: true

#### 5.1.使用

```javascript
const pathToRegexp = require('path-to-regexp');
const keys = [];
const path = '/user/:id/:name';
const regexp = pathToRegexp(path, keys, { end: true });
const [url, ...values] = regexp.exec('/user/123/zhangsan');
const obj = keys.reduce((memo, key, index) => {
    memo[key.name] = values[index];
    return memo
}, {})
console.log(obj);//{ id: '123', name: 'zhangsan' }
```

#### 5.2.`react-router/matchPath.js`

```javascript
import PathToRegexp from 'path-to-regexp';

/**
 * 
 * @param {*} pathname 浏览器当前的真实路径
 * @param {*} options route组件的属性
 *   exact 是否精确匹配 后面能不能跟子路径
 *   strict 是否严格匹配 后面能不能有可选的/
 *   sensitive 是否是大小写敏感 
 */
function matchPath(pathname, options = {}) {
    const { path = '/', exact = false, strict = false, sensitive = false } = options;
    const { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
    const match = regexp.exec(pathname);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = pathname === url;
    //如果要求精确，但不精确，也返回null
    if (exact && !isExact) return null;
    return {
        path,//来自route里的路径
        url,//来自浏览器的地址
        isExact,//是否精确匹配
        params: keys.reduce((memo, key, index) => {//参数
            memo[key.name] = values[index];
            return memo;
        }, {})
    }
}

let cache = {}
function compilePath(path, options) {
    const cacheKey = path + JSON.stringify(options);
    if (cache[cacheKey]) return cache[cacheKey];
    const keys = [];//处理路径参数
    const regexp = PathToRegexp(path, keys, options);
    const result = { keys, regexp };
    cache[cacheKey] = result;
    return result
}
export default matchPath;
```

#### 5.3.`react-router/Router.js`

```react
import React from 'react';
import RouterContext from './RouterContext';
class Router extends React.Component {

+   static computeRootMatch(pathname) {
+       return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
+   }

    constructor(props) {
        super(props);
        this.state = {
            location: props.history.location
        }
        //监听路径变化
        this.unlisten = props.history.listen(location => {
            this.setState({ location });
        })
    }

    componentWillUnmount() {
        this.unlisten();//销毁监听
    }

    render() {
        const value = {//通过value向下层传递数据
            location: this.state.location,//用来传递给Route判断路径是否匹配的
            history: this.props.history,//用来让组件跳转路径的
+           match: Router.computeRootMatch(this.state.location.pathname)
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
export default Router;
```

#### 5.4.`react-router/Route.js`

```react
import React from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Route extends React.Component {
    static contextType = RouterContext;
    render() {
        const { location, history } = this.context;
+       const { component: Component } = this.props
+       const match = matchPath(location.pathname, this.props);
+       const routeProps = { location, history,match };
        return match ? <Component {...routeProps} /> : null
    }
}
export default Route;
```

#### 5.5.`react-router/index.js`

```javascript
  export { default as Router } from './Router';
  export { default as Route } from './Route';
  export { default as __RouterContext } from './RouterContext';
+ export { default as matchPath } from './matchPath';
```

### 6.Switch实现

#### 6.1.`react-route/Switch.js`

```react
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
```

#### 6.2.`react-route/Route.js`

```react
import React from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Route extends React.Component {
    static contextType = RouterContext;
    render() {
        const { location, history } = this.context;
+       const { component: Component, computedMatch } = this.props;
+       //优化点，Switch判断过了，不用在判断
+       const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        const routeProps = { location, history, match };
        return match ? <Component {...routeProps} /> : null
    }
}
export default Route;
```

#### 6.3.`react-route/index.js`

```javascript
	export { default as Router } from './Router';
	export { default as Route } from './Route';
	export { default as __RouterContext } from './RouterContext';
	export { default as matchPath } from './matchPath';
+ export { default as Switch } from './Switch';
```

### 7.Redirect实现

#### 7.1.`react-route/Lifecycle.js`

```react
import React from 'react';

class LifeCycle extends React.Component {

    componentDidMount() {
        this.props.onMount && this.props.onMount();
    }

    componentWillUnmount() {
        this.props.unMount && this.props.unMount();
    }
    render(){
        return null;
    }
}
export default LifeCycle;
```

#### 7.2.`react-route/Redirect.js`

```react
import React from 'react';
import LifeCycle from './Lifecycle';
import RouterContext from './RouterContext';

const Redirect = ({to}) => {
    return <RouterContext>{
        value => <LifeCycle onMount={() =>value.history.push(to)} />
    }</RouterContext>
}
export default Redirect;
```

#### 7.3.`react-route/index.js`

```javascript
export { default as Router } from './Router';
export { default as Route } from './Route';
export { default as __RouterContext } from './RouterContext';
export { default as matchPath } from './matchPath';
export { default as Switch } from './Switch';
+ export { default as Redirect } from './Redirect';
```

### 8.Link实现

#### 8.1.事例

```react
import React from 'react';
import ReactDOM from 'react-dom';
+import {HashRouter as Router,Route,Switch,Redirect,Link} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
    <Router>
+      <ul>
+          <li><Link to="/">首页</Link></li>
+          <li><Link to="/user" >用户管理</Link></li>
+          <li><Link to="/profile" >个人中心</Link></li>
+      </ul>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/user" component={User} />
          <Route path="/profile" component={Profile}/>
          <Redirect to="/"/>
        </Switch>
    </Router>
,document.getElementById('root'));
```



#### 8.1.`react-router-dom/Link.js`

```react
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
```

#### 8.2.`react-router-dom/index.js`

```javascript
	export * from '../react-router';//把从react-dom导入的全部导出
	export { default as HashRouter } from './HashRouter'; //导入HashRouter，再导出
	export { default as BrowserRouter } from './BrowserRouter';//导入RrowserRouter，再导出
+ export { default as Link } from './Link';//导入RrowserRouter，再导出
```

### 9.受保护路由

![受保护路由](/Users/dufeihu/Documents/html/zhufeng/复习/day26-react-router-dom/受保护路由.gif)

#### 9.1.`Login.js`

```react
import React from 'react';
function Login(props) {
    const nameRef = React.useRef();
    const pwdRef = React.useRef();

    function submitHandler(event) {
        event.preventDefault();
        const state = props.location.state
        let to = '/'
        localStorage.setItem('login', JSON.stringify({
            username: nameRef.current.value,
            password: pwdRef.current.value
        }))
        if (state) {
            to = state.from;
        }
        props.history.push(to);
    }
    return <form>
        <input type="text" ref={nameRef} placeholder='请输入用户名' /> <br />
        <input type="password" ref={pwdRef} placeholder='请输入秘密' />
        <button onClick={submitHandler}>登陆</button>
    </form>
}
export default Login;
```

#### 9.2.`Protected.js`

```react
import { Route, Redirect } from '../react-router-dom'
function Protected(props) {
    const { path, component: Component } = props
    return <Route path={path} render={
        routeProps => {
            const login = localStorage.getItem('login');
            return login ? <Component {...routeProps} /> : <Redirect to={{ pathname: '/login', state: { from: path } }} />
        }
    } />
}
export default Protected;
```

#### 9.3.`index.js`

```react
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link } from './react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
import Protected from './components/Protected';
import Login from './components/Login';

ReactDOM.render(
  <Router>
    <ul>
      <li><Link to='/user'>user</Link></li>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/profile'>Profile</Link></li>
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
```

#### 9.4.`react-router/Route.js`

> 指定一个Route组件要渲染的内容有三种方式：
>
> - 1.component属性，值是一个组件的类型，它不能写定义的逻辑
> - 2.render属性，它是一个函数，如果路径匹配的话，就要渲染它这个函数的返回值
> - 3.children属性，它也是一个函数，不管匹不匹配都渲染
>
> render和children的区别：
>
> - 1.render匹配才渲染，不匹配不渲染
> - 2.children不管匹配不匹配都渲染

```react
import React from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Route extends React.Component {
    static contextType = RouterContext;
    render() {
        const { location, history } = this.context;
+       const { component: Component, computedMatch, render } = this.props;
        //优化点，Switch判断过了，不用在判断
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        const routeProps = { location, history, match };
+       let renderElement = null;
+       if (match) {
+           if (Component) {
+               renderElement = <Component {...routeProps} />;
+           } else if (render) {
+               renderElement = render(routeProps);
+           } else if (children) {
+               renderElement = children(routeProps)
+           }
+       } else {
+           if (children) {
+               renderElement = children(routeProps)
+           }
+       }
+       return renderElement;
    }
}
export default Route;
```

### 10.NavLink

![NavLink演示图](/Users/dufeihu/Documents/html/zhufeng/复习/day26-react-router-dom/NavLink演示图.gif)

#### 10.1.`index.html`

```html
<!--
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-06 10:47:53
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/public/index.html
-->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <title>React App</title>
  <style>
    .strong {
      font-size: 20px;
    }

    .active {
      background-color: skyblue;
    }
  </style>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

#### 10.2.`index.js`

```react
/*
 * @Author: dfh
 * @Date: 2021-03-04 08:58:14
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-06 11:03:43
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link, NavLink } from './react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
import Protected from './components/Protected';
import Login from './components/Login';

ReactDOM.render(
  <Router>
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
```

#### 10.3.`react-router-dom/NavLink.js`

```react
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
```

#### 10.4.`react-router-dom/index.js`

```javascript
	export * from '../react-router';//把从react-dom导入的全部导出
	export { default as HashRouter } from './HashRouter'; //导入HashRouter，再导出
	export { default as BrowserRouter } from './BrowserRouter';//导入RrowserRouter，再导出
	export { default as Link } from './Link';
+ export { default as NavLink } from './NavLink';
```

### 11.withRouter

#### 11.1.`react-router/withRouter.js`

```react
import RouterContext from './RouterContext';
function withRouter(OldComponent) {
    return props => <RouterContext.Consumer>{//value={history,loaction,match}
        value => <OldComponent {...props} {...value} />
    }</RouterContext.Consumer>
}
export default withRouter;
```

### 12.Hooks

![hooks](/Users/dufeihu/Documents/html/zhufeng/复习/day26-react-router-dom/hooks.gif)

#### 12.1.`src/index.js`

```react
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

```

#### 12.2.`react-router/hooks.js`

```javascript
import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export function useParams() {
    const match = React.useContext(RouterContext).match;
    debugger
    return match ? match.params : {};
}

export function useLocation() {
    return React.useContext(RouterContext).location;
}

export function useHistory() {
    return React.useContext(RouterContext).history;
}

export function useRouteMatch(options) {
    const location = useLocation();//获取当前的路径pathname
    const match = React.useContext(RouterContext).match;//获取匹配结果
    return options ? matchPath(location.pathname, options) : match;
}
```

