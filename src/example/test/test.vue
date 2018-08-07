<template>
  <div class="test">
    <a-button-group shape="fillet">
      <a-button @click="toggle">toggle</a-button>
      <a-button @click="initialized = true">initialized</a-button>
    </a-button-group>

    <div class="wrapper">
      <div class="reference" ref="reference">
        this is reference
      </div>
      <div class="reference">
        this is divider
      </div>
    </div>
    <div class="wrapper">
      <div class="reference">
        this is divider
      </div>
    </div>
    <a-popper reference-name="reference" parent-name="test" v-model="isShow" placement="right-start">
      <div class="target">
        <div style="height: 300px;width: 300px;background-color: white">
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
        isShow: false,
        initialized: null
      }
    },
    computed: {},
    methods: {
      toggle() {
        this.isShow = !this.isShow
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
