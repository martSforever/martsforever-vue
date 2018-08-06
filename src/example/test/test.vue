<template>
  <div class="test">
    <a-button-group shape="fillet">
      <a-button @click="toggle">toggle</a-button>
    </a-button-group>

    <div class="wrapper">
      <div class="reference" ref="reference">
        this is reference
      </div>
    </div>

    <div ref="popper">
      <a-collapse-transition>
        <div v-if="isShow"
             class="target">
          <div style="height: 300px;width: 300px;background-color: white">
            this is popper content
          </div>
        </div>
      </a-collapse-transition>
    </div>

  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import ACollapseTransition from "../../base/components/a-collapse-transition/a-collapse-transition";
  import TestChild from "./test-child";
  import TestParent from "./test-parent";

  import Popper from 'popper.js'

  export default {
    components: {TestParent, TestChild, ACollapseTransition, AButtonGroup, AButton},
    name: "test",
    data() {
      return {
        isShow: true,
        popper: null
      }
    },
    computed: {},
    methods: {
      toggle() {
        this.isShow = !this.isShow
        this.$nextTick(() => {
          this.popper.update()
        })
      },
    },
    created() {
      this.$on('call-parent', (data) => {
        console.log('parent-', data)
      })
    },
    mounted() {
      this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
        placement: 'bottom-start'
      })
    },
  }
</script>

<style lang="scss">
  .box {
    width: 100px;
    height: 100px;
    background-color: white;
    color: brown;
  }

  .target {
    box-sizing: border-box;
    height: 300px;
    width: 300px;
    display: inline-block;
  }

  .wrapper {
    margin-left: 300px;
  }

  .reference {
    display: inline-block;
    width: 200px;
    height: 200px;
    color: white;
    background: brown;
  }

</style>
