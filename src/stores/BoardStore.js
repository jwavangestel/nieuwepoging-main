import { defineStore } from "pinia";
import EventService from '../services/EventService.js'

export const useBoardStore = defineStore('BoardStore', {
    state () {
        return {
            columns: [],
            column: {},
            naam: 'Jan van Gestel'
        }
    },
    getters: {
        firstName() {
            return this.naam.split(' ')[0]
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
            }
        }
    
})