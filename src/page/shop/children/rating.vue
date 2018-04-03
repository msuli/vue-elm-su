<template>
  <div>
    <section class="rate-container">
      <!--综合评分-->
      <div class="rating-header">
        <div class="rating-header-left">
          <p class="rating-score">
            <span v-if="ratingScoresData.order_rating_amount">
              {{(ratingScoresData.order_rating_amount/100).toFixed(1)}}</span>
          </p>
          <p class="general-rating"><span>综合评价</span></p>
          <p class="better">
            <span v-if="ratingScoresData.compare_rating">
              高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%
            </span>
          </p>
        </div>
        <div class="rating-header-right">
          <div class="attitude">
            <span class="reversice">服务态度</span>
            <span class="rating-num" v-if="ratingScoresData.service_score">
              {{ratingScoresData.service_score.toFixed(1)}}
            </span>
          </div>
          <div class="greens">
            <span class="greens-rating">菜品评价</span>
            <span class="rating-num" v-if="ratingScoresData.overall_score">
              {{ratingScoresData.overall_score.toFixed(1)}}
            </span>
          </div>
          <div class="delivery">
            <span class="delivery-time">送达时间</span>
            <span class="time">{{ratingScoresData.deliver_time}}分钟</span>
          </div>
        </div>
      </div>
      <!--综合评价结束-->
      <!--评价分类导航开始-->
      <div class="rating-list">
        <button type="button" v-for="(rateItem, index) in ratingTagsList">{{rateItem.name}}({{rateItem.count}})</button>
      </div>
      <!--评价分类导航结束-->
      <ul class="rating-detail-list">
        <li class="rating-detail-item" v-for="(item, i) in ratingList" :key="i">
          <img class="user-logo"
            src="https://fuss10.elemecdn.com/1/5f/6cf782b0c9cd5ca8daa7f76ab05aejpeg.jpeg">
          <div class="c">
            <p class="username">{{item.username}}</p>
            <p class="rate">{{item.time_spent_desc}}</p>
            <div class="img">
              <img class="food-img"
                src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" alt=""
                   v-for="(l, n) in item.item_ratings">
            </div>
            <div>
              <span  class="ellipsis food-name" v-for="(l, n) in item.item_ratings">{{l.food_name}}</span>
            </div>
          </div>
          <span class="date">{{item.rated_at}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import {ratingTags, getRatingList, ratingScores} from '../../../service/getData';
export default {
    props:['shop'],
    mounted(){
      this.initData();
    },
    data(){
        return {
          ratingTagsList: null, //评论标题列表
          ratingList: [], //评论列表
          ratingScoresData: {}, //评分
          ratingOffset: 0,
        }
    },
  methods:{
      async  initData(){
          //评论Tag列表
          this.ratingTagsList = await ratingTags(this.shop);
          console.log('评论Tag列表', this.ratingTagsList);
        //评论列表
        this.ratingList = await getRatingList(this.shop, this.ratingOffset);
        console.log('this.ratingList', this.ratingList);
        //商铺评论详情
        this.ratingScoresData = await ratingScores(this.shop);
        console.log('this.ratingScoresData', this.ratingScoresData);
        }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../style/mixin';
  .rating-header {
    display: flex;
    flex: 1;
    padding-top: 1rem;
    background: #fff;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #ddd;
    & > * {
      flex: 1 1 50%;
    }
    .rating-header-left {
      p {
        text-align: center;
      }
      .rating-score {
        span {
          color: orange;
          font-size: 1rem;
        }
      }
      .general-rating span {
        font-size: 0.7rem;
        color: #666;
      }
      .better span {
        font-size: 0.5rem;
        color: #999;
      }
    }
    .rating-header-right {
      & > div {
        font-size: 0.65rem;
        line-height: 1rem;
        & > span:first-child {
          color: #666;
        }
      }
    }
  }
  .rating-list {
    margin-top: 0.7rem;
    background: #ffffff;
    padding: 0.5rem;
    button {
      @include fsc(0.6rem, #666);
      background: #ebf5ff;
      border-radius: 0.2rem;
      padding: 0.3rem;
      margin: 0 0.4rem 0.2rem 0;
      &.unsatisfied {
        background: #F5F5F5;
      }
    }
  }
  .rating-detail-list{
    background: #ffffff;
    padding: 0.5rem;
    .rating-detail-item{
      display: flex;
      border-top: 0.05rem solid #ddd;
      padding: 0.5rem 0;
    }
    .user-logo{
      width: 35px;
      height: 35px;
      border-radius:50%;
    }
    .food-img{
      display: inline-block;
      width: 3rem;
      height: 3rem;
      margin-right: 0.5rem;
    }
    .food-name{
      font-size: 0.6rem;
      color: #666;
      display: inline-block;
      width: 3rem;
      border: 0.05rem solid #ddd;
      padding: 0 0.3rem;
      margin-right: 0.5rem;
    }
    .c{
      flex: 1 0 45%;
      box-sizing: border-box;
      padding-left: 0.5rem;
    }
  }
</style>
