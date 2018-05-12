<template>
  <div class="app-head">
    <transition name="to-bottom">
      <div class="app-head-content" v-if="show">
        <div class="left">
          <img :src="logo" class="logo-img">
        </div>
        <div class="center">
          <div class="search-wrapper">
            <input class="search-input" placeholder="Please enter key..."/>
            <p class="icon"><i class="fa fa-search"></i></p>
          </div>
        </div>
        <div class="right">
          <img :src="avatar" class="avatar">
          <p>{{user.name}} <i class="fa fa-angle-double-down"></i></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "app-head",
    data() {
      return {
        show: false,
        logo: require(`src/base/image/base/logo.png`),
        avatar: require('src/base/image/bus/user/avatat.jpg'),
        user: {
          name: '韦胜健'
        }
      }
    },
    mounted() {
      this.show = true;
    }
  }
</script>

<style scoped lang="stylus">
  .app-head {
    .app-head-content {
      display flex
      height $head-height
      background-color: rgba(255, 255, 255, 0.1);
      position absolute
      top: 0
      left: 0
      right: 0
      border-bottom $border-bottom-line;
      box-sizing border-box
      .left, .center, .right {
        display inline-block
        height 100%
      }
      .left {
        width 156px
        display inline-flex
        align-items: center
        cursor pointer
        .logo-img {
          width 100%
          height auto
        }
      }
      .center {
        flex 1
        display flex
        align-items center
        justify-content center
        .search-wrapper {
          width fit-content
          display inline-block
          position relative
          .search-input {
            color $font-color-light
            height 24px
            width 256px
            border solid 2px $font-color-cyan
            padding: 0 36px 0 12px
            border-radius 24px
            outline none
          }
          .icon {
            position absolute
            right 0
            color $font-color
          }
        }
      }
      .right {
        width 256px
        display flex
        align-items center
        justify-content center
        color $font-color-light
        cursor pointer

        p {
          font-weight bold
          letter-spacing 2px
        }
        .avatar {
          height 32px
          width 32px
          border-radius 50%
          margin-right 12px
        }
      }
    }

  }
</style>
