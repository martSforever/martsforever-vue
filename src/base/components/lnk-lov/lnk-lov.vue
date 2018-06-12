<template>
  <div class="lnk-lov">
    <el-popover
      v-model="isShow"
      placement="bottom"
      trigger="click">
      <div class="lnk-lov-select-wrapper">
        <div class="select-item" v-for="(item ,index) in currentOptions" @click="handleSelectItem(item,index)">
          {{item.name}}
        </div>
      </div>
      <div class="lnk-lov-input-wrapper" slot="reference">
        <el-input v-model="currentName"></el-input>
        <i class="icon el-icon-circle-close" @click="handleClear"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>

  import {getLov} from "./datas";

  export default {
    name: "lnk-lov",
    props: {
      lovType: {
        type: String
      },
      value: ''
    },
    data() {
      return {
        options: getLov(this.lovType),
        currentValue: this.value,
        isShow: false,
        currentName: '',
      }
    },
    methods: {
      handleSelectItem(item, index) {
        this.currentValue = item.value;
        this.__resetCurrentName();
        this.$emit('input', this.currentValue);
        this.isShow = false;
      },
      handleClear() {
        this.currentValue = '';
        this.__resetCurrentName();
        this.$emit('input', this.currentValue);
        this.isShow = true;
      },
      __resetCurrentName() {
        for (let i = 0; i < this.options.length; i++) {
          let option = this.options[i];
          if (option.value === this.currentValue) {
            this.currentName = option.name;
            return;
          }
        }
        this.currentName = '';
      },
    },
    created() {
      this.__resetCurrentName();
    },
    computed: {
      currentOptions() {
        if (!this.currentName) return this.options;
        let ret = [];
        for (let i = 0; i < this.options.length; i++) {
          let option = this.options[i];
          if (option.name.lastIndexOf(this.currentName) > -1) ret.push(option);
        }
        return ret;
      },
    },
  }
</script>

<style lang="scss">
  .lnk-lov {
    display: inline-block;
  }

  .lnk-lov-input-wrapper {
    display: inline-block;
    position: relative;
    .icon {
      position: absolute;
      top: 30%;
      right: 6px;
      color: dodgerblue;
      font-size: 18px;
    }
  }

  .lnk-lov-select-wrapper {
    max-height: 300px;
    overflow-y: auto;
    .select-item {
      margin-bottom: 6px;
      padding: 6px 0px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #ddd;
      }
    }
  }

</style>
