<template>
  <div v-for="(task, $taskIndex) of boardStore.taak" :key="$taskIndex" > 
    zuur
      {{ boardStore.taak[0] }})
    <div class="task-view">
      <div class="flex flex-col flex-grow items-start justify-between px-4">
        <div class="form-container w-full">
          <form @submit.prevent="close">
            <div>
              <input class="p-2 w-full mr-2 block text-xl font-bold" type="text" v-model="boardStore.taak[0].titel">
            </div>
            <div>
              <label>omschrijving</label>
            </div>
            <div>
              <textarea class="relative bg-transparent px-2 border mt-2  w-full h-64 border-none leading-normal" v-model="boardStore.taak[0].omschrijving"></textarea>          
            </div>

              <button class="bg-white hover:bg-grey text-gray-800 font-semibold py-2 px-4 m-10 border border-gray-400 rounded shadow" type="submit"> 
                Save and Close
              </button>


          </form>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from '../stores/BoardStore'
import { ref, toHandlers } from 'vue'

export default {
  setup() {

    const boardStore = useBoardStore()


    return{
      boardStore
    }
  },

  computed: {
    task() {
      console.log("xeomi")
      return this.getTask(this.$route)
    }
  
  },
  
  created() {
    console.log("yvonne")
   // this.boardStore.fetchTaak(5).catch(error=> {
    // this.$router.push({
    //    name: 'ErrorDisplay',
    //    params: { error: error}
    //  }
 
    //  )
   // }
  },

  methods: {
    close () {
      console.log("closed " + this.boardStore.taak[0].omschrijving)
      this.boardStore.newTaak.task_id = this.boardStore.taak[0].task_id
      this.boardStore.newTaak.sc_id = this.boardStore.taak[0].sc_id
      this.boardStore.newTaak.titel = this.boardStore.taak[0].titel
      this.boardStore.newTaak.omschrijving = this.boardStore.taak[0].omschrijving
      console.log("Kauw " + this.boardStore.newTaak.task_id)

      this.boardStore.updateTaak(this.boardStore.taak[0]).catch(error=> {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error}
        })
      })
//      this.boardStore.fetchColumns().catch(error=> {
//      this.$router.push({
//        name: 'ErrorDisplay',
//        params: { error: error}
//        })
//      })
      this.$router.push({ name: 'Board' })
 
    
//    })
    }
  }
}

</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left;
  max-width: 700px;
}
</style>
