/*
 * @Author: dfh
 * @Date: 2021-03-04 13:40:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 08:56:49
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/history/createHashHistory.js
 */
function createHashHistory() {
    const listeners = [];
    let action;
    const historyStack = [];//历史栈
    let historyIndex = -1;//栈指针
    let state = undefined;//状态
    window.addEventListener('hashchange', () => {
        const pathname = window.location.hash.slice(1);
        Object.assign(history, { action, location: { pathname, state } });
        if (!action || action === 'PUSH') {//首次或者push的时候进入
            historyStack[++historyIndex] = history.location;
        } else if (action === 'REPLACE') {//替换路由
            historyStack[historyIndex] = history.location;
        }
        listeners.forEach(listen => listen(history.location))
    })

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
    //赋值默认路径
    window.location.hash = window.location.hash.slice(1) || '/'
    return history;
}
export default createHashHistory;