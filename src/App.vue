<script>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/UserStore'
import { useBoardStore } from './stores/BoardStore'

export default {
  setup() {
    const userStore = useUserStore()
    const boardStore = useBoardStore()

    return {
      userStore,
      boardStore
    }
  }

}
</script>

<template>
  
  <div id="app">
    <p>Logged in as {{ userStore.user }} with name: {{ boardStore.naam }}</p>
    <router-view/>
  </div>
</template>

<style>
body, html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.container {
  @apply mx-auto;
}

</style>
