<template>
  <div class="a-tag-example">
    <span>a-tag-example</span>
    <a-tag :strings="tags"/>
  </div>
</template>

<script>
  import ATag from "../../base/components/a-tag/a-tag";

  export default {
    name: "a-tag-example",
    components: {ATag},
    data() {
      return {
        tags: [
          'one',
          'two',
        ]
      }
    },
  }
</script>

<style lang="scss">
  .a-tag-example {
    & > * {
      vertical-align: top;
    }
  }
</style>
