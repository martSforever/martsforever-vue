<template>
  <div class="a-select-option" @click="_handleClick">
    <slot>
      <div class="slot-wrapper">
        {{label}}
        <a-icon icon="fa-check" v-show="checked"/>
      </div>
    </slot>
  </div>
</template>

<script>
  import AIcon from "../a-icon/a-icon";
  import {findComponentUpward} from "../../script/utils";

  export default {
    name: "a-select-option",
    components: {AIcon},
    props: {
      label: {
        type: String,
        required: true
      },
      value: null,
    },
    data() {
      return {
        selectComponent: null,
      }
    },
    computed: {
      checked() {
        if (!this.selectComponent) return false
        if (!this.selectComponent.currentValue) return false
        if (!!this.selectComponent.multiple) {
          return this.selectComponent.currentValue.indexOf(this.value) > -1
        } else {
          return this.selectComponent.currentValue === this.value
        }
      },
    },
    methods: {
      _handleClick() {
        if (!!this.selectComponent.multiple) {
          if (!!this.checked) {
            for (let i = 0; i < this.selectComponent.currentValue.length; i++) {
              let val = this.selectComponent.currentValue[i];
              if (val === this.value) {
                this.selectComponent.currentValue.splice(i, 1)
                i--
              }
            }
          } else {
            this.selectComponent.currentValue.push(this.value)
          }
        } else {
          this.selectComponent.currentValue = !!this.checked ? null : this.value
        }
      },
    },
    mounted() {
      this.selectComponent = findComponentUpward(this, 'a-select')
    },
  }
</script>

<style lang="scss">
  .a-select-option {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    &:hover {
      background-color: #a7dcff;
      color: white;
    }
    .slot-wrapper {
      padding: 0 12px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }
  }
</style>
