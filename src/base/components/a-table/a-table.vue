<template>
  <div class="a-table">
    <a-table-head :fit-width="fitWidth">
      <slot></slot>
    </a-table-head>
  </div>
</template>

<script>
  import ATableHead from "./a-table-head";

  export default {
    name: "a-table",
    components: {ATableHead},
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

  }

</style>
