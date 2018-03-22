<template>
  <div>
    <header-top signin-up="msite">
      <router-link :to="'search/' + geohash" class="link-search" slot="search">
          <div class="search"></div>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="title-text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </header-top>
    <nav class="msite-nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wraper">
          <div class="swiper-slider food-types-container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food', query:{geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link-to-food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" alt="">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination">
          <span></span>
          <span></span>
        </div>
      </div>
      <!--<img src="../../images/fl.svg" alt="" class="fl-back animation-opacity" v-else>-->
    </nav>
    <div class="shop-list-container">
      <header class="shop-header">
        <!--<svg class="shop-icon"></svg>-->
        <span class="shop-header-title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import footGuide from '../../components/footer/footer.vue';
  import headerTop from '../../components/header/Header.vue';
  import shopList from '../../components/common/shopList.vue';
  import {msiteAddress, msiteFoodTypes, cityGuess} from '../../service/getData';
 // import '../../plugins/swiper.min.js'
  //import '../../style/swiper.min.css'
  export default{
      data(){
          return{
            geohash: '',
            msiteTitle: '请选择地址...',
            foodTypes: [],
            hasGetData: false,
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
          }
      },
    async beforeMount(){
       if(!this.$route.query.geohash){
           const address = await cityGuess();
           console.log(address);
         this.geohash = address.latitude + ',' + address.longitude;
       }else {
           this.geohash = this.$route.query.geohash;
       }
       //保存geohash到vuex
      this.SAVE_GEOHASH(this.geohash);
       //获取位置信息
       let res = await msiteAddress(this.geohash);
       /*
       res ={address:"广东省佛山市顺德区工业大道12号"
        city:"广东省"
        geohash:"22.91312,113.20823"
        latitude:"22.91312"
        longitude:
        "113.20823"
        name:"顺德区美的电器(慧聪城西南300米)"}
        */
       this.msiteTitle = res.name;
       this.hasGetData = true;
       //记录当前位置信息
      this.RECORD_ADDRESS(res);
    },
    mounted(){
      msiteFoodTypes(this.geohash).then(res => {
        let resLength = res.length;
        let resArr = [...res];
        let foodArr = [];
        for(let i = 0,  j = 0; i < resLength; i+=8, j++){
            foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
        console.log(this.foodTypes)
      })
    },
    components:{
      footGuide,
      headerTop,
      shopList
    },
    methods:{
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ]),
      getCategoryId(){}
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/mixin";
  .link-search{
    position: absolute;
    left: 1rem;
    width: 0.9rem;
    height: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .msite-title{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:50%;
    span{
      font-size: 0.8rem;
      color: #fff;
      text-align: center;
      display: block;
    }
  }
  .search {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: #fff;
    border: 1px solid currentColor;
    transform: rotate(-45deg);
  }

  .search:before {
    content: '';
    position: absolute;
    top: 16px;
    left: 6px;
    width: 2px;
    height: 9px;
    background: currentColor;
  }
  .msite-nav{
    padding-top: 2.5rem;
    background: #ffffff;
    height:10.6rem;
    border-bottom: 0.025rem solid #ddd;
    .swiper-container{
      width:100%;
      height:auto;
      padding:0.6rem 0;
      .swiper-pagination{
        margin-top: 0.6rem;
        width:100%;
        text-align: center;
        span{
          display: inline-block;
          margin:5px;
          width:8px;
          height:8px;
          border-radius: 100%;
          background: #000;
          opacity: 0.2;
        }
      }
      .swiper-slider{
        display: flex;
        flex-wrap: wrap;
        &+.swiper-slider{
          display: none;
        }
      }
    }
  }
  .link-to-food{
    width:25%;
    display: flex;
    justify-content: center;
    padding:0.5rem 0;
    img{
      margin-bottom: 0.3rem;
      width: 1.8rem;
      height: 1.8rem;
    }
    figure{
      text-align: center;
      font-size: 0.55rem;
      color: #666;
    }
  }
  .shop-list-container{
    margin-top: 0.4rem;
    border-top: 1px solid #ddd;
    background: #ffffff;
    margin-bottom: 1.9rem;
    .shop-header{
      .shop-header-title{
        color: #999;
        font:0.65rem/1.6rem 'Microsoft Yahei';
        margin-left: 2rem;
      }
    }
  }
</style>
