<template>
  <transition-group :name="transitionName" tag="div" class="a-move-container">
    <slot></slot>
  </transition-group>
</template>

<script>
  import {oneOf} from "../../script/utils";

  export default {
    name: "a-move-container",
    props: {
      direction: {
        type: String,
        default: 'bottom-right',
        desc: 'item入场出场动画的方向',
        validator(val) {
          return oneOf(val, [
            'left',
            'right',
            'top',
            'bottom',
            'left-top',
            'top-left',
            'right-top',
            'top-right',
            'left-bottom',
            'bottom-left',
            'right-bottom',
            'bottom-right',
          ])
        },
      }
    },
    computed: {
      transitionName() {
        return `a-move-container-${this.direction}`
      },
    }
  }
</script>

<style lang="scss">

  .a-move-container {
    display: inline-block;
  }

  $move-directions: (
    top:(x:0, y:-30%),
    left:(x:-80%, y:0),
    right:(x:80%, y:0),
    bottom:(x:0, y:30%),
    left-top:(x:-80%, y:-30%),
    top-left:(x:-80%, y:-30%),
    right-top:(x:80%, y:-30%),
    top-right:(x:80%, y:-30%),
    left-bottom:(x:-80%, y:30%),
    bottom-left:(x:-80%, y:30%),
    right-bottom:(x:80%, y:30%),
    bottom-right:(x:80%, y:30%),
  );

  @each $key, $value in $move-directions {
    .a-move-container-#{$key}-enter, .a-move-container-#{$key}-leave-to {
      opacity: 0;
      transform: translateX(map_get($value, x)) translateY(map_get($value, y));
    }
    .a-move-container-#{$key}-leave-active {
      position: absolute;
    }
  }

  .a-move-container-enter, .a-move-container-leave-to {
    opacity: 0;
    transform: translateX(80%) translateY(30%);
  }

  .a-move-container-leave-active {
    position: absolute;
  }

</style>
