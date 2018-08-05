<template>
  <div class="test-child">
    this is {{tag}} test-child
    <a-button @click="call">emit parent</a-button>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "test-child",
    components: {AButton},
    props: {
      tag: {
        type: String
      }
    },
    created() {
      this.$on('call-child', (data) => {
        console.log(`${this.tag}-->>${JSON.stringify(data)}`)
      })
    },
    methods: {
      call() {
        this.$emitUp('test-parent', 'call-parent', {message: `child:${this.tag} call parent`})
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
