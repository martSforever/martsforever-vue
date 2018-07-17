<template>
  <div class="a-radio-example">
    {{isChecked}}
    <a-radio-group>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" label="关注" v-model="isChecked"/>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" v-model="isChecked"/>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" v-model="isChecked" icon-size="20px" label="大"/>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" v-model="isChecked" icon-size="12px" label="小"/>
      <a-radio active-icon="fa-heart" inactive-icon="fa-heart-o" v-model="isChecked" icon-color="white"
               label="设置icon颜色"/>
      <a-radio v-model="isChecked" icon-size="24px" label="martsforever" inactive-icon="user-forbid">
        <div slot="activeTag">
          <img :src="avatar" class="avatar-tag">
        </div>
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
  import ARadio from "../../base/components/a-radio/a-radio";
  import ARadioGroup from "../../base/components/a-radio/a-radio-group";
  import CONST from "../../base/script/const";

  export default {
    name: "a-radio-example",
    components: {ARadioGroup, ARadio},
    data() {
      return {
        isChecked: false,
        avatar: CONST.userImg
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
