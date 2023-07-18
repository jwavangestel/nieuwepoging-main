<template>
    <div class="board">
      <div v-for="(column, $columnIdex) of boardStore.columns" :key="$columnIdex" > 
        <div class="flex flex-row items-start">
          <div   class='column' v-for="(board, $boardIdex) of column.jsonb_build_object.board" :key="$columnIdex" > 
            <div class="flex items-center mb-2 font-bold"  >
              {{ board.description }}
            </div>
            <div class="list-reset">
              <div class="task" v-for="(task, $taskIndex) of board.jsonb_agg" :key="$taskIndex">
                <span class="w-full flex-no-shrink font-bold">
                  {{ task.t_titel }}
                </span>
                <p v-if="task.omschrijving"  class="w-full flex-no-shrink mt-1 test-sm">
                  {{ task.omschrijving }}
                </p>
              </div>
            </div>
          </div>         
        </div>
      </div>
    </div>
</template>

<script>
import { useBoardStore } from '../stores/BoardStore'

export default {
  setup() {
    const boardStore = useBoardStore()

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
  },
  methods: {
    GoToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id}})
    }
  }

}

      
</script>

<style scoped>

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow ;
  min-width: 350px;
}
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {

}
</style>
