<template>
  <div class="a-radio-example">
    <a-title>普通用法</a-title>
    <div>
      <a-radio v-model="isChecked" :label="isChecked"/>
    </div>
    <a-title>设置文字</a-title>
    <div>
      <a-radio v-model="isChecked" label="是否关注"/>
    </div>
    <a-title>设置icon</a-title>
    <div>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" label="关注" v-model="isChecked"/>
    </div>
    <a-title>设置icon颜色</a-title>
    <div>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" label="关注" icon-color="yellow"/>
    </div>
    <a-title>设置icon大小</a-title>
    <div>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" label="关注" icon-size="30px"/>
    </div>
    <a-title>自定义icon的内容</a-title>
    <div>
      <a-radio :value="true" icon-size="24px" label="martsforever" inactive-icon="user-forbid" icon-color="#999">
        <div slot="activeTag">
          <img :src="avatar" class="avatar-tag">
        </div>
      </a-radio>
    </div>
    <a-title>单选按钮组--{{groupValue}}</a-title>
    <div>
      <a-radio-group v-model="groupValue">
        <a-radio name="ambzer" :value="true" label="ambzer"/>
        <a-radio name="rose" :value="true" label="rose"/>
        <a-radio name="martsforever" :value="true" label="martsforever"/>
      </a-radio-group>
      <br>
      <a-radio-group v-model="groupValue">
        <a-radio name="ambzer" :value="true" label="ambzer"/>
        <a-radio name="rose" :value="true" label="rose"/>
        <a-radio name="martsforever" :value="true" label="martsforever"/>
      </a-radio-group>
    </div>
    <a-title>多选按钮组--{{groupValue1}}</a-title>
    <div>
      <a-radio-group v-model="groupValue1" :is-multi-selected="true">
        <a-radio name="ambzer" :value="true" label="ambzer"/>
        <a-radio name="rose" :value="false" label="rose"/>
        <a-radio name="martsforever" :value="true" label="martsforever"/>
      </a-radio-group>
    </div>
    <a-title>按钮组方向</a-title>
    <div>
      <a-radio-group v-model="groupValue1" :is-multi-selected="true" direction="column">
        <a-radio name="ambzer" :value="true" label="ambzer"/>
        <a-radio name="rose" :value="false" label="rose"/>
        <a-radio name="martsforever" :value="true" label="martsforever"/>
      </a-radio-group>
      <a-radio-group v-model="groupValue1" :is-multi-selected="true" direction="row">
        <a-radio name="ambzer" :value="true" label="ambzer"/>
        <a-radio name="rose" :value="false" label="rose"/>
        <a-radio name="martsforever" :value="true" label="martsforever"/>
      </a-radio-group>
    </div>

  </div>
</template>

<script>
  import ARadio from "../../base/components/a-radio/a-radio";
  import ARadioGroup from "../../base/components/a-radio/a-radio-group";
  import CONST from "../../base/script/const";
  import ATitle from "../../base/components/a-title/a-title";

  export default {
    name: "a-radio-example",
    components: {
      ATitle,
      ARadioGroup, ARadio
    },
    data() {
      return {
        isChecked: false,
        avatar: CONST.userImg,
        groupValue: null,
        groupValue1: null
      }
    },
  }
</script>

<style scoped lang="scss">
  .avatar-tag {
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }
</style>
