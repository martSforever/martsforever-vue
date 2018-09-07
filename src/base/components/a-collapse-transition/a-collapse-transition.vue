<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"

    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    name: "a-collapse-transition",
    methods: {
      beforeEnter(el) {
        // console.log('beforeEnter')
        el.addClass('collapse-transition')
        if (!el.dataset) el.dataset = {}

        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom

        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      },

      enter(el) {
        // console.log('enter')
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px'
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        } else {
          el.style.height = ''
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        }

        el.style.overflow = 'hidden'
      },

      afterEnter(el) {
        // console.log('afterEnter')
        // for safari: remove class then reset height is necessary
        el.removeClass('collapse-transition')
        el.style.height = ''
        el.style.overflow = el.dataset.oldOverflow
      },

      beforeLeave(el) {
        // console.log('beforeLeave')
        if (!el.dataset) el.dataset = {}
        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom
        el.dataset.oldOverflow = el.style.overflow

        el.style.height = el.scrollHeight + 'px'
        el.style.overflow = 'hidden'
      },

      leave(el) {
        // console.log('leave')
        if (el.scrollHeight !== 0) {
          // for safari: add class after set height, or it will jump to zero height suddenly, weired
          el.addClass('collapse-transition')
          el.style.height = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },

      afterLeave(el) {
        // console.log('afterLeave')
        el.removeClass('collapse-transition')
        el.style.height = ''
        el.style.overflow = el.dataset.oldOverflow
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom

        this.$emit('afterLeave')
      }
    }
  }
</script>
