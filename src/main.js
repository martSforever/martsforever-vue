import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css';                                     //font-awesome
import 'swiper/dist/css/swiper.css';                                            //swiper
// import '//at.alicdn.com/t/font_663981_v4buuc18cv8l4n29.js';                    //iconfont

import Effect from 'src/base/directives/effect/effect.js'   //

import "src/base/style/theme.styl"

Vue.config.productionTip = false;

Vue.directive('effect', Effect);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
