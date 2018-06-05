import Vue from 'vue'
import Router from 'vue-router'
import AppDeveloper from 'src/components/app-developer'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['src/components/app-main/app-main.vue'],resolve),
      children: [
        {
          path: '/',
          redirect: '/developer'
        },
        AppDeveloper.router,
        {
          path: '/appBackground',
          name: 'AppBackground',
          component: resolve => require(['src/components/app-setting/app-background.vue'],resolve)
        },
        {
          path: '/appSystem',
          name: 'AppSystem',
          component: resolve => require(['src/components/app-setting/app-system.vue'],resolve)
        },
        {
          path: '/appUser',
          name: 'AppUser',
          component: resolve => require(['src/components/app-user/app-user.vue'],resolve)
        },
        {
          path: '/appExample',
          name: 'AppExample',
          component: resolve => require(['src/components/app-example/app-example.vue'],resolve)
        }
      ]
    },
  ]
})
