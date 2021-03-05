/*
 * @Author: dfh
 * @Date: 2021-03-05 13:50:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-05 17:28:12
 * @Modified By: dfh
 * @FilePath: /day26-react-router-dom/src/react-router/matchPath.js
 */
import PathToRegexp from 'path-to-regexp';

/**
 * 
 * @param {*} pathname 浏览器当前的真实路径
 * @param {*} options route组件的属性
 *   exact 是否精确匹配 后面能不能跟子路径
 *   strict 是否严格匹配 后面能不能有可选的/
 *   sensitive 是否是大小写敏感 
 */
function matchPath(pathname, options = {}) {
    const { path = '/', exact = false, strict = false, sensitive = false } = options;
    const { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
    const match = regexp.exec(pathname);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = pathname === url;
    //如果要求精确，但不精确，也返回null
    if (exact && !isExact) return null;
    return {
        path,//来自route里的路径
        url,//来自浏览器的地址
        isExact,//是否精确匹配
        params: keys.reduce((memo, key, index) => {//参数
            memo[key.name] = values[index];
            return memo;
        }, {})
    }
}

let cache = {}
function compilePath(path, options) {
    const cacheKey = path + JSON.stringify(options);
    if (cache[cacheKey]) return cache[cacheKey];
    const keys = [];//处理路径参数
    const regexp = PathToRegexp(path, keys, options);
    const result = { keys, regexp };
    cache[cacheKey] = result;
    return result
}
export default matchPath;