<template>
  <div class="city-container">
    <app-header :head-title="cityName" go-back="true">
        <router-link to="/home" slot="changecity" class="change-city">
          切换城市
        </router-link>
    </app-header>
      <form class="city-form" v-on:submit.prevent>
        <div>
          <input type="search" name="city" placeholder="请输入学校、商务楼、地址"
                 class="city-input input-style" v-model="inputValue" required
          >
        </div>
       <div>
         <input type="submit" name="submit" value="提交" class="submit-input input-style" @click="postposi">
       </div>
      </form>
      <header v-if="historyTitle" class="posi-search-history">搜索历史</header>
      <ul class="getpois_ul">
        <li v-for="(item, index) in placeList"
            @click="nextPage(index, item.geohash)"
            :key="index">
          <h4 class="posi-name ellipse">{{item.name}}</h4>
          <p class="posi-address ellipse">{{item.address}}</p>
        </li>
      </ul>
    <footer v-if="historyTitle && placeList.length"  class="clear-all-history" @click="clearAll">清空所有</footer>
    <div class="search-non-place" v-if="placeNone">很抱歉，无搜索结果</div>
  </div>
</template>

<script>
  import Header from '../../components/header/Header.vue';
  import { currentCity, searchHistory } from '../../service/getData';
  import {setStore, getStore, removeStore} from '../../config/mUtile';
  export default{
      data(){
          return{
            cityName: '',
            inputValue: '',
            historyTitle: true,
            cityId : '',
            placeList: [], //搜索城市列表
            historyTitle: true,
            placeHistory : [],//历史搜索记录
            placeNone: false
          }
      },
    mounted() {
          this.cityId = this.$route.params.cityid;
      currentCity(this.cityId).then(res => {
              this.cityName = res.name;
          });
      this.initData();
    },
    methods: {
          initData(){
              var placeList = getStore('placeHistory');
             if(placeList){
                 this.placeList = JSON.parse(placeList);
             } else{
                 this.placeList = [];
             }
          },
          //发送搜索信息
        postposi(){
          if(this.inputValue) {
            searchHistory(this.cityId, this.inputValue).then(res => {
              this.placeList = res;
              this.historyTitle = false;
              this.placeNone = res.length ? false : true;
            })
          }
        },
      //清除历史记录
        clearAll(){
        removeStore('placeHistory');
        this.initData();
      },
      //点击li进入下一个页面时要判断是否有一样的历史记录，如果没有则新增，有则不做重复存储
      nextPage(index, geohash){
        let history = getStore('placeHistory');
        let selectedP = this.placeList[index];
        let repeat = false;
        if(history){
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(function(item){
            if(item.geohash == geohash){
                repeat = true;
            }
          })
          if(!repeat){
            this.placeHistory.push(selectedP)
          }
        }else{
          this.placeHistory.push(selectedP)
        }
        setStore('placeHistory', this.placeHistory);
        // 带查询参数，变成/msite?query=geohash, 跳转到这个页面
        this.$router.push({path:'/msite', query:{geohash}});
      }
    },
    components: {
      appHeader: Header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../style/mixin';
  @import '../../style/common';
  .city-container{
    padding-top: 3rem;
    .city-form{
      background: $white;
      padding-bottom: 0.8rem;
      div{
        width:90%;
        margin:0 auto;
      }
      .input-style{
        padding:0.4rem;
        width:100%;
        margin-top: 0.65rem;
        border:1px solid #ccc;
        border-radius: 0.2rem;
        font-size: 0.65rem;
      }
      .submit-input{
        border-color: transparent;
        background: $blue;
        color: $white;
      }
    }
  }
  .posi-search-history{
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-left: .5rem;
    font-size: .475rem;
    line-height:.8rem;
  }
  .getpois_ul{
    background: #ffffff;
    li{
      padding: 0.5rem;
      border-top:1px solid $bordercolor;
      .posi-name{
        font-size: 0.65rem;
        color: #999999;
      }
      .posi-address{
        font-size: 0.45rem;
        color: #666666;
      }
      .ellipse{
        line-height: 1rem;
      }
    }
  }
  .change-city{
    @include fsc(0.6rem, $white);
    @include tbc();
    right:1rem;
  }
  .clear-all-history{
    text-align: center;
    background: #fff;
    border-top: 1px solid #ddd;
    line-height: 2rem;
    @include fsc(0.7rem,  #666);
    font-size: 0.7rem;
  }
</style>
