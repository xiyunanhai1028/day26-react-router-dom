/*
 * @Author: dfh
 * @Date: 2021-03-04 10:23:35
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 15:55:18
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/components/Home.js
 */
const Home = (props) => {
    return <div>
        <p>Home</p>
        <button onClick={() => props.history.push('/user', { name: '用户' })}>to user</button>
        <button onClick={() => props.history.push({pathname:'/profile',state:{name:'信息'}})}>to user</button>
    </div>
}
export default Home;