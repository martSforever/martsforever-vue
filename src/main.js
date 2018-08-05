import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css';                                     //font-awesome
import 'swiper/dist/css/swiper.css';                                            //swiper
import 'src/base/directives'                                                    //自定义指令
import 'src/base/script/prototype'                                              //给各种原型添加属性方法
import spreadPlugin from 'src/base/vue-plugin/spread'                           //自定义向上广播，向下广播功能

import 'src/base/style/index.scss';
import 'src/index.js';

Vue.config.productionTip = false;
Vue.use(spreadPlugin)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
