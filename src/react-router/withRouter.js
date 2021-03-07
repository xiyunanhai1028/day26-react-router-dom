/*
 * @Author: dfh
 * @Date: 2021-03-07 10:16:16
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-07 10:20:12
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/withRouter.js
 */
import RouterContext from './RouterContext';
function withRouter(OldComponent) {
    return props => <RouterContext.Consumer>{//value={history,loaction,match}
        value => <OldComponent {...props} {...value} />
    }</RouterContext.Consumer>
}
export default withRouter;