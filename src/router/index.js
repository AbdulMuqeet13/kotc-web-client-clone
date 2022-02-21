import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/auth/SignIn'
import Home from '@/views/Home'
import Dashboard from '@/components/Dashboard'
import Customers from '@/views/users/Customers'
import Users from '@/views/users/Users'
import Notifications from '@/views/notifications/Notifications'

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
          path: '/',
          component: Home
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/customers',
        component: Customers
      },
      {
        path: '/notifications',
        component: Notifications
      },
    ]
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
