import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    },
    meta: {
      title: 'this is app',
      description: 'desp'
    }
    // 嵌套路由
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
