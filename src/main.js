import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css';                                     //font-awesome
import 'swiper/dist/css/swiper.css';                                            //swiper
import 'src/base/directives'

import 'src/base/style/index.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
