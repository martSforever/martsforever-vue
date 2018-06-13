<template>
  <div class="a-modal-example">
    <a-title>消息提示插件$Model</a-title>
    <div class="example-item">
      <a-button type="info" @click="showInfo">提示对话框</a-button>
      <a-button type="primary">普通对话框</a-button>
      <a-button type="warning">警告对话框</a-button>
      <a-button type="error">错误对话框</a-button>
      <a-button type="success">成功对话框</a-button>

      <a-button type="primary">确认对话框</a-button>
      <a-button type="info">输入对话框</a-button>
    </div>

    <a-title>通过引用控制对话框显隐</a-title>
    <div class="example-item">
      <a-button @click="toggle">show1-->>{{show1}}</a-button>
      <a-modal ref="dialog" @change="handleChange">
        balabala-->>{{show1}}
      </a-modal>
    </div>
    <a-title>通过数据绑定控制显隐</a-title>
    <div class="example-item">
      <a-button @click="show2 = !show2">show2-->>{{show2}}</a-button>
      <a-modal v-model="show2">
        balabala-->>{{show2}}
      </a-modal>
    </div>
    <a-title>设置对话框图标级别</a-title>
    <div class="example-item">
      <a-button @click="show11 = !show11">show11-->>{{show11}}</a-button>
      <a-modal type="info" v-model="show11" title="通知">
        balabala-->>{{show11}}
      </a-modal>
    </div>
    <a-title>设置遮罩层颜色</a-title>
    <div class="example-item">
      <a-button @click="show3 = !show3">show3-->>{{show3}}</a-button>
      <a-modal v-model="show3" shadow-color="black">
        balabala-->>{{show3}}
      </a-modal>
    </div>
    <a-title>自定义宽高</a-title>
    <div class="example-item">
      <a-button @click="show4 = !show4">show4-->>{{show4}}</a-button>
      <a-modal v-model="show4" width="100%" height="100%">
        <div style="height:100%;width:100%;background-color: black">
          balabala-->>{{show4}}
        </div>
      </a-modal>
    </div>
    <a-title>是否将遮罩连同对话框移动到body节点下，默认为true或者Y</a-title>
    <div class="example-item">
      <a-button @click="show5 = !show5">show5-->>{{show5}}</a-button>
    </div>
    <a-modal v-model="show5" under-body="N">
      balabala-->>{{show5}}
    </a-modal>
    <a-title>对话框形状</a-title>
    <div class="example-item">
      <a-button @click="show6 = !show6">show6-->>{{show6}}</a-button>
      <a-modal v-model="show6" shape="none">
        balabala-->>{{show6}}
      </a-modal>
    </div>
    <a-title>设置自定义动画</a-title>
    <div class="example-item">
      <a-button @click="show7 = !show7">show7-->>{{show7}}</a-button>
      <a-modal v-model="show7" transition-name="to-left">
        balabala-->>{{show7}}
      </a-modal>
    </div>
    <a-title>设置对话框标题</a-title>
    <div class="example-item">
      <a-button @click="show8 = !show8">show8-->>{{show8}}</a-button>
      <a-modal v-model="show8" title="碳酸饮料详情">
        balabala-->>{{show8}}
      </a-modal>
    </div>
    <a-title>是否有关闭对话框按钮，默认为true或者Y(当没有标题，没有关闭按钮以及自定义标题的时候，标题栏会消失)</a-title>
    <div class="example-item">
      <a-button @click="show9 = !show9">show9-->>{{show9}}</a-button>
      <a-modal v-model="show9" close-icon="N">
        balabala-->>{{show9}}
      </a-modal>
    </div>
    <a-title>自定义标题栏，底部栏</a-title>
    <div class="example-item">
      <a-button @click="show10 = !show10">show10-->>{{show10}}</a-button>
      <a-modal v-model="show10">
        <div slot="head">
          <a-button-group shape="round" size="small">
            <a-button type="primary" loading="Y">酷吧</a-button>
            <a-button type="error" fa="fa-user">酷吧</a-button>
            <a-button type="info" fa="fa-heart">酷吧</a-button>
          </a-button-group>
        </div>
        <div slot="foot">这是底部栏</div>
        balabala-->>{{show10}}
      </a-modal>
    </div>


  </div>
</template>

<script>
  import ATitle from "../../base/components/a-title/a-title";
  import AButton from "../../base/components/a-button/a-button";
  import AModal from "../../base/components/a-modal/a-modal";
  import AButtonGroup from "../../base/components/a-button/a-button-group";

  export default {
    components: {
      AButtonGroup,
      AModal,
      AButton,
      ATitle
    },
    name: "a-modal-example",
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        show11: false,
      }
    },
    methods: {
      showDialog() {
        this.$refs.dialog.show();
      },
      hideDialog() {
        this.$refs.dialog.hide();
      },
      toggle() {
        this.show1 = !this.show1;
        this.show1 ? this.showDialog() : this.hideDialog();
      },
      handleChange(isShow) {
        this.show1 = isShow;
      },
      showInfo(){
        this.$Modal.info(
          {title:'请求失败？？？'}
        );
      },
    },
  }
</script>

<style scoped lang="scss">
  .a-modal-example {
    @include fill-parent;
    .example-item {
      margin-bottom: 12px;
      padding-left: 12px;
    }
  }
</style>
