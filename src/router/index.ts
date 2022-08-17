import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/Catalog.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/Create.vue'),
    },
    {
      path: '/guess',
      name: 'guess',
      component: () => import('../views/Guess.vue'),
    },
    {
      path: '/memory',
      name: 'memory',
      component: () => import('../views/Memory.vue'),
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: () => import('../views/Suggestion.vue'),
    },
  ],
});

export default router;
