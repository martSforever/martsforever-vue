import Vue from 'vue'
import Router from 'vue-router'
import AppMain from 'src/components/app-main/app-main.vue'
import AppBackground from 'src/components/app-setting/app-background.vue';
import AppSystem from 'src/components/app-setting/app-system.vue';
import AppUser from 'src/components/app-user/app-user.vue';
import AppExample from 'src/components/app-example/app-example.vue';

import AppDeveloper from 'src/components/app-developer'

Vue.use(Router);

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
        AppDeveloper.router,
        {
          path: '/appBackground',
          name: 'AppBackground',
          component: AppBackground
        },
        {
          path: '/appSystem',
          name: 'AppSystem',
          component: AppSystem
        },
        {
          path: '/appUser',
          name: 'AppUser',
          component: AppUser
        },
        {
          path: '/appExample',
          name: 'AppExample',
          component: AppExample
        }
      ]
    },
  ]
})
