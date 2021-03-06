/*
 * @Author: dfh
 * @Date: 2021-03-06 09:58:32
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-06 10:31:51
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/components/Login.js
 */
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