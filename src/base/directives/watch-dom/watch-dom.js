import {watchDomChildList} from "../../script/watch";

export default {
  bind(el, binding, vnode) {
    el._handleDomChange_ = (mutations) => {
      if (binding.expression) {
        binding.value(mutations);
      }
    }
    el._observer_ = watchDomChildList(el, el._handleDomChange_)
  },
  unbind(el, binding) {
    el._observer_.disconnect()
  },
}
