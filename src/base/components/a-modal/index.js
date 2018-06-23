import Vue from 'vue';
import AModal from './a-modal';
import Button from '../a-button/a-button';
import prefix from 'src/base/script/css-prefix.js';

const prefixCls = prefix.prefixConfirmModal;

AModal.newInstance = properties => {
  const _props = properties || {};
  const instance = new Vue({
    components: {
      AModal
    },
    data() {
      return Object.assign(
        {
          hasFoot: false,
          confirmText: '是',
          cancelText: '否',
        }
        , _props,
        {
          value: false,
          width: '416px',
          height: '',
        })
    },
    render(h) {
      /*return h(AModal, {
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
      });*/

      /*
        onInput={this.__handleOnInput}
        {...{on: {'input': this.__handleOnInput}}}
      */
      return (
        <a-modal
          value={this.value}
          width={this.width}
          height={this.height}
          title={this.title}
          type={this.type}
          showFoot={this.hasFoot}
          onInput={(val) => this.value = val}
        >
          <div style={{padding: '12px'}}>
            {this.message}
          </div>
          <div slot="foot" class={this.footCls}>
            <div class="left" onClick={this.__hadleConfirm}>{this.confirmText}</div>
            <div class="right" onClick={this.__handleCancel}>{this.cancelText}</div>
          </div>
        </a-modal>
      );
    },
    methods: {
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
      __handleOnInput(value) {
        this.value = value;
      },
      __hadleConfirm(e) {
        this.onConfirm && this.onConfirm(e);
        this.value = false;
      },
      __handleCancel(e) {
        this.onCancel && this.onCancel(e);
        this.value = false;
      },
    },
    computed: {
      footCls() {
        return [
          `${prefixCls}-foot`
        ]
      },
    }
  });
  const component = instance.$mount();
  document.body.appendChild(component.$el);

  return {
    show(props) {
      for (let k in props)
        instance[k] = props[k];
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
  modalInstance = modalInstance || AModal.newInstance({});
  return modalInstance;
}

function showModal(props) {
  let instance = getModalInstance();
  props.onRemove = function () {
    modalInstance = null;
  };
  instance.show(props);
}

const types = [
  'info', 'success', 'warning', 'error'
];

for (let i = 0; i < types.length; i++) {
  let type = types[i];
  AModal[type] = function (props) {
    props.type = type;
    props.title = props.title || '提示';
    props.message = props.message || '';
    props.hasFoot = false;
    return showModal(props);
  }
}

AModal.showConfirm = function (props) {
  props.type = props.type || 'warning';
  props.title = props.title || '提示';
  props.hasFoot = true;
  return showModal(props);
}

export default AModal;
