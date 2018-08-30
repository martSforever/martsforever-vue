export default {
  name: 'a-render-node',
  props: {
    renderFunc: {
      type: Function,
      required: true
    },
  },
  render(h) {
    return (
      <div>
        {this.renderFunc.call(this.$parent._renderProxy, h)}
      </div>
    )
  },
}
