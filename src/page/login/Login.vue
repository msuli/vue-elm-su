<template>
  <div>
    <app-header head-title="密码登录" goBack="true">
    </app-header>
    <form action="" class="login-form">
      <div class="input-container">
        <input type="text"
               placeholder="账号"
               v-model="userAccount"
        />
      </div>
      <div class="input-container">
        <input type="password"
               placeholder="密码"
               v-model="passWord"
        />
      </div>
      <div class="input-container">
        <input type="text"
               placeholder="验证码"
               v-model="captcha"
        />
        <div class="img-change-img">
          <div class="change-img">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </form>
    <p class="tips">温馨提示：未注册过的账号登录时将自动注册</p>
    <p  class="tips">注册过的用户，可凭账号密码登录</p>
    <div class="btn">
      <button class="btn-login" @click="login">登录</button>
    </div>
  </div>

</template>
<script>
  import Header from '../../components/header/Header.vue'
  export default{
      data(){
          return {
              userAccount:'',
            passEord: '',
            captcha: '',
              showAlert: false,
              alertText: ''

          }
      },
    methods:{
       login(){
          if(!this.userAccount){
              this.showAlert = true;
              this.alertText = '请输入用户名，密码';
          }else if(!this.passWord){
              this.showAlert = true;
              this.alertText = '请输入密码';
         } else if (!this.captcha){
           this.showAlert = true;
           this.alertText = '抢输入验证码';
         }
       }
    },
    components: {
      appHeader: Header
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .login-form {
    margin-top: 3.2rem;
    background: $white;
    margin-bottom:0.6rem;
    .input-container{
      display: flex;
      height:2.5rem;
      line-height:2.5rem;
      padding:0.5rem;
      border-bottom:1px solid $bordercolor;
      input{
        display: flex;
        width: 88%;
        height: 100%;
        font-size: 0.75rem;
      }
    }
  }
  .tips{
    text-indent: 0.5rem;
    line-height:1.5rem;
    @include fsc(0.65rem, red)
  }
  .img-change-img{
    display: flex;
   align-items: center;
  }
  .change-img{
    p{
      font-size: 0.5rem;
      line-height:1rem;
      &+p{
        color: deepskyblue;
      }
    }
  }
  .btn{
    padding:0.5rem;
    .btn-login{
      background: #53d869;
      color: #ffffff;
      padding:0.6rem;
      font-size:0.9rem;
      width:100%;
    }
  }
</style>
