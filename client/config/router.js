import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,

    // 页面跳转的时候，是否需要滚动的问题
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        // 如果之前页面有滚动，就默认到之前滚动的地方
        return savedPosition
      } else {
        // 如果之前没有，就默认在页面最上方
        return { x: 0, y: 0 }
      }
    },

    // 不是所有的浏览器都支持路由history的模式，配置fallback之后，如果浏览器不支持，会自己跳转到#哈希的方式
    fallback: true,

    // // 路由传递参数时（?a=xxx&b=xxx），把字符串转成需要的jsonObject
    // parseQuery (query) { },
    // // 将obj转成字符串
    // stringifyQuery (obj) { },

    // 路由匹配时的样式 , /login   /login/xxx
    // linkActiveClass: 'active-class',

    // 路由完全匹配时的样式, /login/xxx
    // linkExactActiveClass: 'extract-active-link',

    // base: '/base/',

    // 配置history之后，路由就不会使用'#'了，会直接是ip/app
    mode: 'history'
  })
}

// 直接new的方式，不推荐使用，因为这样在全局每个地方import的router都是同一个
// 如果需要每次import都新建一个router就做不到了，所以推荐使用上面的方法
// const router = new Router({
//   routes
// })
// export default router
