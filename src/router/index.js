import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardView,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import("../views/Dashboard/HomeView.vue")
        },
        {
          path: '/teachers',
          name: 'Teachers',
          component: () => import("../views/Dashboard/Teachers/TeacherListView.vue")
        },
        {
          path: '/teachers/add',
          name: 'AddTeacher',
          component: () => import("../views/Dashboard/Teachers/AddTeacherView.vue")
        },
        {
          path: '/teachers/edit/:id',
          name: 'EditTeacher',
          component: () => import("../views/Dashboard/Teachers/EditTeacherView.vue")
        },
        {
          path: '/students',
          name: 'Students',
          component: () => import("../views/Dashboard/Teachers/TeacherListView.vue")
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("../views/Login/LoginView.vue")
    },
    {
      path: '/:notFound(.*)',
      component: () => import("../views/NotFound.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  }
})

router.beforeEach((to, from, next) => {

  const publicRoutes = ["Login"];
  const needsAuth = !publicRoutes.includes(to.name);
  const token = localStorage.getItem("token");
  if (needsAuth && token) {
    next();
  } else {
    if (to.name == "Login") {
      next();
    } else {
      next({ name: "Login" });
    }
  }

})



export default router
