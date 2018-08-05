<template>
  <div class="a-popper-example">
    a-popper-example
    <div>
      <a-popover>
        <div slot="content" class="content">
          this is content
        </div>
        <div slot="popper" class="popper">
          this is popper
        </div>
      </a-popover>
    </div>
  </div>
</template>

<script>

  import Popper from 'popper.js'
  import APopover from "../../base/components/a-popover/a-popover";

  export default {
    name: "a-popper-example",
    components: {APopover},
    data() {
      return {
        popper: null
      }
    },
    mounted() {

    },
  }
</script>

<style scoped lang="scss">
  .content {
    background-color: blueviolet;
    color: white;
    display: inline-block;
    height: 100px;
    width: 200px;
  }

  .popper {
    background-color: #00ff80;
    color: white;
    display: inline-block;
    height: 300px;
    width: 100px;
  }
</style>
