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
    <a-popper reference-name="popperReference"
              parent-name="test"
              v-model="isShow"
              ref="aPopper"
              :direction.sync="direction"
              :align.sync="align">
      <div class="target">
        <div class="popper-content">
          this is popper content
        </div>
      </div>
    </a-popper>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import ACollapseTransition from "../../base/components/a-collapse-transition/a-collapse-transition";
  import TestChild from "./test-child";
  import TestParent from "./test-parent";

  import Popper from 'popper.js'
  import APopper from "../../base/components/a-popper/a-popper";

  export default {
    components: {APopper, TestParent, TestChild, ACollapseTransition, AButtonGroup, AButton},
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
    width: 250px;
    display: inline-block;
    background-color: white;
    color: black;
  }

  .wrapper {
    margin-left: 600px;
    margin-top: 300px;
  }

  .reference {
    display: inline-block;
    width: 200px;
    height: 200px;
    color: white;
    background: brown;

    position: relative;
  }

</style>
