<template>
    <div class="board">
 




        <div  v-for="(columnPosH, $columnPosHIdex) of boardStore.kolomPositie" :key="$columnPosHIdex" >     
          <div class="flex flex-row items-start">
                  <div  class='column' v-for="(columnPos, $columnPosIdex) of columnPosH.kolomPos" :key="$columnPosIdex" > 
            <div   v-for="(column, $columnIndex) of boardStore.columns" :key="$columnIndex">
              <div v-if="column.sc_id === columnPos">
                <div class="flex items-center mb-2 font-bold" >
                  {{ column.description }}  
                </div>
                <div  class="list-reset" v-for="(taakPos, $taakPosIndex) of boardStore.taakPositie" :key="$taakPosIndex"> 
    
                  <div  v-for="(taakPosP, $taakPosPIndex) of taakPos.positie" :key="$taakPosPIndex" > 
    
                    <div  v-for="(taakDetail, $taakDetailIndex) of boardStore.taken" :key="$taakDetailIndex" @click="goToTask(taakDetail)"> 
                      <div  v-if="column.sc_id === taakDetail.sc_id ">
                        <div class="task" v-if="taakPosP === taakDetail.task_id" 
                          draggable="true"
                          @dragstart="pickupTask($event, columnPos, $taakPosIndex, taakDetail, $taakPosPIndex )"            
                          @dragover.prevent
                          @dragenter.prevent
                          @drop.stop="moveTask($event,  columnPos, $taakPosIndex, $taakPosPIndex)"                         
                          >
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
      </div>

      <div  class="task-bg" v-if="isTaskOpen">
          <router-view/>
      </div>




    </div>
</template>

<script>
import { setMapStoreSuffix } from 'pinia'
import { useBoardStore } from '../stores/BoardStore'
import { useAsyncQueue } from '@vueuse/core'

export default {
setup() {

 
    const boardStore = useBoardStore()
    const n = 0



    return{
      boardStore,
      n
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
    }),
    this.boardStore.fetchLaatsteTaakId().catch(error=> {
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
    async createTask(e, column) {

      console.log("create taak" + e.target.value + column)
      this.boardStore.newTaak.sc_id = column
      this.boardStore.newTaak.titel = e.target.value
//      console.log(this.boardStore.newTaak.sc_id, e.target.value)
//      console.log(this.boardStore.newTaak.sc_id + this.boardStore.newTaak.titel + 'cent')
      await this.boardStore.addTaak(this.boardStore.newTaak).catch(error=> {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error}
        })
      })
 
//      console.log('leuk')
       await this.boardStore.fetchLaatsteTaakId().catch(error=> {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error}
 
        }) 
 
      })

//      console.log('Mies '+ this.boardStore.latestTaakId[0].max) 

//      console.log(this.boardStore.taakPositie)
//      console.log('LT' + this.boardStore.latestTaakId[0].max + 1)
//      console.log(this.boardStore.taakPositie.length)
        for( let t = 0; t < this.boardStore.taakPositie.length; t++) {
//            console.log(column + ' ' + this.boardStore.taakPositie[t].sc_id)
            if(column == this.boardStore.taakPositie[t].sc_id) {
//              console.log('raak')
              const taskpos = this.boardStore.taakPositie[t].positie
              let n = 0
              taskpos.splice(taskpos.length, 0, this.boardStore.latestTaakId[n].max)
//              console.log( this.boardStore.taakPositie[t])
              this.boardStore.updateTaakPositie(this.boardStore.taakPositie[t]).catch(error=> {
                this.$router.push({
                  name: 'ErrorDisplay',
                  params: { error: error}
                })  
              })
            } else {
              console.log(t)
            }
        }

//        console.log('leuk')
       await this.boardStore.fetchTaken().catch(error=> {
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
    pickupTask (e, columnPos, taakPosIndex, taakDetail, taakPosPIndex) {
      console.log('from_sc_id=' + columnPos + 'TaskPos_Index=' + taakPosIndex + 'Task_id =' + taakDetail.task_id +  ' from plaats in array = ' + taakPosPIndex)

      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from_taskPos_Index', taakPosIndex)
      e.dataTransfer.setData('task_id', taakDetail.task_id)
      e.dataTransfer.setData('from_task_index', taakPosPIndex)
      e.dataTransfer.setData('from_sc_id', columnPos)
      e.dataTransfer.setData('type', 'taak')

 //     console.log(e.dataTransfer)
    },
    moveTaskOrColumn (e, columnPos, taakPos, $taakPosPIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'taak') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }

    },
    moveTask (e, to_sc_id, taakPosIndex, toTaskIndex) {
      const from_taskPos_Index = e.dataTransfer.getData('from_taskPos_Index')
      const move_task_id = e.dataTransfer.getData('task_id')
      const fromTaskIndex = e.dataTransfer.getData('from_task_index')
      const from_sc_id = e.dataTransfer.getData('from_sc_id')
      console.log('taak-id = ' + move_task_id +    
                  ' in kolom_id=' + from_sc_id + 
                  ' en Taakvolgorde Index= ' + from_taskPos_Index + 
                  ' wordt verwijderd van postitie ' + fromTaskIndex + '+1 uit deze kolom')
      console.log('en wordt toegevoed in kolom_id='+ to_sc_id + 
                  ' en taakvolgorde Index= ' + taakPosIndex + 
                  ' op postie ' + toTaskIndex + '+1')
//      console.log(e)

      this.boardStore.moveTask(
        move_task_id,
        from_sc_id,
        from_taskPos_Index,
        fromTaskIndex,
//      naar
        to_sc_id,
        taakPosIndex,
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
