<template>
  <div v-for="(task, $taskIndex) of boardStore.taak" :key="$taskIndex" > 
    <div class="task-view">
      <div class="flex flex-col flex-grow items-start justify-between px-4">
         <div class="flex items-center mb-2 font-bold" >
             {{ task.titel }}
         </div>
         <textarea class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal" :value="task.omschrijving"></textarea>
         <div>
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Close en Save
          </button>
         </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from '../stores/BoardStore'
import { ref } from 'vue'

export default {
  setup() {
    const boardStore = useBoardStore()
    const id = 4

    return{
      boardStore
    }
  },

  computed: {
    task() {
      return this.getTask(this.$route)
    }
  
  },
  
  created() {
   // this.boardStore.fetchTaak(5).catch(error=> {
    // this.$router.push({
    //    name: 'ErrorDisplay',
    //    params: { error: error}
    //  }
 
    //  )
   // }
  }
}

</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left;
  max-width: 700px;
}
</style>
