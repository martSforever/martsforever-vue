<template>
  <div class="a-notice-example">
    <a-button-group>
      <a-button @click="info">info</a-button>
    </a-button-group>
  </div>
</template>

<script>
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";

  export default {
    name: "a-notice-example",
    components: {AButton, AButtonGroup},
    methods: {
      info() {
        this.$notice.info()
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
