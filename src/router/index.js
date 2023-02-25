import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
    },
    {
      path: '/:currentPath(.*)*',
      redirect: () => ({ path: '/' }),
    },  
  ],
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

export default router
