import Vue from 'vue'
import Effect from "./effect/effect";
import ClickoutSide from "./clickoutside/clickoutside";
import DomPortal from 'vue-dom-portal'
import Move from './move/move'
import WatchDom from './watch-dom/watch-dom'

Vue.directive('effect', Effect);
Vue.directive('ClickoutSide', ClickoutSide);
Vue.directive('move', Move)
Vue.directive('WatchDom', WatchDom)
Vue.use(DomPortal);
