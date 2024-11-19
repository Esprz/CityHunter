import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useMapUIStore } from '@/stores/mapUIStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TutorialView.vue'),
    },
    {
      path: '/hunt',
      name: 'hunt',
      component: () => import('../views/HuntView.vue'),
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: () => import('../views/RewardsView.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/achieved',
      name: 'achieved',
      component: () => import('../views/AchievedView.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  const mapUIStore = useMapUIStore()

  if (to.name === 'hunt') {
    mapUIStore.NavBarItem = 'my-hunt'
  }
  else if (to.name === 'rewards') {
    mapUIStore.NavBarItem = 'rewards'
  }
  next()
})

export default router
