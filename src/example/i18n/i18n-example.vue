<template>
  <div class="i18n-example">
    <div>
      <a-button-group>
        <a-button
          v-for="(item,index) in languages"
          :key="index"
          @click="handleChangeLanguage(item.lang)">
          {{item.name}}
        </a-button>
      </a-button-group>
    </div>

    <div>
      {{$t("language-name")}}
    </div>
  </div>
</template>

<script>
  import AButton from "../../base/components/a-button/a-button";
  import AButtonGroup from "../../base/components/a-button/a-button-group";
  import langs from '../../base/locale/lang'

  export default {
    name: "i18n-example",
    components: {AButtonGroup, AButton},
    data() {
      return {
        languages: null
      }
    },
    mounted() {
      this.languages = langs.iterate((key, value, ret) => {
        ret.push({
          name: value['language-name'],
          value,
          lang: key
        })
        return ret
      }, [])
    },
    methods: {
      handleChangeLanguage(lang) {
        console.log(lang)
        this.$i18n.locale = lang
      },
    }
  }
</script>

<style lang="scss">
  .i18n-example {
    width: 100vw;
    text-align: center;
  }
</style>
