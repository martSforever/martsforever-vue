<template>
  <div class="a-select">
    <div ref="input">
      <a-input/>
    </div>
    <a-popover
      reference-name="input"
      parent-name="a-select"
      v-model="currentShow">
      <div class="a-select-options">
        this select options
      </div>
    </a-popover>
  </div>
</template>

<script>
  import AInput from "../a-input/a-input";
  import APopover from "../a-popover/a-popover";

  export default {
    name: "a-select",
    components: {APopover, AInput},
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentShow: this.show
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
