/*
 * @Author: dfh
 * @Date: 2021-03-04 11:18:15
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 14:10:39
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/Router.js
 */
import React from 'react';
import RouterContext from './RouterContext';
class Router extends React.Component {

    static computeRootMatch(pathname) {
        return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
    }

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
            match: Router.computeRootMatch(this.state.location.pathname)
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
export default Router;