<template>
  <div class="a-select-example">
    <a-select/>
  </div>
</template>

<script>
  import ASelect from "../../base/components/a-select/a-select";

  export default {
    name: "a-select-example",
    components: {ASelect}
  }
</script>

<style scoped lang="scss">
  .a-select-example {
    display: flex;
    height: 100vh;
    width: 100vw;
    padding: 24px;
  }
</style>
