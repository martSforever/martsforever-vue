import Vue from 'vue'
import Router from 'vue-router'
import AppMain from 'src/components/app-main/app-main.vue'
import AppDeveloper from 'src/components/app-developer/app-developer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain,
      children: [
        {
          path: '/',
          name: 'AppDeveloper',
          component: AppDeveloper
        }
      ]
    }
  ]
})
