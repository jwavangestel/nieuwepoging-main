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
//            console.log("quincy")
            return EventService.getColumns()
            .then(response => {
//                console.log("poes")
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
//            console.log(newTaak.sc_id + ' ' + newTaak.titel + " aap")
            return EventService.addTaak(newTaak)
            .then(response => {
//                console.log('eend')
                this.taak=response.data
            })
            .catch(error => {
//               console.log('duim')
                throw error
            })            
        },

        updateTaak(newTaak) {
            console.log(newTaak.sc_id + ' ' + newTaak.titel + newTaak.titel + " cent")
            return EventService.updateTaak(newTaak)
            .then(response => {
//                console.log('eend')
                this.taak=response.data
            })
            .catch(error => {
//                console.log('duim')
                throw error
            })            
        },
        moveTask(fromTasks, toTasks, taskIndex ) {
            console.log('beer' + fromTasks + ' ' + taskIndex)
            const taskToMove = fromTasks.splice(taskIndex, 1)[0]
            toTasks.push(taskToMove)
        },
        moveColumn(fromColumnIndex, toColumnIndex ) {
            const columnList = useBoardStore._pinia.state.value.BoardStore.columns[0].jsonb_build_object.board
            const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
            columnList.splice(toColumnIndex, 0, columnToMove)
        }

 
    } 
})