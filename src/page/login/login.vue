<template>
  <div class="login-container">
    <app-header head-title="密码登录" goBack="true">
    </app-header>
    <form action="" class="login-form">
      <section class="input-container">
        <input type="text"
               placeholder="账号"
               v-model.lazy="phoneNumber"
        />
      </section>
      <section class="input-container">
        <input type="password"
               placeholder="密码"
               v-model="passWord"
               v-if="!showPassword"
        />
        <input type="text"
               placeholder="密码"
               v-model="passWord"
               v-else
        />
        <div class="button-switch"
             :class="{'change-to-text': showPassword}"
        >
          <div class="circle-button"
               :class="{'trans-to-right': showPassword}"
               @click="changPasswordType"
          ></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input-container">
        <input type="text"
               placeholder="验证码"
               v-model="captcha"
        />
        <div class="img-change-img">
          <img :src="captchaCodeImg" v-show="captchaCodeImg" />
          <div class="change-img" @click="changeCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="tips">温馨提示：未注册过的账号登录时将自动注册</p>
    <p  class="tips">注册过的用户，可凭账号密码登录</p>
    <div class="btn">
      <button class="btn-login" @click="login">登录</button>
    </div>
    <app-alert :tipText="alertText" v-if="showAlert" @confirmed="showAlert=$event"></app-alert>
  </div>

</template>
<script>
  import Header from '../../components/header/Header.vue';
  import Alert from '../../components/common/alert.vue';
  import {getCaptcha} from '../../service/getData';
  export default{
      data(){
          return {
            phoneNumber:null,
            userAccount: null, //账号
            passWord: '',
            captcha: null,
            showPassword: false, //是否显示密码
            userInfo:null, // 获取到的用户信息
            captchaCodeImg: null, //验证码地址
            codeNumber: null, //验证码
            showAlert: false, // 显示提示组件
            alertText: ''  //提示的内容

          }
      },
    computed: {
        rightPhoneNumber(){
            return /^1\d{10}$/gi.test(this.phoneNumber);
        }
    },
    methods:{
          async getCaptchaCode(){
              let res = await getCaptcha();
              this.captchaCodeImg = res.code;
          },
      changeCaptchaCode(){
            this.getCaptchaCode();
      },
       login(){
          if(!this.phoneNumber){
              this.showAlert = true;
              this.alertText = '请输入用户名，密码';
          }else if(!this.rightPhoneNumber){
           this.showAlert = true;
           this.alertText = '手机号格式错误';
         } else if(!this.passWord){
              this.showAlert = true;
              this.alertText = '请输入密码';
         } else if (!this.captcha){
           this.showAlert = true;
           this.alertText = '抢输入验证码';
         }
         this.$router.go(-1);
       },
      changPasswordType(){
           this.showPassword = !this.showPassword
      }
    },
    components: {
      appHeader: Header,
      AppAlert: Alert
    },
    created(){
          this.getCaptchaCode();
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .login-container{
    padding-top: 3.2rem;
  }
  .login-form {
    background: $white;
    margin-bottom:0.6rem;
    .input-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height:2.5rem;
      line-height:2.5rem;
      padding:0.5rem;
      border-bottom:1px solid $bordercolor;
      input{
        width: 50%;
        height: 100%;
        font-size: 0.75rem;
      }
      .button-switch{
        display: flex;
        justify-content: center;
        width: 2rem;
        height:0.7rem;
        border:1px;
        border-radius: 0.5rem;
        padding: 0 0.2rem;
        position: relative;
        background: #ccc;
        &.change-to-text{
          background: $successbutton;
        }
        .circle-button{
          width: 1.2rem;
          height: 1.2rem;
          box-shadow: 0 0.5px 1px 0 rgba(0,0,0,.1);
          background: #f1f1f1;
          position: absolute;
          top: -0.2rem;
          left: -0.5rem;
          border-radius: 50%;
          z-index: 1;
          transition: all .3s;
          &.trans-to-right{
            transform: translateX(1.4rem);
          }
        }
        span{
          @include fsc(0.5rem, $white);
          transform: translateY(0.05rem);
          line-height:0.6rem;
        }
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
    img{
      width:4rem;
      height: 1.5rem;
      margin-right: .2rem;
    }
  }
  .change-img{
    width: 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
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
      background: $successbutton;
      color: #ffffff;
      padding:0.6rem;
      font-size:0.9rem;
      width:100%;
    }
  }

</style>
