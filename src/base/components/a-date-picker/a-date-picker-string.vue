<template>
  <a-date-picker :value="currentDate" @input="handleInput"/>
</template>

<script>

  import ADatePicker from './a-date-picker'

  export default {
    name: "a-date-picker-string",
    components: {ADatePicker},
    props: {
      value: {
        type: String,
        default: () => new Date().yyyyMMdd()
      },
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
    },
    watch: {
      value(val) {
        if (this.currentValue !== val) this.currentValue = val
      },
      currentValue(val) {
        this.$emit('input', val)
      },
    },
    data() {
      return {
        currentValue: this.value,
      }
    },
    computed: {
      currentDate() {
        return new Date(!!this.currentValue ? this.currentValue.replace(/-/g, '/') : null)
      },
    },
    methods: {
      handleInput(val) {
        this.currentValue = val.format(this.format)
      },
    },
  }
</script>

<style lang="scss">

</style>
