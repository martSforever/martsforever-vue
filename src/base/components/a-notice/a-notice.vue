<template>
  <div class="a-notice">
    {{message}}
  </div>
</template>

<script>
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-notice",
    props: {
      message: {
        type: String,
      },
      type: {
        type: String,
        default: 'info',
        validator(val) {
          return oneOf(val, ['info', 'success', 'warn', 'error'])
        },
      },
    },
  }
</script>

<style lang="scss">
  .a-notice {
    background-color: white;
  }
</style>
