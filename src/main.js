import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css';         //font-awesome
import 'swiper/dist/css/swiper.css';                //swiper
import 'src/libs/iconfront/iconfont.js';            //iconfront
import "src/base/style/theme.styl"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
