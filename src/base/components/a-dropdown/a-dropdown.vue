<template>
  <div class="a-dropdown">
    <div ref="reference">
      <slot></slot>
    </div>
    <a-popover
      parent-name="a-dropdown"
      reference-name="reference"
    >
      <slot name="dropdown"></slot>
    </a-popover>
  </div>
</template>

<script>
  import APopover from "../a-popover/a-popover";
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-dropdown",
    components: {APopover},
    props: {
      triger: {
        type: String,
        default: 'hover',
        validator(val) {
          return oneOf(val, ['hover', 'click', '', ''])
        },
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
