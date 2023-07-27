import { defineStore } from "pinia";
import EventService from '../services/EventService.js'

export const useBoardStore = defineStore('BoardStore', {
    state () {
        return {
            columns: [],
            taak: {},

        }
    },
    getters: {
        goToTask (state) {
            return (id) => {
                for(const column of state.board.columns) {
                    for (const task of column.tasks) {
                        if (task.id === id) {
                            return task
                        }
                    }
                }
            }
        }

    },
    actions: {
        fetchColumns() {
            return EventService.getColumns()
            .then(response => {
                this.columns=response.data
            })
            .catch(error => {
                throw error
            })
        },
        
        fetchTaak(t_id) {
            return EventService.getTaak(t_id)
            .then(response => {
                this.taak=response.data
            })
            .catch(error => {
                throw error
            })            
        }
    } 
})