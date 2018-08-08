import {removePx} from "../../script/utils";

const initialized = 'move_initialized'
const startX = 'move_startx'
const startY = 'move_starty'

class Mouse {
  constructor() {
    this.initialized = false
    this.startX = 0
    this.startY = 0
  }
}

export default {
  inserted(el, binding, vnode) {

    let mouse = new Mouse()

    el.addEventListener('mousedown', (e) => {
      mouse.initialized = true
      mouse.startX = e.clientX
      mouse.startY = e.clientY
      mouse.startLeft = (!!el.style.left ? removePx(el.style.left) : 0)
      mouse.startTop = (!!el.style.top ? removePx(el.style.top) : 0)
    })
    document.addEventListener('mousemove', (e) => {
      if (!mouse.initialized) return
      let deltaX = e.clientX - mouse.startX
      let deltaY = e.clientY - mouse.startY
      el.style.left = (deltaX + mouse.startLeft) + 'px'
      el.style.top = (deltaY + mouse.startTop) + 'px'
      if (binding.expression) {
        binding.value(e);
      }
    })
    document.addEventListener('mouseup', (e) => {
      mouse.initialized = false
    })
  },
}
