import { defineStore } from "pinia";

export const useUserStore = defineStore('UserStore', {
    state () {
        return {
            user: 'Adam Jahr'
        }
    }
})