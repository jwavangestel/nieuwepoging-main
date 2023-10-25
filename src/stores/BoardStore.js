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
            taakPositie: [],
            latestTaakId: []
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
        fetchLaatsteTaakId() {
            return EventService.getlatestTaakId()
            .then(response => {
                this.latestTaakId=response.data
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
        updateTaakPositie(newTaakPos) {
            console.log('Duimen')
            return EventService.updateTaakPositie(newTaakPos)
            .then(response => {
                console.log('eend')
                this.taak=response.data
            })
            .catch(error => {
//                console.log('duim')
                throw error
            })            
        },
        moveTask( move_task_id, from_sc_id, from_taskPos_Index, fromTaskIndex, to_sc_id, to_taakPos_Index, toTaskIndex ) {
//        Update sc-id in task 
            console.log('update set sc-id: ' + to_sc_id  + ' in task: '   + move_task_id)

//        Delete task-id from current taskposition in current sc_id
            console.log('taak-id = ' + move_task_id +    
            ' in kolom_id=' + from_sc_id + 
            ' en Taakvolgorde Index=' + from_taskPos_Index + 
            ' wordt verwijderd van postitie ' + fromTaskIndex + '+1 uit deze kolom')
            const posList = useBoardStore._pinia.state.value.BoardStore.taakPositie[from_taskPos_Index].positie
            console.log('old position array before remove task: ' + posList )
            const task_id_delete = posList.splice(fromTaskIndex, 1)[0]
            console.log('old position array after remove taak:' + useBoardStore._pinia.state.value.BoardStore.taakPositie[from_taskPos_Index].positie)
            console.log('old position array after remove taak:' + task_id_delete)

//        Add task_id to taskposion of receiving sc_id 
            console.log('taak-id = ' + move_task_id +    
            ' wordt toegevoegd aan kolom_id=' + to_sc_id + 
            ' en Taakvolgorde Index =' + to_taakPos_Index + 
            '  postitie ' + toTaskIndex + '+1 uit deze kolom')
            const posListN = useBoardStore._pinia.state.value.BoardStore.taakPositie[to_taakPos_Index].positie
            console.log('new position array before adding task: ' + useBoardStore._pinia.state.value.BoardStore.taakPositie[to_taakPos_Index].positie )
            const task_id_add = posListN.splice(toTaskIndex, 0, move_task_id)
            console.log('new position array after adding taak:' + useBoardStore._pinia.state.value.BoardStore.taakPositie[to_taakPos_Index].positie)

//            const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
//            toTasks.splice(toTaskIndex, 0, taskToMove)
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