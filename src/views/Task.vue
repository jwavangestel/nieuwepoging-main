<template>
  <div v-for="(task, $taskIndex) of boardStore.taak" :key="$taskIndex" > 
    <div class="task-view">
      <div class="flex flex-col flex-grow items-start justify-between px-4">
        <div class="form-container w-full">
          <form>
            <div>
              <input class="p-2 w-full mr-2 block text-xl font-bold" type="text" v-model="boardStore.taak[0].titel">
            </div>
            <div>
              <label>omschrijving</label>
            </div>
            <div>
              <textarea class="relative bg-transparent px-2 border mt-2  w-full h-64 border-none leading-normal" v-model="boardStore.taak[0].omschrijving"></textarea>          
            </div>

              <button class="bg-white hover:bg-grey text-gray-800 font-semibold py-2 px-4 m-10 border border-gray-400 rounded shadow" type="button" v-on:click="Close"> 
                Cancel
              </button>
              <button class="bg-white hover:bg-grey text-gray-800 font-semibold py-2 px-4 m-10 border border-gray-400 rounded shadow" type="button" v-on:click="SaveAndClose"> 
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
    const colIndex = 0
    const taskIndex = 1


    return{
      boardStore,
      colIndex,
      taskIndex
    }
  },

  computed: {
    task() {
      console.log("xeomi")
      return this.getTask(this.$route)
    }
  
  },
  
  created() {
   // console.log("yvonne")
   // this.boardStore.fetchTaak(5).catch(error=> {
    // this.$router.push({
    //    name: 'ErrorDisplay',
    //    params: { error: error}
    //  }
 
    //  )
   // }
  },

  methods: {
    SaveAndClose () {
      console.log("closed " + this.boardStore.taak[0].omschrijving)
      this.boardStore.newTaak.task_id = this.boardStore.taak[0].task_id
      this.boardStore.newTaak.sc_id = this.boardStore.taak[0].sc_id
      this.boardStore.newTaak.titel = this.boardStore.taak[0].titel
      this.boardStore.newTaak.omschrijving = this.boardStore.taak[0].omschrijving

      let colIndex = 0
      let taskIndex = 0
      let beer = []
      let end = ''
      let y = 0
//      console.log(this.boardStore.taken.length)
      for (let c = 0; c < this.boardStore.taken.length; c++) {
//            console.log(c)
               console.log("pipo" + this.boardStore.taken[c].task_id)
               if(this.boardStore.taken[c].task_id === this.boardStore.newTaak.task_id) {
//                colIndex = c
//                taskIndex = i
                console.log("Hoera! ")
                this.boardStore.taken[c].titel = this.boardStore.newTaak.titel
                this.boardStore.taken[c].omschrijving = this.boardStore.newTaak.omschrijving



                { break }
//               }
            }
       }
       

       this.boardStore.updateTaak(this.boardStore.taak[0]).catch(error=> {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error}
        })
      })
      //this.boardStore.fetchColumns().catch(error=> {
     //this.$router.push({
     //   name: 'ErrorDisplay',
     //  params: { error: error}
     //  })
     //})
  
     this.$router.push({ name: 'Board' })

 
    
//    })
    },
    Close () {
      this.$router.push({ name: 'Board' })
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
