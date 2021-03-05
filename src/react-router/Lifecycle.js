/*
 * @Author: dfh
 * @Date: 2021-03-05 17:36:19
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 17:38:21
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/Lifecycle.js
 */
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