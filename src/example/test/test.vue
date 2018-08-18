<template>
  <div class="test">
    <a-button-group shape="fillet">
      <a-button @click="toggle">toggle</a-button>
    </a-button-group>

    <a-button-group shape="fillet">
      <a-button @click="direction = 'top'">top</a-button>
      <a-button @click="direction = 'bottom'">bottom</a-button>
      <a-button @click="direction = 'left'">left</a-button>
      <a-button @click="direction = 'right'">right</a-button>
    </a-button-group>

    <a-button-group shape="fillet">
      <a-button @click="align = 'start'">start</a-button>
      <a-button @click="align = 'center'">center</a-button>
      <a-button @click="align = 'end'">end</a-button>
    </a-button-group>

    <div class="wrapper">
      <div class="reference" ref="popperReference" v-move="onMove">
        this is reference
      </div>
    </div>
    <div>
      {{direction}}--{{align}}
    </div>
    <a-popover reference-name="popperReference"
               parent-name="test"
               v-model="isShow"
               ref="aPopper"
               :hide-on-click-outside="false"
               :direction.sync="direction"
               :size-equal="false"
               :align.sync="align">
      <div class="popper-content">
        this is popper content
      </div>
    </a-popover>
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

        direction: 'top',
        align: 'start',
      }
    },
    computed: {},
    methods: {
      toggle() {
        this.isShow = !this.isShow
      },
      onMove(e) {
        this.$refs.aPopper.update()
      },
    },
    created() {
      this.$on('call-parent', (data) => {
        console.log('parent-', data)
      })
    },
    mounted() {
    },
  }
</script>

<style lang="scss">

  .test {
    height: 100vh;
    overflow: auto;
  }

  .box {
    width: 100px;
    height: 100px;
    background-color: white;
    color: brown;
  }

  .popper-content {
    box-sizing: border-box;
    height: 250px;
    width: 100%;
    display: inline-block;
    background-color: white;
    color: black;
  }

  .wrapper {
    margin-left: 600px;
    margin-top: 300px;
    height: 2000px;
  }

  .reference {
    display: inline-block;
    width: 300px;
    height: 200px;
    color: white;
    background: brown;

    position: relative;
  }

</style>
