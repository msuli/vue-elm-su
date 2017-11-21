<template>
  <div>
    <app-header signin-up="home">
      <span slot="logo" class="head-logo">ele.me</span>
    </app-header>

    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在列表选择：</span>
      </div>
      <router-link to="/login"
                   class="guess-city">
        <span>佛山</span>
      </router-link>
    </nav>
    <section class="group-city-container" id="hot-city-contener">
      <h4 class="city-title">热门城市：</h4>
      <ul class="citylistul clear">
        <li class=""><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <li><a href="">北京</a></li>
        <!--<router-link-->
          <!--tag="li" to="/login"-->
          <!--v-if="hotCity"-->
          <!--v-for="hCity in hotCity" :key="hCity.id">-->
          <!--<a>{{ hCity.name}}</a>-->
        <!--</router-link>-->
      </ul>
    </section>
    <section class="group-city-container">
      <ul class="letter-classify">
        <li class="letter-classify-li">
          <h4 class="city-title">A</h4>
          <ul class="citylistul clear">
            <router-link
              tag="li" to="/login">
              <a>上海</a>
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import Header from '../../components/header/Header.vue';
  import {cityGuess, hotCities, cityGroup} from '../../service/getData';

  export default {
    data(){
      return {
        guessCity: '',
        guessCityId: '',
        hotCity: [],
        cityGroup: []
      }
    },
    components: {
      appHeader: Header
    },
    mounted(){
      cityGuess().then(response => {
          this.guessCity = response.name;
          this.guessCityId = response.id;
      });

      hotCities().then(res => {
          this.hotCity = res;
      });

      cityGroup().then(res => {
        console.log(res);
        let group = {};
        group = res;
        for(let i = 65; i<=90; i++) {
            this.cityGroup[String.fromCharCode(i)] = group[String.fromCharCode(i)];
        }
         console.log(this.cityGroup);
      })

    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  $left: 0.5rem;
  .city-nav{
    padding-top: 2.5rem;
    border-top:1px solid $bordercolor;
    background: $white;
    margin-bottom: 0.5rem;
    .city-tip{
      display: flex;
      justify-content: space-around;
      line-height:2rem;
      padding:0 0.55rem;
      &>span:first-child{
        @include fsc(0.7rem, #666);
      }
      &>span+span{
        @include fsc(0.65rem, #9f9f9f);
        font-weight:900;
      }
    }
  }
  .head-logo{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: $left;
    color: white;
    font-size: 0.9rem;
  }
  .guess-city> span{
    display: flex;
    border-bottom: 2px solid $bordercolor;
    height: 2rem;
    justify-content: space-between;
    border-top: 1px solid $bordercolor;
    font-size: 0.8rem;
    line-height: 2rem;
    -webkit-box-pack: center;
    text-indent: $left;
  }
  .group-city-container{
    background: $white;
    border-top:2px solid $bordercolor;
    margin-bottom: 0.5rem;
    @include fsc(0.8rem, #666);
    .city-title{
      border-bottom: 1px solid $bordercolor;
      text-indent: $left;
      line-height: 1.5rem;
      @include fsc(0.7rem, #666);
    }
    .citylistul> li{
      float: left;
      width:25%;
      border-bottom: 1px solid $bordercolor;
      border-right:1px solid $bordercolor;
      background: $white;
      line-height: 1.5rem;
      text-align: center;
    }
  }


</style>
