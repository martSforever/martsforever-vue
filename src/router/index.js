import Vue from 'vue'
import Router from 'vue-router'
import AppMain from 'src/components/app-main/app-main.vue'
import AppDeveloper from 'src/components/app-developer/app-developer.vue';
import AppBackground from 'src/components/app-setting/app-background.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/appMain'
    },
    {
      path: '/appMain',
      name: 'AppMain',
      component: AppMain,
      children: [
        {
          path: '/',
          name: 'mainPage',
          redirect: '/developer'
        },
        {
          path: '/developer',
          name: 'AppDeveloper',
          component: AppDeveloper
        },
        {
          path: '/appBackground',
          name: 'AppBackground',
          component: AppBackground
        },

      ]
    },
  ]
})
