import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue'
import Task from '../views/Task.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Board',
      component: Board,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: Task,
          params: ':id'
        }
      ]
    },
  ]
})

export default router
