<template>
  <div class="shop-container">
    <div class="goback">
      <div class="left-arrow"></div>
    </div>
    <header>
      <div class="shop-detail">
        <img src="" alt="">
        <div class="detail">
          <h2>效果演示</h2>
          <p>商家配送／30分钟送达／配送费¥5</p>
          <p>公告：欢迎光临，用餐高峰期请提前点餐，谢谢！</p>
        </div>
      </div>
    </header>
    <ul class="change-show-type">
      <li>
        <span :class="{'active': changeShowType == 'shopList'}"
              @click="changeShowType = 'shopList'"
        >商品</span>
      </li>
      <li>
        <span :class="{'active': changeShowType == 'rating'}"
              @click="changeShowType = 'rating'"
        >评价</span>
      </li>
    </ul>
    <transition mode="out-in" name="component-fade">
      <component :is="changeShowType" :shop="shopId"
      ></component>
    </transition>

    <footer ref="footer">
      <div class="footer-left">
        <div class="wrap">
          <div class="cart" v-if="getTotalNum.totalNum<=0"
               style="backgroundColor: #444">
            <i></i>
            <span v-if="getTotalNum.totalNum>0">{{getTotalNum}}</span>
          </div>
          <div class="cart" v-else
               @click="showCartList = true">
            <i></i>
            <span v-if="getTotalNum.totalNum>0">{{getTotalNum.totalNum}}</span>
          </div>
        </div>
        <div class="fee">
          <p class="price">¥{{getTotalNum.totalPrice}}</p>
          <span>配送费¥5</span>
        </div>
      </div>
      <div>
        <button type="button" v-if="getTotalNum.totalPrice-20>=0">去结算</button>
        <button disabled v-else>还差{{20-getTotalNum.totalPrice}}元起送</button>
      </div>
    </footer>
    <!--购物车列表显示-->
    <transition name="slide">
    <div class="cart-list"
         :class="{show:showCartList}"
         v-if="showCartList"
         @click.self="showCartList = false">
      <div class="panel">
        <div class="title">
          <span>购物车</span>
          <span @click="clearAll"><i></i>清空</span>
        </div>
        <ul class="cart-ul">
          <li class="cart-item" v-if="cartItem.num >0" v-for="(cartItem, index) in cartList" :key="index">
            <span class="name ellipsis">{{cartItem.name}}</span>
            <span class="price"><i>¥</i>{{cartItem.price}}</span>
            <div class="calc">
              <span class="minus" @click="removeOutCart(cartItem)"></span>
              <span class="number">{{cartItem.num}}</span>
              <span class="plus" @click="addToCart(cartItem)"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import shopList from './children/shopList.vue';
  import rating from './children/rating.vue';
  import {mapState, mapMutations} from 'vuex';
  import {msiteAddress, shopDetails, foodMenu, ratingScores, ratingTags, getRatingList} from '../../service/getData';

  export default {
    data(){
      return {
        geohash: '',  //city页面传过来的地址geohash
        shopId: null, //商铺id
        changeShowType: 'shopList', //商品和评价之间的切换
        shopDetailData: '', //商铺详情
        shopListTop: [], //商品列表的高度集合
        cateListTop: [], //分类列表的高度集合
        totalNum: 0, //购物车总数量
        totalPrice: 0, //购物车总金额
        showCartList: false, //购物车列表显示
      }
    },
    created() {
      this.geohash = this.$route.query.geohash;
      this.shopId = this.$route.query.id;
    },
    mounted(){
      this.initData();
    },
    components: {
       shopList, rating
    },
    computed: {
      ...mapState(['longitude', 'latitude', 'cartList']),
      shopCart(){
          return this.cartList;
      },
      getTotalNum(){
        let num = 0, price=0;
        if(this.shopCart && this.shopCart.length){
          this.shopCart.forEach((item, index) => {
            num += item.num;
            price += item.price * item.num;
          })
        }
        return {totalNum: num, totalPrice: price};
      },

    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'ADD_CART', 'REDUCE_CART', 'CLEAR_CART', 'INIT_BUYCART'
      ]),
      //初始化时获取基本数据
      async initData(){
        if (!this.latitude) {
          //获取位置信息
          let res = await msiteAddress(this.geohash);
          //记录当前经纬度进入vuex
          this.RECORD_ADDRESS(res);
        }
        //获取商铺详情
        //this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
        //评论列表
        //this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
        //商铺评论详情
        //this.ratingScoresData = await ratingScores(this.shopId);
        //评论Tag列表
        //this.ratingTagsList = await ratingTags(this.shopId);
        //this.showLoading = false;
        //从localStorage获取购物车信息
        this.INIT_BUYCART();
      },


      //点击清空所有的操作
      clearAll(){
        this.CLEAR_CART();
        this.showCartList = false;
      },
      //点击添加购物车
      addToCart(obj){
        obj.shopId = this.shopId;
        this.ADD_CART(obj);
      },
      //点击减的事件
      removeOutCart(food){
        this.REDUCE_CART(food);
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  .shop-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    @include fsc(0.65rem, #666);
  }

  header {

  }

  .goback {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2rem;
    z-index: 1;
    .left-arrow, .right-arrow {
      width: 0.5rem;
      height: 2rem;
      position: absolute;
    }
    .left-arrow:before, .right-arrow:before {
      content: '';
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      border-left: 2px solid #ffffff;
      border-bottom: 2px solid #ffffff;
      position: absolute;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
    .left-arrow:before {
      transform: rotate(45deg);
      left: 0.8rem;
    }
    .right-arrow:before {
      transform: rotate(225deg);
      right: 0.8rem;
    }
  }

  .shop-detail {
    position: relative;
    display: flex;
    padding: 0.3rem;
    background: #beb7c5;
    h2, p {
      color: #ffffff;
      margin-bottom: 0.3rem;
    }
    p {
      font-size: 0.5rem;
    }
    .shop-img {

    }
    img {
      display: block;
      width: 3rem;
      height: 3rem;
      margin-right: 0.3rem;
      border: 1px solid #ccc;
    }
    h2 {
      font-size: 0.8rem;
      color: #fff;
      font-weight: bold;
    }
  }

  .change-show-type {
    height: 2rem;
    border-bottom: 1px solid #ddd;
    background: #ffffff;
    font-size:0;
    & > li {
      text-align: center;
      padding: 0.3rem 0 0.7rem;
      width:50%;
      display: inline-block;
    }
    span {
      color: #666;
      font-size: 0.65rem;
      padding: 0.2rem 0;
    }
    span.active {
      color: #3190e8;
      border-bottom: 0.1rem solid #3190e8;
    }
  }
.menu-footer{
  display: flex;
  justify-content: space-between;
}
  footer{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    height:2rem;
    background: #3d3d3f;
    z-index:4;
    .wrap{
      margin-left: 0.5rem;
      width: 2.5rem;
      height: 2.5rem;
      background: #444;
      border-radius: 50%;
      position: relative;
      top: -.5rem;
      &>div{
        width: 2.1rem;
        height: 2.1rem;
        background: #3190e8;
        border-radius: 50%;
        position: absolute;
        left: 0.2rem;
        top: 0.2rem;
        text-align: center;
      }
      i{
        display: inline-block;
        width:1.5rem;
        height:1.5rem;
        background: url("../../images/cart.png") no-repeat;
        background-position: center;
        margin-top: 0.3rem;
      }
      span{
        position: absolute;
        display: inline-block;
        height: 0.8rem;
        line-height: 0.8rem;
        width: 0.8rem;
        top: -0.4rem;
        right: 0;
        color: #fff;
        background: red;
        border-radius: 50%;
      }
    }
    .footer-left{
      display: flex;
      .fee{
        margin-left: 0.5rem;
        p{
          font-size: 0.8rem;
          font-weight:bold;
        }
        font-size: 0.55rem;
      }
      p, span{
        color: #ffffff;
      }
    }
    button{
      padding: 0.45rem 1.8rem;
      background: #4cd964;
      color: #ffffff;
      font-size: 0.8rem;
      &:disabled{
        background: #535356;
      }
    }
  }
  .cart-list{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,.4);
    z-index:3;
    &.show
    {
      display: block;
      &>.panel{
      transform: translateY(0);
      transition: all .5s;
    }}
    .panel{
      position: fixed;
      bottom:2rem;
      left:0;
      right:0;
      background: #ffffff;
      padding:0 0.5rem;
      transform: translateY(100%);
      .title{
        display: flex;
        justify-content: space-between;
        background: #f5f5f5;
        padding: 0.8rem 0.5rem;
        margin: 0 -0.5rem;
      }
      .cart-ul{
        padding:0.5rem 0 0;
      }
      .cart-item{
        display: flex;
        margin-bottom: 1rem;
        .name{
          flex: 0 0 60%;
        }
        .price, .calc{
          flex:0 0 20%;
          align-items: center;
        }
        .price{
          font-size: 0.7rem;
          color: #f60;
          font-weight: bold;
          i{
            font-size: 0.6rem;
            color: #f60;
          }
        }
      }
    }
    .calc{
      display: flex;
    }
    .minus, .plus{
      width: 1rem;
      height:1rem;
    }
    .minus{
      background: url("../../images/minus.png") no-repeat;
      background-size: cover;
    }
    .plus{
      background: url("../../images/plus.png") no-repeat;
      background-size: cover;
    }
    .number{
      font-size: 0.6rem;
      margin: 0 0.4rem;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transform: translateY(0);
    opacity:1;
    transition: all .5s;
  }
  .slide-enter, .slide-leave-to{
    transform: translateY(100%);
    opacity: 0;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    //transform: translateX(0);
    transition: all .3s ease;

  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
   // transform: translateX(-100%);
  }
</style>
