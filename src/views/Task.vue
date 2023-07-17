<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
         
        <div v-for="(column, $columnIdex) of boardStore.columns" :key="$columnIdex" > 
   

 
          <div class="task" v-for="(task, $taskIndex) of column.tasks" :key="$taskIndex" >



            <p v-if="task.id === 4" >
              {{ task.name }}
            </p>
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
    const id = ref(3)

    return{
      boardStore
    }
  },
  computed: {
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  created() {
    this.boardStore.fetchColumns().catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      }
 
      )
    })
  }
}

</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left;
  max-width: 700px;
}
</style>
