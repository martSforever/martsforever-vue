<template>
  <div class="a-radio" @click="_handleClick" v-effect :style="radioStyles">
    <div class="tag" :style="tagStyles">
      <div key="active-tag" class="active-tag" :class="activeTagClasses">
        <slot name="activeTag">
          <a-icon :icon="activeIcon" :color="iconColor"/>
        </slot>
      </div>
      <div key="inactive-tag" class="inactive-tag">
        <slot name="inactiveTag">
          <a-icon :icon="inactiveIcon" :color="iconColor"/>
        </slot>
      </div>
    </div>
    <div class="text">
      <div slot="label">{{label}}</div>
    </div>
  </div>
</template>

<script>
  import AIcon from "../a-icon/a-icon";

  export default {
    name: "a-radio",
    components: {AIcon},
    data() {
      return {
        currentValue: this.value
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
        default: 'fa-circle'
      },
      inactiveIcon: {
        type: String,
        default: 'fa-circle-thin'
      },
      iconColor: {
        type: String,
        default: '#e03636'
      },
      label: {
        type: String,
      },
      iconSize: {
        type: String,
        default: '16px'
      }
    },
    methods: {
      _handleClick(e) {
        this.currentValue = !this.currentValue;
      },
    },
    computed: {
      activeTagClasses() {
        return {
          show: this.currentValue,
          hide: !this.currentValue
        }
      },
      radioStyles() {
        return {}
      },
      tagStyles() {
        return {
          marginRight: (!!this.label || !!this.$slots.label) ? '6px' : '0',
          fontSize: `${this.iconSize}`,
          width: `${this.iconSize}`,
          height: `${this.iconSize}`,
        }
      },
    }
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
