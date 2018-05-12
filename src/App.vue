<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style scoped lang="stylus">
  #app {
    $fill-window();
    background: -webkit-radial-gradient(circle,$bg-color,$bg-deep-color); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(circle,$bg-color,$bg-deep-color); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(circle,$bg-color,$bg-deep-color); /* Firefox 3.6 - 15 */
    background: radial-gradient(circle,$bg-color,$bg-deep-color);
  }
</style>
