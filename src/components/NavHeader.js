/*
 * @Author: dfh
 * @Date: 2021-03-07 10:13:34
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-07 10:19:19
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/components/NavHeader.js
 */
import {withRouter} from '../react-router-dom'
function NavHeader(props) {
    return <div onClick={()=>props.history.push('/')}>{props.title}</div>
}
export default withRouter(NavHeader);