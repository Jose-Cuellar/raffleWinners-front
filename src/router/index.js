import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '../layouts/guestLayout.vue'
import AuthenticatedLayout from '../layouts/authenticatedLayout.vue'
import AdminLayout from '../layouts/adminLayout.vue'

import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Profile from '../views/profile.vue'
import AdminDashboard from '../views/adminDashboard.vue'
// import UpdateInfo from '../views/updateInfo.vue'
// import CreatePost from '../views/createPost.vue'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      { path: '', redirect: '/login' },
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },
  {
    path: '/app',
    component: AuthenticatedLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'profile', component: Profile },
      // { path: 'update-info', component: UpdateInfo },
      // { path: 'create-post', component: CreatePost }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: 'dashboard', component: AdminDashboard }
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