/*
 * @Author: dfh
 * @Date: 2021-03-04 13:40:27
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 16:28:32
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/history/createBrowserHistory.js
 */

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