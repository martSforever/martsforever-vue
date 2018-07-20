<template>
  <div class="a-radio-group" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import {findComponentsDownward, oneOf} from "../../script/utils";

  export default {
    name: "a-radio-group",
    props: {
      value: null,
      isMultiSelected: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'row',
      }
    },
    watch: {
      value(val) {
        if (val !== this.currentValue) {
          this.currentValue = val
          this.updateRadio(val)
        }
      },
      currentValue(val) {
        this.$emit('input', val)
      },
    },
    data() {
      return {
        currentValue: this.value,
        currentValues: []
      }
    },
    methods: {
      updateValue(radio) {
        let radios = findComponentsDownward(this, 'a-radio');
        let checkRadios = []
        radios.forEach((item) => (item.currentValue) && (checkRadios.push(item)))
        if (!this.isMultiSelected) {
          if (!!radio) {
            checkRadios.forEach((item) => item.currentValue = false)
            radio.currentValue = true
            this.currentValue = radio.name
          } else {
            checkRadios.forEach((item) => item.currentValue = false)
            let lastRadio = checkRadios.pop();
            if (!!lastRadio) {
              this.currentValue = lastRadio.name
              lastRadio.currentValue = true
            } else {
              this.currentValue = null
            }
          }
        } else {
          this.currentValue = checkRadios.reduce((ret, item) => {
            ret.push(item.name)
            return ret
          }, [])
        }
      },
      updateRadio(val) {
        let radios = findComponentsDownward(this, 'a-radio');
        if (val instanceof Array) {
          /*多选*/
          radios.forEach((radio) => radio.currentValue = oneOf(radio.name, val))
        } else {
          /*单选*/
          radios.forEach((radio) => radio.currentValue = radio.name === val)
        }
      },
    },
    mounted() {
      this.updateValue()
    },
    computed: {
      styles() {
        return {
          flexDirection: this.direction
        }
      },
    }
  }
</script>

<style lang="scss">
  .a-radio-group {
    display: inline-flex;
  }
</style>
