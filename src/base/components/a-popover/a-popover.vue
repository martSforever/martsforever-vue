<template>
  <div class="a-popover">
    <div ref="popoverContent" @click="currentValue = !currentValue">
      <slot name="content"></slot>
    </div>
    <div style="background-color: #0ac2ff;color: rebeccapurple">
      this is divider
    </div>
    <a-collapse-transition>
      <a-popper parent-name="a-popover" reference-name="popoverContent" v-show="currentValue" ref="popper">
        <slot name="popper"></slot>
      </a-popper>
    </a-collapse-transition>
  </div>
</template>

<script>
  import APopper from "../a-popper/a-popper";
  import ACollapseTransition from "../a-collapse-transition/a-collapse-transition";

  export default {
    name: "a-popover",
    components: {ACollapseTransition, APopper},
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    mounted() {

    },
  }
</script>

<style scoped lang="scss">

</style>
