<template>
  <div class="test">
    <a-button-group shape="round">
      <a-button @click="toggle">toggle</a-button>

    </a-button-group>

    <div class="box"></div>
    <div class="box target" ref="target">
      this is box
    </div>

    <a-collapse-transition>
      <div class="box target" v-if="isShow" style="margin: 10px">
      </div>
    </a-collapse-transition>
    <div class="box"></div>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import ACollapseTransition from "../../base/components/a-collapse-transition/a-collapse-transition";
  import TestChild from "./test-child";
  import TestParent from "./test-parent";

  export default {
    components: {TestParent, TestChild, ACollapseTransition, AButtonGroup, AButton},
    name: "test",
    data() {
      return {
        isShow: true,
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
    padding: 10px;
    margin: 10px;
  }

</style>
