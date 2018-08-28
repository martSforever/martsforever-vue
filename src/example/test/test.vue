<template>
  <div class="test">
    <test-parent :render-func="myRenderFunc">
      <template slot-scope="{message}">
        <div class="message">--{{message}}--</div>
      </template>
    </test-parent>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import ACollapseTransition from "../../base/components/a-collapse-transition/a-collapse-transition";
  import TestChild from "./test-child";
  import TestParent from "./test-parent";
  import APopover from "../../base/components/a-popover/a-popover";

  export default {
    components: {APopover, TestParent, TestChild, ACollapseTransition, AButtonGroup, AButton},
    name: "test",
    data() {
      return {
        isShow: true,
        name: 'ambzer'
      }
    },
    computed: {},
    methods: {
      myRenderFunc(h, {message}) {
        return (
          <div class="message">--{message}--</div>
        )
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss">

  .test {
    height: 100vh;
    overflow: auto;

    .message {
      padding: 3px 12px;
      background-color: $text-color-primary;
      color: white;
      display: inline-block;
      border-radius: $border-fillet;
    }
  }

</style>
