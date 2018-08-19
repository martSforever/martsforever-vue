<template>
  <div class="a-select">
    <div ref="input" class="a-select-input-wrapper" v-move="handleMove">
      <a-input @click="_handleClickInput"/>
    </div>
    <a-popover
      reference-name="input"
      parent-name="a-select"
      :size-equal="true"
      ref="popover"
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
    methods: {
      _handleClickInput(e) {
        this.currentShow = true
      },
      handleMove() {
        this.$refs.popover.update()
      },
    }
  }
</script>

<style lang="scss">
  .a-select {
    .a-select-input-wrapper {
      display: inline-block;
    }
    .a-select-options {
      width: 100%;
      background-color: white;
      padding: 12px;
    }
  }

</style>
