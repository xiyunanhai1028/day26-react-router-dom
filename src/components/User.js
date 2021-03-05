/*
 * @Author: dfh
 * @Date: 2021-03-04 10:23:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 16:29:20
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/components/User.js
 */
const User = (props) => {
    console.log(props.history)
    return <div>
        <p>User</p>
        <button onClick={()=>props.history.goBack()}>go back</button>
    </div>
}
export default User;