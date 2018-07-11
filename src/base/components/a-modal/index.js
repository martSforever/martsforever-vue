import Vue from 'vue';
import AModal from './a-modal';
import Button from '../a-button/a-button';
import AInput from '../a-input/a-input';
import prefix from 'src/base/script/css-prefix.js';

const prefixCls = prefix.prefixConfirmModal;

AModal.newInstance = properties => {
  const _props = properties || {};
  const instance = new Vue({
    components: {
      AModal,
      AInput
    },
    data() {
      return Object.assign(
        {
          hasFoot: false,
          confirmText: '是',
          cancelText: '否',
          input: '值',
          isInput: false
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
          <div style={{
            padding: '12px',
            minHeight: '78px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}>
            <span v-show={!this.isInput}>{this.message}</span>
            <a-input
              v-show={this.isInput}
              value={this.input}
              onInput={this.__handleOnInput}
              ref="input"
              style={{width: '100%'}}
              color="info"
              size="middle"
            />
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
        console.log('destroy')
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      __handleOnInput(value) {
        /*很奇怪的一个问题，就是在输入一个字符之后，input这里会立马失去焦点，导致无法输入，这里每次在数据变化之后，令input重新获取焦点*/
        this.input = value;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      },
      __hadleConfirm(e) {
        this.onConfirm && this.onConfirm(e, this.isInput ? this.input : null);
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
    props.isInput = false;
    return showModal(props);
  }
}

AModal.showConfirm = function (props) {
  props.type = props.type || 'warning';
  props.title = props.title || '提示';
  props.hasFoot = true;
  props.isInput = false;
  return showModal(props);
}

AModal.showInput = function (props) {
  props.type = props.type || 'info';
  props.title = props.title || '请输入...';
  props.hasFoot = true;
  props.isInput = true;
  props.input = null;
  return showModal(props);
}

export default AModal;
