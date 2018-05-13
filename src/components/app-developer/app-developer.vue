<template xmlns:v-effect="http://www.w3.org/1999/xhtml">
  <div class="app-developer">
    this is developer page
  </div>
</template>

<script>
  import AIconfront from "../../base/components/a-iconfront/a-iconfront";

  export default {
    components: {AIconfront},
    name: "app-developer",
    data() {
      return {
        currentIndex: 0
      }
    },
    mounted() {
      console.log(this.$router);
    },
    methods: {
      sayHello() {
        console.log('hello');
      },
    }
  }
</script>

<style scoped lang="stylus">
  .wahah {
    height 300px
    width 300px
    display inline-block
    background-color blueviolet
    cursor auto
  }
</style>
