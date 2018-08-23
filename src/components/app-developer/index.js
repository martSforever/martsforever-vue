export const router = {
  path: '/developer',
  component: resolve => require(['src/components/app-developer/app-developer.vue'], resolve),
  children: [
    {
      path: '/',
      redirect: '/aIconExample'
    },
    {
      path: '/aButtonExample',
      component: resolve => require(['src/example/a-button/a-button-example.vue'], resolve),
      name: 'AButtonExample'
    },
    {
      path: '/aInputExample',
      component: resolve => require(['src/example/a-input/a-input-example'], resolve),
      name: 'AInputExample'
    },
    {
      path: '/aGridExample',
      component: resolve => require(['src/example/a-grid/a-grid-example.vue'], resolve),
      name: 'AGridExample'
    },
    {
      path: '/aScrollbarExample',
      component: resolve => require(['src/example/a-scrollbar/a-scrollbar-example.vue'], resolve),
      name: 'AScrollbarExample'
    },
    {
      path: '/aTextareaExample',
      component: resolve => require(['src/example/a-textarea/a-textarea-exmaple.vue'], resolve),
      name: 'ATextareaExample'
    },
    {
      path: '/aCarouselExample',
      component: resolve => require(['src/example/a-carousel/a-carousel-example.vue'], resolve),
      name: 'ACarouselExample'
    },
    {
      path: '/aIconExample',
      component: resolve => require(['src/example/a-icon/a-icon-example.vue'], resolve),
      name: 'AIconExample'
    },
    {
      path: '/aSwitchExample',
      component: resolve => require(['src/example/a-switch/a-switch-example.vue'], resolve),
      name: 'ASwitchExample'
    },
    {
      path: '/aModal',
      component: resolve => require(['src/example/a-modal/a-modal-example.vue'], resolve),
      name: 'modal'
    },
    {
      path: '/aRadio',
      component: resolve => require(['src/example/a-radio/a-radio-example.vue'], resolve),
      name: 'radio'
    },
    {
      path: '/aSelect',
      component: resolve => require(['src/example/a-select/a-select-example.vue'], resolve),
      name: 'select'
    },
    {
      path: '/aDropDown',
      component: resolve => require(['src/example/a-dropdown/a-dropdown-example.vue'], resolve),
      name: 'dropdown'
    },
    {
      path: '/time-picker',
      component: resolve => require(['src/example/a-time-picker/a-time-picker-example.vue'], resolve),
      name: 'time-picker'
    },
    {
      path: '/date-picker',
      component: resolve => require(['src/example/a-date-picker/a-date-picker-example.vue'], resolve),
      name: 'date-picker'
    },
    {
      path: '/canvas',
      component: resolve => require(['src/example/canvas/canvas-example.vue'], resolve),
      name: 'modal'
    },
    {
      path: '/parent-child',
      component: resolve => require(['src/example/parent-child/parent-child-example.vue'], resolve),
      name: 'modal'
    },
    {
      path: '/test',
      component: resolve => require(['src/example/test/test.vue'], resolve),
      name: 'test'
    },
    {
      path: '/popover',
      component: resolve => require(['src/example/a-popover/a-popover-example.vue'], resolve),
      name: 'popover'
    },
    {
      path: '/collapse',
      component: resolve => require(['src/example/a-collapse/a-collapse-example.vue'], resolve),
      name: 'collapse'
    },
  ]
};
export default {
  router
}
