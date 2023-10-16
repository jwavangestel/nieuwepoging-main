<template>
    <div class="board">
      <div class="flex flex-row items-start">

        <div  class='column' v-for="(columnPos, $columnPosIdex) of boardStore.kolomPositie[0].kolomPos" :key="$columnPosIdex" > 



          <div   v-for="(column, $columnIndex) of boardStore.columns" :key="$column">
            <div v-if="column.sc_id === columnPos">
              <div class="flex items-center mb-2 font-bold" >
                {{ column.description }}  
              </div>
              <div class="list-reset"  v-for="(taakPos, $taakPosIndex) of boardStore.taakPositie" :key="$taakPosIndex"> 
   
                <div  v-for="(taakPosP, $taakPosPIndex) of taakPos.positie" :key="$taakPosPIndex" > 
  
                  <div  v-for="(taakDetail, $taakDetailIndex) of boardStore.taken" :key="$taakDetailIndex" @click="goToTask(taakDetail)"> 
                    <div  v-if="column.sc_id === taakDetail.sc_id ">
                      <div class="task" v-if="taakPosP === taakDetail.task_id ">
                        <span class="w-full flex-no-shrink font-bold">
                    
                        {{ taakDetail.titel }}
                        </span>

                        <p  class="w-full flex-no-shrink mt-1 test-sm" v-if="taakDetail.omschrijving != 'null'" >
                            {{ taakDetail.omschrijving }}
                        </p>  
                      </div>
                    </div>
                  </div>
                </div>  
              </div>   
              <input type="text"  value='' class="block p2 w-full bg-transparent" placeholder="+ Enter new task" @keyup.enter="createTask($event, column.sc_id, value)">
            </div>

          </div>

        </div> 
      </div>

      <div  class="task-bg" v-if="isTaskOpen">
          <router-view/>
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
    this.boardStore.fetchTaken().catch(error=> {
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
      console.log("wees")
      console.log(taak.task_id)
      this.boardStore.fetchTaak(taak.task_id).catch(error=> {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error}
      })
    })
//      console.log("vuur")
      this.$router.push({ name: 'task', params: { id: taak.task_id}})
    },
    close () {
      this.$router.push({ name: 'Board' })
    },
    createTask(e, column) {
      console.log("create taak" + e.target.value + column)
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
      this.boardStore.fetchLaatsteTaakId().catch(error=> {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error}
        })  
      })
      console.log('LT' + this.boardStore.latestTaakId[0].max)
      console.log(this.boardStore.taakPositie.length)
        for( let t = 0; t < this.boardStore.taakPositie.length; t++) {
            console.log(column + ' ' + this.boardStore.taakPositie[t].sc_id)
            if(column == this.boardStore.taakPositie[t].sc_id) {
              console.log('raak')
              const taskpos = this.boardStore.taakPositie[t].positie
              taskpos.splice(this.boardStore.taakPositie.length, 0, this.boardStore.latestTaakId[0].max)
            } else {
              console.log(t)
            }
        }

     
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
