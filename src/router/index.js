import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/teachers',
      name: 'Teachers',
      component: () => import("../views/Teachers/TeacherListView.vue")
    },
    {
      path: '/teachers/add',
      name: 'AddTeacher',
      component: () => import("../views/Teachers/AddTeacherView.vue")
    },
    {
      path: '/teachers/edit/:id',
      name: 'EditTeacher',
      component: () => import("../views/Teachers/EditTeacherView.vue")
    },
    {
      path: '/students',
      name: 'Students',
      component: () => import("../views/Teachers/TeacherListView.vue")
    },
  ]
})

export default router
