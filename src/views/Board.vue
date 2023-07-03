<template>
    <div class="board">
      <div class="flex flex-row items-start">
          <div class="column" v-for="(column, $columnIdex) of board.board.columns" :key="$columnIdex" > 
            <div class="flex items-center mb-2 font-bold">
              {{ column.name }}
            </div>
            <div class="list-reset">
              <div class="task" v-for="(task, $taskIndex) of column.tasks" :key="$taskIndex">
                <span class="w-full flex-no-shrink font-bold">
                  {{ task.name }}
                </span>
                <p v-if="task.description"  class="w-full flex-no-shrink mt-1 test-sm">
                  {{ task.description }}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList'
 
//const todo = ref('')

const board = useTodoListStore()

//function addItemAndClear(item) {
//  if (item.lenght === 0) {
//    return
//  }
//  store.addTodo(item)
//  todo.value = ''
//}
      
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
  @apply absolute;
  background: rgba(0,0,0,0.5);
}

</style>
