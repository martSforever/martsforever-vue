import 'src/libs/waves/waves.min.css';
import 'src/libs/waves/waves.min.js';
import {oneOf} from "../../script/utils";

export default {
  inserted(el, binding, vnode) {
    let classes = binding.arg;
    let allClass = ['light', 'deep'];
    if (!(oneOf(classes, allClass))) {
      classes = allClass[0];
    }
    Waves.attach(el, `waves-${classes}`);
    Waves.init();
  },
}
