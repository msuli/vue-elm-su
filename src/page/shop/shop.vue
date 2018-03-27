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
        <span :class="{'active': changeShowType == 'food'}"
              @click="changeShowType = 'food'"
        >商品</span>
      </li>
      <li>
        <span :class="{'active': changeShowType == 'rating'}"
              @click="changeShowType = 'rating'"
        >评价</span>
      </li>
    </ul>
    <section v-if="changeShowType == 'food'" class="food-container">
      <section class="menu-container">
        <!--左侧分类列表-->
        <div class="menu-left" id="left_wrapper" ref="wrapperMenu">
          <ul>
            <li v-for="(item, index) in menuList" :key="index" @click="chooseMenu(index)" class="activity_menu">
              {{item.name}}
            </li>
          </ul>
        </div>
        <!--右侧商品详情列表-->
        <div class="menu-right wrapper" ref="menuFoodList">
          <ul id="menuFoodListUl">
            <li v-for="(foodItem, i) in menuList" :key="i" v-bind:id="'shop'+i">
              <h2>{{foodItem.name}} <span>{{foodItem.description}}</span></h2>
              <ul>
                <li class="menu_detail_list" v-for="(food, index) in foodItem.foods" :key="index">
                  <router-link :to="'/foodDetail'" tag="a" class="menu-detail-link">
                    <section class="menu_food_img">
                      <img src="">
                    </section>
                    <section class="menu_food_description">
                      <h3 class="food_description_head">
                        <strong class="description_foodname">{{food.name}}</strong>
                        <ul class="attributes_ul" v-if="food.attributes">
                          <li
                              v-for="(attr, attrIndex) in food.attributes"
                              :class="{attribute_new: attr.icon_name == '新'}"
                              :style="{borderColor: '#' + attr.icon_color, color: '#' + attr.icon_color}"
                              :key="attrIndex"
                          >
                            <p :style="{color: attr.icon_name == '新' ? '#fff' : '#' + attr.icon_color}">
                              {{attr.icon_name == '新' ? '新品' : attr.icon_name}}
                            </p>
                          </li>
                        </ul>

                      </h3>
                      <p class="food_description_content">{{food.description}}</p>
                      <p class="food_description_sale_rating">
                        <span>月售{{food.month_sales}}份</span>
                        <span>好评率{{food.satisfy_rate}}%</span>
                      </p>
                      <p class="food_activity" v-if="food.activity">
                        <span
                          :style="{color: '#' + food.activity.icon_color,
                          borderColor: food.activity.image_text_color}">
                          {{food.activity.image_text}}
                        </span>
                      </p>
                      <div class="menu_detail_footer">
                        <div class="food-price">
                          <span>¥</span>
                          <span>{{food.specfoods[0].price}}</span>
                          <span v-if="food.specifications.length">起</span>
                        </div>
                        <div class="buy-cart">
                          <span class="minus">-</span>
                          <span class="number">1</span>
                          <span class="plus">+</span>
                        </div>
                      </div>
                    </section>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </section>
    <section v-if="changeShowType == 'rating'" class="rate-container">
      <div class="rating-header">
        <div class="rating-header-left">
          <p class="rating-score"><span>4.7</span></p>
          <p class="general-rating"><span>综合评价</span></p>
          <p class="better"><span>高于周边商家76.9%</span></p>
        </div>
        <div class="rating-header-right">
          <div class="attitude">
            <span class="reversice">服务态度</span>
            <span class="rating-num">4.7</span>
          </div>
          <div class="greens">
            <span class="greens-rating">菜品评价</span>
            <span class="rating-num">4.7</span>
          </div>
          <div class="delivery">
            <span class="delivery-time">送达时间</span>
            <span class="time">5分钟</span>
          </div>
        </div>
      </div>
      <div class="rating-list">
        <button type="button">全部(473)</button>
        <button type="button">满意(473)</button>
        <button type="button" class="unsatisfied">不满意(473)</button>
        <button type="button">有图(473)</button>
        <button type="button">味道好(473)</button>
        <button type="button">送货快(473)</button>
        <button type="button">分量足(473)</button>
        <button type="button">包装精美(473)</button>
        <button type="button">干净卫生(473)</button>
        <button type="button">食材新鲜(473)</button>
        <button type="button">服务不错(473)</button>
      </div>
      <ul class="rating-detail-list">
        <li class="rating-detail-item"></li>
      </ul>
    </section>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import {mapState, mapMutations} from 'vuex';
  import {msiteAddress, shopDetails, foodMenu, ratingScores, ratingTags, getRatingList} from '../../service/getData';
  export default {
    data(){
      return {
        geohash: '',  //city页面传过来的地址geohash
        shopId: null, //商铺id
        showLoading: true, //显示加载动画
        changeShowType: 'food', //商品和评价之间的切换
        menuList: [],  //食品列表
        shopDetailData: '', //商铺详情
        ratingList: null, //品论列表
        ratingScoresData: null, //评论总体分数
        ratingTagsList: null, //评论分数列表
        ratingOffset: 0, //评价获取数据offset值
        shopListTop:[], //商品列表的高度集合
        cateListTop: [], //分类列表的高度集合
        menuIndex: 0, //已选菜单列表index，默认0
        foodScroll: null, //食品列表滚动
        menuIndexChange:  true,//解决选中index时，scroll监听事件重复判断设置index的bug
        foodContainerHeight: 0, //食品列表的容器的高度，
        ulHeight: 0,  // 食品列表的实际高度
        maxTop: 0,   //食品列表的top值可以设置的最大高度
      }
    },
    created() {
      this.geohash = this.$route.query.geohash;
      this.shopId = this.$route.query.id;
    },
    mounted(){
      this.initData();
      //this.getFoodListHeight();
    },
    components: {},
    computed: {
      ...mapState['longitude', 'latitude']
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS'
      ]),
      //初始化是获取基本数据
      async initData(){
        if (!this.latitude) {
          //获取位置信息
          let res = await msiteAddress(this.geohash);
          //记录当前经纬度进入vuex
          this.RECORD_ADDRESS(res);
        }
        //获取商铺详情
        this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
        console.log('商铺详情', this.shopDetailData);
        //获取商铺食品列表
        this.menuList = await foodMenu(this.shopId);
        console.log('商铺食品列表', this.menuList);
        //评论列表
        this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
        //商铺评论详情
        this.ratingScoresData = await ratingScores(this.shopId);
        //评论Tag列表
        this.ratingTagsList = await ratingTags(this.shopId);
        this.showLoading = false;
      },

      //获取视频列表的高度，存到shopListTop
      getFoodListHeight(){
          const listContainer = this.$refs.menuFoodList;
          this.foodContainerHeight = listContainer.offsetHeight;
          this.ulHeight = listContainer.children[0].offsetHeight;
          this.maxTop = this.ulHeight - this.foodContainerHeight;
          const listArr = Array.from(listContainer.children[0].children);
          listArr.forEach((item, index) => {
              this.shopListTop[index] = item.offsetTop;
          })
      },
      //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式

      //点击左侧食品列表标题，相应列表移动到最顶层
      chooseMenu(index){
          this.menuIndex = index;
        this.menuIndexChange = false;
        //右侧食品列表的运动
        let ul = document.getElementById("menuFoodListUl");
        let top = this.shopListTop[index];
        if(top <= this.maxTop){
          this.animate(ul, {'top': -top}, {
            speed : 10,
            interval : 30,
            fn:function(){}
          })
        }else{
            console.log('top max');
        }
        //左侧分类的移动
        let leftWrapper = document.getElementById("left_wrapper");
        let leftWrapperHeight = leftWrapper.offsetHeight;
        let leftUlHeight = leftWrapper.children[0].offsetHeight;
        let leftUl = leftWrapper.children[0];
        let liHeight = leftWrapper.children[0].children[0].offsetHeight;
        const listCat = Array.from(leftWrapper.children[0].children);
        listCat.forEach((item, i) => {
          this.cateListTop[i] = item.offsetTop;
        })
        console.log('this.cateListTop', this.cateListTop);
        if(leftUlHeight > leftWrapperHeight){
            console.log(1)
          let top1 = this.cateListTop[index] - leftWrapperHeight/2;
          let maxTop = leftUlHeight - leftWrapperHeight;
            if(top1 > 0 && top1 <= maxTop){
              console.log(2)
              this.animate(leftUl, {'top': -top1});
            }
        }
      },
      animate(ele, json, option) {
        if (!ele && !json) {
          throw new Error("Argument is missing.")
        }
        if(option != undefined && (typeof option != "object" ||  option.constructor != Object)){
          throw new Error("Argument type error.")
        }
    //默认值
    var defaultOption = {
      speed : 3,
      interval : 20,
      //运动完成的回调
      fn:function(){

      },
    }
    option = Object.assign(defaultOption,option);
    //清除元素对象自身计时器
    clearInterval(ele.timer);
    //重新给元素对象绑定计时器
    ele.timer = setInterval(function() {
      var flag = true;
      for (var attr in json) {
        var icurrent = 0;
        if (attr == "opacity") {
          icurrent = Math.round(parseFloat(getComputedStyle(ele, false)[attr]) * 100);
        } else {
            let  style = getComputedStyle(ele, false)[attr];
          icurrent = parseInt(style);
        }
        var ispeed = (json[attr] - icurrent) / option.speed;
        ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
        if (attr == "opacity") {
          //兼容IE
          ele.style.filter = "alpha(opacity:" + (icurrent + ispeed) + ")";
          ele.style.opacity = (icurrent + ispeed) / 100;
        }else {
          ele.style[attr] = icurrent + ispeed + "px";
        }
        //运动未完成
        if (icurrent != json[attr]) flag = false
        //运动完成
        if (flag) {
          clearInterval(ele.timer);
          //执行运动完成的回调函数
          option.fn();
        }
      }
    }, option.interval)
  },

  /*
   * @param   {Element Object}    DOM元素
   * @param   {String}            元素样式属性
   * @return   {String}            元素样式属性值
   */
   getStyle(ele, attr) {
    if(!ele && !attr) {
      throw new Error("Argument is missing.")
    }
    if(typeof ele != "object" || typeof attr != "string"){
      throw new Error("Argument type error.")
    }

    var style;
    if (window.getComputedStyle) {
      style = getComputedStyle(ele, false)[attr];
    } else {
      //兼容IE
      style = ele.currentStyle[attr];
    }
    return style;

  }

  },
    watch: {
      //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
      showLoading: function (value) {
        if (!value) {
          this.$nextTick(() => {
            this.getFoodListHeight();
          })
        }
      },
    }
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
    top:0;
    left:0;
    right:0;
    height:2rem;
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
    display: flex;
    border-bottom: 1px solid #ddd;
    background: #ffffff;
    & > li {
      flex-basis: 50%;
      text-align: center;
      padding: 0.3rem 0 0.7rem;
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

  .food-container{
    display: flex;
    flex:1;
  }
  .menu-container {
    display: flex;
    overflow: hidden;
  }

  .menu-left {
    width:3.8rem;
    ul {
      background: #F5F5F5;
      position: relative;
      top:0;
    }
    li {
      padding: 1rem 0.5rem;
      border-bottom: 1px solid #ccc;
      font-size: 0.6rem;
      color: #666;
      &.active {
        border-left: 0.15rem solid #3190e8;
        background: #ffffff;
      }
    }
  }

  .menu-right {
    background: #ffffff;
    overflow: scroll;
    &>ul{
      position: relative;
      top:0;
    }
    .attributes_ul{
      li{
        position: absolute;
        color: #fff;
        border-radius: 50%;
        padding: 0 0.1rem;
        top: 0;
        right: 0.3rem;
        p{
          font-size:0.3rem;
          color: #ffffff;
        }
      }
      li.attribute_new{
        position: absolute;
        top:0;
        left:0;
        width:2rem;
        height: 2rem;
        background-color: currentColor;
        border-radius: 0;
        transform: rotate(-45deg) translate(0, -1.4rem);
        p{
          position: absolute;
          bottom:0;
          left: 50%;
          margin-left: -0.5rem;
        }
      }
    }

    h2 {
      font-size: 0.7rem;
      color: #666;
      font-weight: bold;
      background: #f5f5f5;
      padding: 0.6rem;
      span {
        font-size: 0.6rem;
        font-weight: normal;
      }
    }
  }

  .menu_detail_list {
    padding: 0.6rem 0.4rem;
    border-bottom: 0.1rem solid #f5f5f5;
    position: relative;
    overflow: hidden;
    .menu-detail-link {
      display: flex;
      .menu_food_img {
        display: block;
        @include wh(2rem, 2rem);
        margin-right: 0.4rem;
        border: 1px solid #ddd;
      }
      .menu_food_description {
        width: 100%;
      }
      .food_description_head {
        h3 {
          @include fsc(0.7rem, #333);
        }
        .food_description_head, .food_description_sale_rating {
          @include fsc(0.5rem, #666);
          margin-top: 0.3rem;
        }
      }
      .food_description_content {
        @include fsc(0.5rem, #999);
        line-height: 0.6rem;
      }
      .food_description_sale_rating {
        line-height: 0.8rem;
        @include fsc(0.5rem, #333);
      }
      .food_activity {
        height: 0.4rem;
        span {
          //color: rgb(241, 136, 79);
          //border-color: rgb(240, 115, 115);
          display: inline-block;
          @include fsc(0.3rem, rgb(241, 136, 79));
          border: 1px solid currentColor;
          border-radius: 0.3rem;
          -webkit-transform: scale(0.8);
          -moz-transform: scale(0.8);
          -ms-transform: scale(0.8);
          -o-transform: scale(0.8);
          transform: scale(0.8);
        }
      }
    }
    .menu_detail_footer {
      margin-top: .6rem;
      display: flex;
      justify-content: space-between;
      .food-price {
        span:nth-of-type(1) {
          @include fsc(0.5rem, #f60);
        }
        span:nth-of-type(2) {
          font-size: 0.7rem;
          color: #f60;
          font-weight: bold;
        }
        span:nth-of-type(3) {
          @include fsc(0.5rem, #666);
        }
      }
      .buy-cart {
        .minus, .number {
          visibility: hidden;
        }
        .plus {
          display: inline-block;
          @include fsc(0.9rem, #fff);
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #3190e8;
          font-weight: bold;
          text-align: center;
          line-height: 1rem;
        }
      }
    }
  }
  .rating-header{
    display: flex;
    flex:1;
    padding-top: 1rem;
    background: #fff;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #ddd;
    &>*{
      flex: 1 1 50%;
    }
    .rating-header-left{
      p{
        text-align: center;
      }
      .rating-score{
        span{
          color: orange;
          font-size: 1rem;
        }
      }
      .general-rating span{
        font-size: 0.7rem;
        color: #666;
      }
      .better span{
        font-size: 0.5rem;
        color: #999;
      }
    }
    .rating-header-right{
      &>div{
        font-size: 0.65rem;
        line-height:1rem;
        &>span:first-child{
          color: #666;
        }
      }
    }
  }
  .rating-list{
    margin-top: 0.7rem;
    background: #ffffff;
    padding: 0.5rem;
    button{
      @include fsc(0.6rem, #666);
      background: #ebf5ff;
      border-radius:0.2rem;
      padding:0.3rem;
      margin:0 0.4rem 0.2rem 0;
      &.unsatisfied{
        background: #F5F5F5;
      }
    }
  }
</style>
