<template>
  <div class="test-parent">
    <div>test parent content</div>
    ###
    <slot :message="message"></slot>
    ###
    !!
    <test-node/>
    !!
  </div>
</template>

<script>
  export default {
    name: "test-parent",
    components: {
      TestNode: {
        render(h) {
          console.log(this.$parent)                           //这个this.$parent其实就是test-parent自己
          // return h('div', this.$parent.$scopedSlots.default({message: 'rose'}))
          return (
            <div>
              {this.$parent.$scopedSlots.default({message: 'rose'})}
            </div>
          )
        },
      }
    },
    props: {
      renderFunc: {
        type: Function,
      }
    },
    data() {
      return {
        message: 'bilibili'
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="scss">

</style>
