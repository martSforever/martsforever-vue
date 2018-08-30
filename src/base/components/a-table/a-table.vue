<template>
  <div class="a-table">
    <a-table-head>
      <slot></slot>
    </a-table-head>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";

  export default {
    name: "a-table",
    components: {ATableHead},
    mounted() {
    },
  }
</script>

<style lang="scss">
  .a-table {

  }

</style>
