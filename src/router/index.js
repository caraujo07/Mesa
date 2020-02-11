import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp')
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Home')
  }
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '../views/Login')
  // }
]

const router = new VueRouter({
  routes
})

export default router
