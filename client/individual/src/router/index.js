import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/customerhistory',
      name: 'customerhistory',
      component: PaymentView
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (!localStorage.access_token && to.name === 'payment') {
    next('/login')
  } else if (localStorage.access_token && to.name === 'login') {
    next('/')
  } else if (localStorage.access_token && to.name === 'register') {
    next('/')
  } else if (!localStorage.access_token && to.name === 'customerhistory') {
    next('/login')
  } else {
    next()
  }
})
export default router
