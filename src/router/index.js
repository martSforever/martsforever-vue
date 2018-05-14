import Vue from 'vue'
import Router from 'vue-router'
import AppMain from 'src/components/app-main/app-main.vue'
import AppDeveloper from 'src/components/app-developer/app-developer.vue';
import AppBackground from 'src/components/app-setting/app-background.vue';
import AppSystem from 'src/components/app-setting/app-system.vue';
import AppUser from 'src/components/app-user/app-user.vue';
import AppExample from 'src/components/app-example/app-example.vue';

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
