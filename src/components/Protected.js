/*
 * @Author: dfh
 * @Date: 2021-03-06 09:55:18
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-06 10:32:08
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/components/Protected.js
 */
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