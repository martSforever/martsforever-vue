<template>
  <div class="a-notice-example">
    <div class="option-wrapper">
      <a-button-group>
        <a-button type="primary">horizontal-->>{{horizontal}}</a-button>
        <a-button @click="horizontal = 'start'">start</a-button>
        <a-button @click="horizontal = 'center'">center</a-button>
        <a-button @click="horizontal = 'end'">end</a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">vertical-->>{{vertical}}</a-button>
        <a-button @click="vertical = 'start'">start</a-button>
        <a-button @click="vertical = 'center'">center</a-button>
        <a-button @click="vertical = 'end'">end</a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">type-->>{{type}}</a-button>
        <a-button @click="type = 'info'">info</a-button>
        <a-button @click="type = 'success'">success</a-button>
        <a-button @click="type = 'warning'">warning</a-button>
        <a-button @click="type = 'error'">error</a-button>
      </a-button-group>

      <a-radio v-model="autoCLose" label="auto close"/>
      <a-input v-model="duration" placeholder="duration"/>
    </div>

    <div>
      <a-button-group>
        <a-button @click="info">info</a-button>
        <a-button @click="close">close</a-button>
        <a-button @click="closeSpecific">closeSpecific</a-button>
      </a-button-group>
      <a-button-group>
        <a-button @click="renderContent">render</a-button>
        <a-button @click="renderBinding">render binding</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import AButton from "../../base/components/a-button/a-button";
  import ARadio from "../../base/components/a-radio/a-radio";
  import ASwitch from "../../base/components/a-switch/a-switch";
  import AInput from "../../base/components/a-input/a-input";
  import ATitle from "../../base/components/a-title/a-title";
  import {randomIndex} from "../../base/script/utils";

  export default {
    name: "a-notice-example",
    components: {ATitle, AInput, ASwitch, ARadio, AButton, AButtonGroup},
    data() {
      return {
        options: [],

        horizontal: 'end',
        vertical: 'start',
        timer: null,
        autoCLose: true,
        duration: 2000,
        type: 'success'
      }
    },
    methods: {
      info() {
        this.$notice.info({
          horizontal: this.horizontal,
          vertical: this.vertical,
          autoClose: this.autoCLose,
          duration: this.duration - 0,
          title: '通知',
          message: '您的快递到了！！！',
          type: this.type
        })
      },
      renderContent() {
        let option = this.$notice.info({
          horizontal: this.horizontal,
          vertical: this.vertical,
          autoClose: this.autoCLose,
          duration: this.duration - 0,
          title: '通知',
          message: '您的快递到了！！！',
          type: this.type,
          renderFunc: (h) => {
            return (
              <div>
                <g-input value={this.duration} style={{width: '100%'}}/>
              </div>
            )
          },
        })
        this.options.push(option)
      },
      renderBinding() {
        let option = this.$notice.info({
          horizontal: this.horizontal,
          vertical: this.vertical,
          autoClose: this.autoCLose,
          duration: this.duration - 0,
          title: '通知',
          message: '您的快递到了！！！',
          type: this.type,
          renderFunc: (h) => {
            return (
              <div>
                <g-input value={this.duration} style={{width: '100%'}} onInput={this.handleNoticeInput}/>
              </div>
            )
          },
        })
        this.options.push(option)
      },
      close() {
        this.options.pop().close()
      },
      closeSpecific() {
        let index = randomIndex(this.options)
        this.options[index].close()
        this.options.splice(index, 1)
      },
      handleNoticeInput(val) {
        this.duration = val
      },
    },

  }
</script>

<style lang="scss">
  .option-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    & > * {
      margin-right: 12px;
    }
  }

</style>
