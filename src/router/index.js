import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import MembersView from '../views/MembersView.vue'
import TemplatesView from '../views/TemplatesView.vue'
import TemplateView from '../views/UserTemplateView.vue'
import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: '/',
        component: TemplateView
      },
      {
        path: '/templates',
        component: TemplatesView
      },
      {
        path: '/members',
        component: MembersView
      },
      {
        path: '/template',
        component: TemplateView
      },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  if (to.path !== '/' && !isAuthenticated) {
    next('/');
  } else { next() }
})

export default router
