<template>
  <div class="a-tag">
    <div class="a-tag-item" v-for="(str,index) in strings" :key="index" @click="_handleClickItem(str,index)">
      <span class="str">{{str}}</span>
      <a-icon icon="fa-times-circle" @click="_removeItem(index)"/>
    </div>
    <input class="a-tag-input a-tag-item" @keyup.enter="_handleEnter" v-model="text" :style="inputStyles"/>
  </div>
</template>

<script>
  import AIcon from "../a-icon/a-icon";

  export default {
    name: "a-tag",
    components: {AIcon},
    props: {
      strings: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        text: ''
      }
    },
    methods: {
      _handleClickItem(item, index) {

      },
      _removeItem(index) {
        this.strings.splice(index, 1)
      },
      _handleEnter() {
        if (!!this.text) {
          this.strings.push(this.text)
          this.text = ''
        }
      },
    },
    computed: {
      inputStyles() {
        return {
          width: `${2 + this.text.length}em`
        }
      },
    },
    mounted() {
      console.log(this.strings)
    },
  }
</script>

<style lang="scss">
  .a-tag {
    padding: 0px 3px;
    width: 200px;
    display: inline-block;
    background-color: $text-color-main;
    border-radius: $border-fillet;
    * {
      color: white;
    }
    .a-tag-item {
      padding: 3px 6px;
      background-color: $text-color-primary;
      min-height: 20px;
      display: inline-flex;
      align-items: center;
      border-radius: $border-fillet;
      margin: 6px 6px;
      cursor: pointer;
      .str {
        margin-right: 3px;
      }
    }
    .a-tag-input {
      outline: none;
      color: white;
      height: 20px;
      width: 90px;
      background-color: blueviolet;
      border-radius: $border-fillet;
      padding: 3px 6px;
    }
  }
</style>
