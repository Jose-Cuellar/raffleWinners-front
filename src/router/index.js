import { createRouter, createWebHistory } from 'vue-router';
import guestLayout from '../layouts/guestLayout.vue';
import userLayout from '../layouts/userLayout.vue';
import adminLayout from '../layouts/adminLayout.vue';

import login from '../views/home/login.vue';
import register from '../views/home/register.vue';
import profile from '../views/user/profile.vue';
import adminDashboard from '../views/admin/adminDashboard.vue';
import userManagement from '../views/admin/userManagement.vue';
import raffleManagement from '../views/admin/raffleManagement.vue';
import createRaffle from '../views/user/createRaffle.vue';
import editRaffle from '../views/user/editRaffle.vue';
import showRaffle from '../views/user/showRaffle.vue';

const routes = [
  {
    path: '/',
    component: guestLayout,
    children: [
      {
        path: '',
        name: 'home',
        redirect: '/login' 
      },
      { 
        path: 'login',
        name: 'login',
        component: login 
      },
      { 
        path: 'register',
        name: 'register',
        component: register 
      }
    ]
  },
  {
    path: '/app',
    component: userLayout,
    meta: { requiresAuth: true },
    children: [
      { 
        path: 'profile',
        name: 'profile',
        component: profile 
      },
      { 
        path: 'create-raffle',
        name: 'createRaffle',
        component: createRaffle 
      },
      { 
        path: 'edit-raffle',
        name: 'editRaffle',
        component: editRaffle 
      },
      { 
        path: 'show-raffle',
        name: 'showRaffle',
        component: showRaffle 
      },
    ]
  },
  {
    path: '/admin',
    component: adminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { 
        path: 'dashboard',
        name: 'dashboard',
        component: adminDashboard 
      },
      {
        path: 'user-management',
        name: 'userManagement',
        component: userManagement
      },
      {
        path: 'raffle-management',
        name: 'raffleManagement',
        component: raffleManagement
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }
  if (to.meta.requiresAdmin && (!user || !user.is_staff)) {
    return next('/app/profile')
  }
  if ((to.path === '/login' || to.path === '/register') && user) {
    return next('/app/profile')
  }

  next()
})

export default router
export { routes }