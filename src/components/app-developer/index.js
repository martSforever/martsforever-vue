export const router = {
  path: '/developer',
  component: resolve => require(['src/components/app-developer/app-developer.vue'], resolve),
  children: [
    {
      path: '/',
      redirect:'/aIconExample'
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
  ]
};
export default {
  router
}
