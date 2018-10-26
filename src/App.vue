<template>
  <div id="app">
    <v-Header/>
      <router-view/>
    <v-Foot/>
  </div>
</template>

<script>
import Header from './components/Header'
import Foot from './components/Foot'
export default {
  name: 'App',
  components: {
    'v-Header': Header,
    'v-Foot': Foot
  }
}
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0;
  }
  .ivu-message{
    z-index: 9999;
  }
</style>
