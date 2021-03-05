/*
 * @Author: dfh
 * @Date: 2021-03-05 17:36:03
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 17:45:24
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/Redirect.js
 */
import React from 'react';
import LifeCycle from './Lifecycle';
import RouterContext from './RouterContext';

const Redirect = ({to}) => {
    return <RouterContext>{
        value => <LifeCycle onMount={() =>value.history.push(to)} />
    }</RouterContext>
}
export default Redirect;