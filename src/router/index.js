import Vue from 'vue'
import Router from 'vue-router'
import AppMain from 'src/components/app-main/app-main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain
    }
  ]
})
