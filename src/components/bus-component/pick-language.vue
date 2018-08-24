<template>
  <div class="pick-language">
    <a-dropdown trigger="hover">
      {{currentLanguageName}}
      <div slot="dropdown">
        <a-dropdown-item class="lang-item" v-for="(item,index) in languages" :key="index"
                         @click.native="handleChangeLanguage(item.lang,item.name)">
          {{item.name}}
        </a-dropdown-item>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
  import ADropdown from "../../base/components/a-dropdown/a-dropdown";
  import ADropdownItem from "../../example/a-dropdown/a-dropdown-item";

  export default {
    name: "pick-language",
    components: {ADropdownItem, ADropdown},
    data() {
      return {
        languages: null,
        currentLanguageName: null
      }
    },
    mounted() {
      this.languages = this.$i18n.messages.iterate((key, value, ret) => {
        if (key === this.$i18n.locale) this.currentLanguageName = value['language-name']
        ret.push({
          name: value['language-name'],
          value,
          lang: key
        })
        return ret
      }, [])
    },
    methods: {
      handleChangeLanguage(lang, name) {
        this.$i18n.locale = lang
        this.currentLanguageName = name
      },
    },
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
