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
      <router-link :to="'/city/' + guessCityId"
                   class="guess-city">
        <span>{{guessCity}}</span>
      </router-link>
    </nav>
    <section class="group-city-container" id="hot-city-contener">
      <h4 class="city-title">热门城市：</h4>
      <ul class="citylistul clear">
        <router-link
          tag="li" to="/login"
          v-if="hotCity"
          v-for="hCity in hotCity" :key="hCity.id">
          <a>{{ hCity.name}}</a>
        </router-link>
      </ul>
    </section>
    <section class="group-city-container">
      <ul class="letter-classify">
        <li class="letter-classify-li"
            v-for="(item,index) in sortCityGroup" :key="index">
          <h4 class="city-title">{{item.key}} <span v-if="index==0">(按字母排序)</span></h4>
          <ul class="groupcity-name-container citylistul clear">
            <router-link class="ellipsis"
              tag="li" to="/login"
            v-for="city in item.value" :key="city.id">
              <a>{{city.name}}</a>
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
        cityGroup: {}
      }
    },
    components: {
      appHeader: Header
    },
    computed:{
        sortCityGroup() {
         let sortArr = [];
          for(let i = 65; i<=90; i++) {
            let sortObj = {};
              if(this.cityGroup[String.fromCharCode(i)]) {
                  sortObj.key = String.fromCharCode(i);
                sortObj.value = this.cityGroup[String.fromCharCode(i)];
                sortArr.splice(sortArr.length, 0, sortObj);
              }
          }
          return sortArr;
      }
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
        this.cityGroup = res;
      })

    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  $left: 0.5rem;
  $hotcitycolor: #3190e8;
  $groupcitycolor: #666;
  .city-nav{
    padding-top: 2.5rem;
    border-top:1px solid $bordercolor;
    background: $white;
    margin-bottom: 0.5rem;
    .city-tip{
      display: flex;
      justify-content: space-between;
      line-height:2rem;
      padding:0 0.55rem;
      &>span:first-child{
        @include fsc(0.7rem, $groupcitycolor);
      }
      &>span+span{
        @include fsc(0.55rem, #9f9f9f);
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
    font-size: 0.7rem;
    color: $hotcitycolor;
    line-height: 2rem;
    text-indent: $left;
  }
  .group-city-container{
    background: $white;
    border-top:2px solid $bordercolor;
    margin-bottom: 0.5rem;
    @include fsc(0.8rem, $groupcitycolor);
    .city-title{
      border-bottom: 1px solid $bordercolor;
      text-indent: $left;
      line-height: 1.5rem;
      @include fsc(0.55rem, $groupcitycolor);
      span{
        @include fsc(0.5rem, #999);
      }
    }
    .citylistul> li{
      float: left;
      width:25%;
      border-bottom: 1px solid $bordercolor;
      border-right:1px solid $bordercolor;
      background: $white;
      line-height: 1.75rem;
      text-align: center;
      a{
        font-size: 0.6rem;
        color:$hotcitycolor;
      }
    }
    .letter-classify {
      .letter-classify-li+.letter-classify-li{

          border-top:1px solid $bordercolor;
          margin-top: -1px;


      }
    .groupcity-name-container li> a{
      color: $groupcitycolor;
    }
    }
  }

  .ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>
