/*
 * @Author: dfh
 * @Date: 2021-03-04 10:40:17
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-04 11:30:22
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router-dom/index.js
 */
export * from '../react-router';//把从react-dom导入的全部导出
export { default as HashRouter } from './HashRouter'; //导入HashRouter，再导出
export { default as BrowserRouter } from './BrowserRouter';//导入RrowserRouter，再导出
