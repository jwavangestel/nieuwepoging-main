import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import defaultBoard from '@/./default-board'
import { saveStatePlugin } from '../utils' // <-- Import saveStatePlugin

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const useTodoListStore = defineStore('todoList', {
    plugins: [saveStatePlugin], // <-- Use 
    state: () => ({
        board
    })
})