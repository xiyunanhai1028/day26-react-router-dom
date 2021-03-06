/*
 * @Author: dfh
 * @Date: 2021-03-04 10:23:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-06 10:33:05
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/components/Profile.js
 */
const Profile = (props) => {
    const loginInfo = JSON.parse(localStorage.getItem('login'));
    return <div>
        <p>用户名：{loginInfo.username}</p>
        <p>密码：{loginInfo.password}</p>
    </div>
}
export default Profile;