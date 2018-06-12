import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';                                     //font-awesome
import 'swiper/dist/css/swiper.css';                                            //swiper
import 'src/base/directives'

import 'src/base/style/index.scss';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
