<template>
  <div class="a-select">
    <div ref="input" class="a-select-input-wrapper">
      <a-input @click="_handleClickInput" :value="labels"/>
    </div>
    <a-popover
      reference-name="input"
      parent-name="a-select"
      :size-equal="true"
      ref="popover"
      v-model="currentShow">
      <div class="a-select-options">
        <slot></slot>
      </div>
    </a-popover>
  </div>
</template>

<script>
  import AInput from "../a-input/a-input";
  import APopover from "../a-popover/a-popover";
  import {findComponentsDownward} from "../../script/utils";

  export default {
    name: "a-select",
    components: {APopover, AInput},
    props: {
      value: null,
      show: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      show(val) {
        if (this.currentShow !== val) {
          this.currentShow = val
        }
      },
      currentShow(val) {
        this.$emit('update:show', val)
      },

      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      currentValue(val) {
        this.$emit('input', val)
        this._updateLabels()
      },

    },
    data() {
      return {
        currentShow: this.show,
        currentValue: this.value || (!!this.multiple ? [] : null),
        labels: '',
      }
    },
    methods: {
      _handleClickInput(e) {
        this.currentShow = true
      },
      _updateLabels() {
        let ret = []
        let optionComponents = findComponentsDownward(this, 'a-select-option')
        for (let i = 0; i < optionComponents.length; i++) {
          let optionComponent = optionComponents[i];
          if (!!this.multiple) {
            if (this.currentValue.indexOf(optionComponent.value) > -1) {
              ret.push(optionComponent.label)
            }
          } else {
            if (this.currentValue === optionComponent.value) {
              ret.push(optionComponent.label)
            }
          }
        }
        this.labels = ret.join(',')
      },
    },
  }
</script>

<style lang="scss">
  .a-select {
    .a-select-input-wrapper {
      display: inline-block;
    }
    .a-select-options {
      width: 100%;
      background-color: white;
      padding: 12px 0;
    }
  }

</style>
