/*
*   power by    weishengjian
*   datetime    2018/8/5 10:41
*/

/*

1、当前实例可以通过$emit触发事件：
this.$emit(eventName,yourData)

2、父组件（调用当前实例的组件）可以在template中调用当前实例的时候，监听实例触发的事件：
  //父组件
  <template>
    <ratingselect @select-type="onSelectType"></ratingselect>
  </template>
  <script>
    data () {
     return {
      selectType: 0,
    },
    methods: {
     onSelectType (type) {
      this.selectType = type
     }
    }
  </script>
3、实例自己可以通过$on方法监听自己触发的事件：

let eventHandler = (data)=>{}
this.$on(eventName,eventHandler)

4、父组件可以通过获取子组件，然后调用子组件的$emit方法，触发子组件的监听事件的eventHandler
this.$refs.child.$emit(eventName,data)

5、这个spread用处在于根据组件名（componentName）、事件名（eventName），向上（$emitUp）或者向下（$emitDown）
触发父组件或者子组件的事件监听eventHandler
*/

import {findComponentsDownward, findComponentsUpward} from "../script/utils";

/*
*  向上触发父组件事件eventHandler
*  componentName:   组件名
*  eventName:       事件名
*  data:            事件数据
*/
let emitUp = function (componentName, eventName, data) {
  let upComponents = findComponentsUpward(this, componentName)
  upComponents.forEach((item) => item.$emit(eventName, data))
}

/*
*  向下触发子组件事件eventHandler
*  componentName:   组件名
*  eventName:       事件名
*  data:            事件数据
*/
let emitDown = function (componentName, eventName, data) {
  let downComponents = findComponentsDownward(this, componentName)
  downComponents.forEach((item) => item.$emit(eventName, data))
}


export default {
  install(vue, options) {
    vue.prototype.$emitUp = function (componentName, eventName, data) {
      emitUp.call(this, componentName, eventName, data)
    }
    vue.prototype.$emitDown = function (componentName, eventName, data) {
      emitDown.call(this, componentName, eventName, data)
    }
  },
}
