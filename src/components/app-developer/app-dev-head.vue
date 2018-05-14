<template>
  <div class="app-dev-head">
    <ul>
      <li v-for="item in menuList">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "app-dev-head",
    data() {
      return {
        menuList: [
          {name: 'a-icon', url: 'aIconExample'},
          {name: 'a-input', url: 'aIconExample'},
        ]
      }
    }
  }
</script>

<style scoped lang="stylus">

  .app-dev-head {

  }

</style>
