import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
//import defaultBoard from '@/./default-board'
import axios from 'axios'


const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
const columns = ref(null)
export const useBoardStore = defineStore('boardStore', {
    state() {
        return {
            colomns: [],
            colomn: {},
            user: 'Jan van Gestel'
        }
    }
})

onMounted(() => {
  axios.get(`http://localhost:3000/columns`)
  .then((response) => {
    console.log(response.data)
  })
 

  
})


export const useTodoListStore = defineStore('todoList', {
    state: () => ({
        board,
        columns
    })
})