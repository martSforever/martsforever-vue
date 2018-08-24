<template>
  <div class="pick-language">
    <a-dropdown trigger="hover">
      this is dropdown
      <div slot="dropdown">
        <a-dropdown-item class="lang-item" v-for="(item,index) in languages" :key="index">
          {{item.name}}
        </a-dropdown-item>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
  import ADropdown from "../../base/components/a-dropdown/a-dropdown";
  import langs from '../../base/locale/lang'
  import ADropdownItem from "../../example/a-dropdown/a-dropdown-item";

  export default {
    name: "pick-language",
    components: {ADropdownItem, ADropdown},
    data() {
      return {
        languages: null,
        languageName: null
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
  .pick-language {
    display: inline-block;
    height: 100%;
    .a-dropdown {
      height: 100%;
      .a-dropdown-reference {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
