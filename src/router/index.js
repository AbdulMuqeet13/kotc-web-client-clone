import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/auth/SignIn'
import Home from '@/views/Home'
import Customers from '@/views/users/Customers'
import Users from '@/views/users/Users'
import Notifications from '@/views/notifications/Notifications'
import NotificationForm from '@/views/notifications/NotificationForm'
import UserForm from '@/views/users/UserForm'
import CampaignStats from '@/views/campaigns/CampaignStats'
import Companies from '@/views/companies/Companies'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/user-form',
    component: UserForm 
  },
  {
    path: '/customers',
    component: Customers
  },
  {
    path: '/notifications',
    component: Notifications
  },
  {
    path: '/notification-form',
    component: NotificationForm 
  },
  {
    path: '/campaigns-stats',
    component: CampaignStats 
  },
  {
    path: '/companies',
    component: Companies 
  },
  {
    path: '/auth/sign-in',
    name: 'SignIn',
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, __, next) => {
    if (!localStorage.getItem('token') && !to.fullPath.includes('/auth') ) {
      next('/auth/sign-in');
    }
    next();
});

export default router