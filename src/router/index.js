import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue'
import QuizManager from '@/components/QuizManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameView,
    },
    {
      path: '/admin/quiz',
      name: 'quizManager',
      component: QuizManager,
    },
  ],
})

export default router
