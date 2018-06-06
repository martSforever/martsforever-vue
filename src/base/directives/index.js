import Vue from 'vue'
import Effect from "./effect/effect";
import ClickoutSide from "./clickoutside/clickoutside";
import DomPortal from 'vue-dom-portal'

Vue.directive('effect', Effect);
Vue.directive('ClickoutSide', ClickoutSide);
Vue.use(DomPortal);
