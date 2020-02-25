<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  created () {
    const valid = localStorage.getItem('token')
    if (valid) {
      this.$store.commit('SET_LOGIN', true)
      this.$store.dispatch('loginToken')
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
