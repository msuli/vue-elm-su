<template>
 <header id="head-top">
   <slot name="logo"></slot>
   <slot name="search"></slot>
   <section class="head-goback" v-if="goBack" @click="$router.go(-1)">
     <i class="iconfont"><</i>
   </section>
   <router-link to="/login" class="head-login" v-if="signinUp">
     <i class="iconfont"></i>
     <span class="login-span">登录|注册</span>
   </router-link>
   <section class="title-head ellipsis" v-if="headTitle">
     <span class="title-text">{{headTitle}}</span>
   </section>
   <slot name="edit"></slot>
   <slot name="msite-title"></slot>
   <slot name="changecity"></slot>
   <slot name="changeLogin"></slot>
 </header>
</template>
<script>
  export default {
      props: ['signinUp', 'headTitle', 'goBack'],
      data(){
          return {

          }
      },

  }
</script>
<style lang="scss" scoped>
  @import "../../style/mixin";
  #head-top{
    position: fixed;
    top:0;
    left:0;
    @include wh(100%, 2.5rem);
    background: $blue;
  }
.head-login{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.9rem;
  text-decoration: none;
  span {
    @include fsc(0.9rem, #fff);
  }
}
  .head-goback{
    @include tbc;
    left: 0.5rem;
    i{
      @include fsc(0.9rem, $white);
    }
  }
  .title-head{
    text-align: center;
    line-height: 2.5rem;
    .title-text{
      @include fsc(0.9rem, $white);
      font-weight:800;
    }
  }
</style>
