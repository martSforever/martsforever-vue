<template>
  <a-radio :value="currentValue"
           :active-icon="activeIcon"
           :inactive-icon="inactiveIcon"
           @click="_handleClick"/>
</template>

<script>
  export default {
    name: "a-table-column-select-item",
    props: {
      row: {},
      multiSelect: {
        type: Boolean,
      },
      activeIcon: {},
      inactiveIcon: {}
    },
    data() {
      return {
        currentValue: false,
      }
    },
    watch: {
      currentValue(val) {
        this.$emit(!!val ? 'join' : 'quit', this)
      },
    },
    methods: {
      _handleClick(e) {
        if (!this.multiSelect && !this.currentValue) {
          this.$emit('change-all', false)
        }
        this.$nextTick(() => this.currentValue = !this.currentValue)
      },
    },
    mounted() {
      this.$emit('mounted', this)
    },
    destroyed() {
      this.$emit('destroyed', this)
    },
  }
</script>
