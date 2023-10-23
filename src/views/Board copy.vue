<template>
    <div class="board">

      <div v-for="(column, $columnIdex) of boardStore.columns" :key="$columnIdex" > 
        <div class="flex flex-row items-start">
          <div   class='column' v-for="(board, $boardIndex) of column.jsonb_build_object.board" :key="$boardIndex" 
              draggable="true"  
                  @dragstart.self="pickupColumn($event, $boardIndex)" 
              @drop="moveTaskOrColumn($event, board.jsonb_agg, $boardIndex)"
                  @dragover.prevent
                  @dragenter.prevent
          > 
              <div class="flex items-center mb-2 font-bold"  >
                {{ board.description }}
              </div>
              <div class="list-reset">
                <div class="task" v-for="(taak, $taakIndex) of board.jsonb_agg" :key="$taakIndex" 
                    draggable="true" 
                      @dragstart="pickupTask($event, $taakIndex, $boardIndex, $boardIndex )"            @click="goToTask(taak)"
                        @dragover.prevent
                        @dragenter.prevent
                        @drop.stop="moveTaskOrColumn($event, board.jsonb_agg, $boardIndex, $taakIndex)"
                >
                  <span class="w-full flex-no-shrink font-bold">
                    {{ taak.taken[0].t_titel }}
                    {{ taak.taken[0].t_id }}
                  </span>
                  <p v-if="taak.taken[0].omschrijving"  class="w-full flex-no-shrink mt-1 test-sm">
                    {{ taak.taken[0].omschrijving }}
                  </p>
                </div>
              <input type="text"  value='' class="block p2 w-full bg-transparent" placeholder="+ Enter new task" @keyup.enter="createTask($event, board.sc_id, value)">
            </div>
          </div>  
          <div class="column-flex">
            <input type="text" 
            value=''
            class="p-2 mr-2 flex-grow"
            placeholder="+ New Column Name"
            @keyup.enter="createColumn($event, value)"
            >
          </div>     
        </div>
      </div>
      <div  class="task-bg" v-if="isTaskOpen" >
        <router-view/>
      </div>


    </div>
</template>

<script>
import { useBoardStore } from '../stores/BoardStore'
import { useAsyncQueue } from '@vueuse/core'

export default {
  setup() {
    const boardStore = useBoardStore()
    const n = 0
    const getPromise = new Promise
    Promise => {
      setTimeout(() => {
        resolve(2);
      }, 2000)
    }

    return{
      boardStore,
      n,
      Promise
      }
    
  },
  computed: {
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  created() {
//    console.log('Peer')
    this.boardStore.fetchColumns().catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      })
    }),
    this.boardStore.fetchKolomPositie().catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      })
    }),
    this.boardStore.fetchTaakPositie().catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      })
    })

  },
  async onload() {
//    console.log('Noot')
    await this.boardStore.fetchColumns().catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      })
    })
  },
 

  methods: {
    goToTask (taak) {
//      console.log("wees")
      this.boardStore.fetchTaak(taak.taken[0].t_id).catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      })
    })
//      console.log("vuur")
      this.$router.push({ name: 'task', params: { id: taak.taken[0].t_id}})
    },
    close () {
      this.$router.push({ name: 'Board' })
    },
    createTask(e, column) {
      this.boardStore.newTaak.sc_id = column
      this.boardStore.newTaak.titel = e.target.value
//      console.log(this.boardStore.newTaak.sc_id, e.target.value)
//      console.log(this.boardStore.newTaak.sc_id + this.boardStore.newTaak.titel + 'cent')
      this.boardStore.addTaak(this.boardStore.newTaak).catch(error=> {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error}
        })
      })
      this.boardStore.newTaak.sc_id = ''
      this.boardStore.newTaak.titel = ''
      e.target.value = ''
//      console.log(this.boardStore.newTaak.sc_id + this.boardStore.newTaak.titel + 'inner')
      this.boardStore.fetchColumns().catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
        })
      })
    },
    createColumn(e) {
      console.log('column add')
      this.boardStore.newColumn.description = e.target.value
      console.log(this.boardStore.newColumn)

      this.boardStore.addKolom(this.boardStore.newColumn)
//      .catch(error=> {
//        this.$router.push({
//          name: 'ErrorDisplay',
//          params: { error: error}
//        })
//      })
//      this.boardStore.newColumn.sc_id = ''
//      this.boardStore.newColumn.description = ''
      e.target.value = ''

    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
//    console.log(e.dataTransfer)
    },
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'taak')

 //     console.log(e.dataTransfer)
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'taak') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }

    },
    moveTask (e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.boardStore.columns[0].jsonb_build_object.board[fromColumnIndex].jsonb_agg
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
//      console.log('aap' + fromColumnIndex + taskIndex + fromTasks[taskIndex].taken[0].omschrijving + toTasks)
//      console.log(e)

      this.boardStore.moveTask(
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      ) 
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.boardStore.moveColumn(
        fromColumnIndex,
        toColumnIndex
      ) 
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
  background: rgba(0,0,0,0);
}
</style>
