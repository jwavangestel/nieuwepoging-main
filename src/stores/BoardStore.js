import { defineStore } from "pinia";
import EventService from '../services/EventService.js'

export const useBoardStore = defineStore('BoardStore', {
    state () {
        return {
            columns: [],
            taken: [],
            taak: {},
            newTaak: {
                task_id: '',
                sc_id: '',
                titel: '',
                omschrijving: ''
            },
            newColumn: {
                sc_id: '',
                description: '',
                col_pos: ''
            },
            kolomPositie: [],
            taakPositie: []
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

        fetchKolomPositie() {
            return EventService.getColumnsPositie()
            .then(response => {
                this.kolomPositie=response.data
            })
            .catch(error => {
                throw error
            })
        },
        fetchTaken() {
            //            console.log("quincy")
                        return EventService.getTaken()
                        .then(response => {
            //                console.log("poes")
                            this.taken=response.data
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

        fetchTaakPositie() {
            return EventService.getTaakPositie()
            .then(response => {
                this.taakPositie=response.data
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
        moveTask(fromTasks, fromTaskIndex, toTasks, toTaskIndex ) {
//            console.log('beer' + fromTasks + ' ' + taskIndex)
            const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
            toTasks.splice(toTaskIndex, 0, taskToMove)
        },
        addKolom( newColumn ) {  
            console.log('lang')     
            const columnList = useBoardStore._pinia.state.value.BoardStore.columns[0].jsonb_build_object.board
//            newColumn.col_pos = columnList.lenght + 1
            console.log(columnList)
            columnList.push(newColumn)           
        },
        moveColumn(fromColumnIndex, toColumnIndex ) {
            const columnList = useBoardStore._pinia.state.value.BoardStore.columns[0].jsonb_build_object.board
            const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
            columnList.splice(toColumnIndex, 0, columnToMove)
        }

 
    } 
})