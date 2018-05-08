<template>
  <div id="app">
    <img src="./assets/logo.png">
    <a-input></a-input>
    <!--<router-view/>-->
  </div>
</template>

<script>
import AInput from "src/base/components/a-input/a-input.vue";
export default {
  name: 'App',
  components: {AInput}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
