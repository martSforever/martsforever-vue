import Vue from 'vue';
import Modal from './a-modal';
import Button from '../a-button/a-button';
import prefix from 'src/base/script/css-prefix.js';

const prefixCls = prefix.prefixConfirmModal;

Modal.newInstance = properties => {
  const _props = properties || {};
  const instance = new Vue({
    data() {
      return Object.assign({},_props,{
        value: false,
        width: '416px',
        height: '',
        title: '提示',
        type: 'info',
      })
    },
    render(h) {
      return h(Modal, {
        props: Object.assign({}, _props, {
          width: this.width,
          height: this.height,
          title: this.title,
          type: this.type,
          value: this.value
        }),
        on: {
          input: (value) => {
            this.value = value;
          },
        }
      });
    },
    method: {
      remove() {
        setTimeout(() => {
          this.destroy();
        }, 300)
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      onConfirm() {

      },
      onCancel() {

      },
      onRemove() {

      },
    }
  });
  const component = instance.$mount();
  document.body.appendChild(component.$el);

  return {
    show(props) {
      instance.title = props.title;
      instance.type = props.type;
      instance.value = true;
    },
    remove() {
      instance.value = false;
      instance.remove();
    },
  }
};

let modalInstance;

function getModalInstance() {
  modalInstance = modalInstance || Modal.newInstance({});
  return modalInstance;
}

function showModal(props) {
  let instance = getModalInstance();
  props.onRemove = function () {
    modalInstance = null;
  };
  instance.show(props);
}

Modal.info = function (props = {}) {
  props.type = 'info';
  return showModal(props);
};

export default Modal;
