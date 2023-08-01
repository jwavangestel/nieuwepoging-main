import { defineStore } from "pinia";
import EventService from '../services/EventService.js'

export const useBoardStore = defineStore('BoardStore', {
    state () {
        return {
            columns: [],
            taak: {},
            newTaak: {
                task_id: '',
                sc_id: '',
                titel: '',
                omschrijving: ''
            }

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
        },

        addTaak(newTaak) {
            console.log(newTaak.sc_id + ' ' + newTaak.titel + " aap")
            return EventService.addTaak(newTaak)
            .then(response => {
                console.log('eend')
                this.taak=response.data
            })
            .catch(error => {
                console.log('duim')
                throw error
            })            
        }
    } 
})