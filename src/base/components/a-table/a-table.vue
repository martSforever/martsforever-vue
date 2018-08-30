<template>
  <div class="a-table">
    <a-table-head :fit-width="fitWidth">
      <slot></slot>
    </a-table-head>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";
  import AScrollbar from "../a-scrollbar/a-scrollbar";

  export default {
    name: "a-table",
    components: {AScrollbar, ATableHead},
    props: {
      fitWidth: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss">
  .a-table {
    width: 100%;
    overflow: auto;
  }
</style>
