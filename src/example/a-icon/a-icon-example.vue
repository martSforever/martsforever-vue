<template>
  <div class="a-icon-example">
    <div class="icon-wrapper">
      111
      <a-icon iconfront="line" size="44" color="blue"/>
      222
      <a-icon fa="fa-address-book" size="44" color="red"/>
      333
    </div>
  </div>
</template>

<script>
  import AIcon from "../../base/components/a-icon/a-icon";

  export default {
    components: {
      AIcon,
    },
    name: "a-icon-example",
    data() {
      return {
        currentIndex: 0
      }
    },
    mounted() {
      console.log(window);
    },
    methods: {
      sayHello() {
        console.log('hello');
      },
    }
  }
</script>

<style scoped lang="stylus">
  .a-icon-example {
    $fill-parent();
  }
</style>
