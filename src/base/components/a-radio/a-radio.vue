<template>
  <div class="a-radio" @click="_handleClick" v-effect :style="radioStyles">
    <div class="tag" :style="tagStyles">
      <div key="active-tag" class="active-tag" :class="activeTagClasses">
        <slot name="activeTag">
          <a-icon :icon="activeIcon" :color="iconColor"/>
        </slot>
      </div>
      <div key="inactive-tag" class="inactive-tag" :class="inactiveTagClasses">
        <slot name="inactiveTag">
          <a-icon :icon="inactiveIcon" :color="iconColor"/>
        </slot>
      </div>
    </div>
    <div class="text">
      <div slot="label">{{label}}</div>
    </div>
    <input class="input" :name="name" :value="currentValue"/>
  </div>
</template>

<script>
  import AIcon from "../a-icon/a-icon";
  import {findComponentUpward} from "../../script/utils";

  export default {
    name: "a-radio",
    components: {AIcon},
    data() {
      return {
        currentValue: this.value,
        radioGroup: null,
      }
    },
    watch: {
      value(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      currentValue(val) {
        this.$emit('input', val)
      },
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      activeIcon: {
        type: String,
        default: 'fa-dot-circle-o'
      },
      inactiveIcon: {
        type: String,
        default: 'fa-circle-thin'
      },
      iconColor: {
        type: String,
        default: '#999'
      },
      label: {},
      iconSize: {
        type: String,
        default: '16px'
      },
      name: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      _handleClick(e) {
        this.$emit('click')
        if (!!this.disabled) return
        this.currentValue = !this.currentValue;
        this.$emit('change', this.currentValue)
        !!this.radioGroup && this.radioGroup.updateValue(this)
      },
    },
    computed: {
      activeTagClasses() {
        return {
          show: this.currentValue,
          hide: !this.currentValue
        }
      },
      inactiveTagClasses() {
        return {
          show: !this.currentValue,
          hide: this.currentValue
        }
      },
      radioStyles() {
        return {}
      },
      tagStyles() {
        return {
          marginRight: (this.label != null || !!this.$slots.label) ? '6px' : '0',
          fontSize: `${this.iconSize}`,
          width: `${this.iconSize}`,
          height: `${this.iconSize}`,
        }
      },
    },
    mounted() {
      this.radioGroup = findComponentUpward(this, 'a-radio-group');
    },
  }
</script>

<style lang="scss">
  .a-radio {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    border-radius: 100px;
    padding: 2px 4px;
    .input {
      display: none;
    }
    .tag {
      flex-direction: row;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      position: relative;
      .active-tag {
        position: absolute;
        top: 0;
        left: 0;
      }
      .active-tag, .inactive-tag {
        transition: all 0.4s;
        width: 100%;
        height: 100%;
      }
      .show {
        transform: scale(1, 1);
      }
      .hide {
        transform: scale(0, 0);
      }
    }
  }
</style>
