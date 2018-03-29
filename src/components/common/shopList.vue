<template>
  <div>
    <div class="shop-list">
        <ul>
          <router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="(item, index) in shopListArr" :key="index" class="shop-li" tag="li">
            <div class="shop-img">
              <img src="" alt="">
            </div>
            <div class="shop-right">
              <div class="shop_detail_header">
                <div class="shop-title">
                  <span>品牌</span>
                  <h4>{{item.name}}</h4>
                </div>
                <div class="supports">
                  <span v-for="icon in item.supports" :key="icon.id">{{icon.icon_name}}</span>
                </div>
              </div>
              <!--平分行-->
              <div class="rating-order-num">
                <div class="rating-order-num-left">
                  <span></span>
                  <span class="rating-num">{{item.rating}}</span>
                  <span  class="order-section">月销{{item.recent_order_num}}单</span>
                </div>
                <div class="rating-order-num-right">
                  <span class="delivery-style delivery-left">2222</span>
                  <!--{{item.delivery_mode.text}}-->
                  <span class="delivery-style delivery-right">准时达</span>
                </div>
              </div>
              <!--配送费行-->
              <div class="fee-distance">
                <p class="fee">
                  ¥{{item.float_minimum_order_amount}}起送
                  <span>/</span>
                  {{item.piecewise_agent_fee.tips}}
                </p>
                <div class="distance-time">
                  <span>{{item.distance}}</span>
                  <span>/</span>
                  <span class="time">{{item.order_lead_time}}</span>
                </div>
              </div>
            </div>
          </router-link>
        </ul>
    </div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {shopList} from '../../service/getData';
  import {imgBaseUrl} from '../../config/env';
  import loading from './loading.vue';
  export default{
    data(){
      return {
        a: [1,2,3,4,5],
        offset: 0,
        shopListArr: [],//店铺列表数据
        preventRepeatRequest: false,//到达底部加载数据，防止重复加载
        showBackStatus: false,  //回顶部按钮是否显示
        showLoading: true,    //显示加载动画
        touchEnd: false,  // 没有更多数据
        imgBaseUrl
      }
    },
    /*
     deliveryMode  配送方式
    */
    props:['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mounted(){
        this.initData();
    },
    components:{
        loading
    },
    methods:{
      async initData(){
          //获取数据
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        this.shopListArr = res;
        //隐藏加载动画
        this.showLoading = false;
        //总数小于20，没有更多数据le
        if(res.length < 20) {
            this.touchend = true;
        }
      },
      async loaderMore(){
          if(this.touchend) return;
          if(this.preventRepeatRequest) return;
          this.showLoading = true;
          this.preventRepeatRequest = true;
          this.offset += 20;
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        this.shopListArr = [...this.shopListArr, ...res];
        if(res.length < 20) {
          this.touchend = true;
          return;
        }
        this.preventRepeatRequest = false;
      }
    },
    computed: {
      ...mapState([
        'longitude', 'latitude'
      ])
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .shop-li{
    display: flex;
    padding:0.7rem 0.4rem;
    border-bottom:1px solid #ddd;
    .shop-img img{
      width: 2.7rem;
      height: 2.7rem;
      display: block;
      margin-right: 0.4rem;
      background: #ccc;
    }
    .shop-right{
      width:12rem;
    }
    .shop_detail_header{
      display: flex;
      flex-basis: 100%;
      justify-content: space-between;
      align-items: center;
      .supports{
        display: flex;
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -o-transform: scale(0.8);
        transform: scale(0.8);
        span{
          font-size: 0.5rem;
          border: 1px solid #f1f1f1;
          color: #999;
          padding: 2px 0;
          margin-left: 0.1rem;
        }
      }
    }
    .shop-title{
      display: flex;
      span{
        font-size: 0.4rem;
        color: #333;
      }
      h4{
        font-size: 0.6rem;
        font-weight: 600;
        margin-left: 0.3rem;
      }
    }
  }
  .rating-order-num{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rating-order-num-right{
      -webkit-transform: scale(.8);
      -moz-transform: scale(.8);
      -ms-transform: scale(.8);
      -o-transform: scale(.8);
      transform: scale(.8);
      margin-right: -0.3rem;
    }
    span{
      font-size:0.4rem;
      &.rating-num{
        color: orange;
      }
      &.delivery-left{
        color: #fff;
        background: #007aff;
        margin-right: 0.2rem;
      }
      &.delivery-right{
        color: #007aff;
        background: #fff;
      }
      &.delivery-style{
        border-radius: 0.1rem;
        border:1px solid #007aff;
      }
    }
  }
  .fee-distance{
    display: flex;
    justify-content: space-between;
    align-items: center;
    p,span{
      @include fsc(0.4rem, #666);
      -webkit-transform: scale(.9);
      -moz-transform: scale(.9);
      -ms-transform: scale(.9);
      -o-transform: scale(.9);
      transform: scale(.9);
    }
    .distance-time{
      transform: scale(.9);
      span{
        @include fsc(0.4rem, #999);
        &.time{
          color: #007aff;
        }
      }
    }
  }
</style>
