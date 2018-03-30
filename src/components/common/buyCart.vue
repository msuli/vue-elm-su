<template>
  <div class="cart-module">
    <div class="cart-buttons" v-if="!food.specifications.length">
      <span class="minus" v-if="foodNum" @click="removeOutCart(food)"></span>
      <span class="carts-num" v-if="foodNum">{{foodNum}}</span>
      <span class="plus" @touchstart="addToCart(shopId, food)">+</span>
    </div>
    <div class="choose-specification" v-else>
      <span class="minus" v-if="foodNum" @click="reduceSpec"></span>
      <span class="carts-num" v-if="foodNum">{{foodNum}}</span>
      <span class="specification" @click="clickSpecification(food)">选规格</span>
    </div>
    <transition name="fade">
      <p class="tips" v-if= notReduce>多规格商品，只能去购物车删除</p>
    </transition>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex';
  export default{
    props: ['food', 'shopId'],
    data(){
      return {
        showSpecification: false,
        notReduce: false, //多规格商品，只能去购物车删除的显示与隐藏
      }
    },
    computed: {
      ...mapState([
          'cartList'
        ]),
      shopCart(){
        return this.cartList;
      },
      //shopCart变化的时候重新计算当前商品的数量
      foodNum(){
        let num = 0;
        let food={...this.food}
        let categoryId = food.category_id;
        let itemId = food.item_id;
        //console.log('123', this.cartList);
        let shopCart = [...this.shopCart];
       shopCart.forEach((item, index) => {
           if(item.categoryId == categoryId && item.itemId == itemId){
               num += item.num;
           }
        })
        return num;
      }
    },
    methods:{
      ...mapMutations([
          'ADD_CART', 'REDUCE_CART'
      ]),
      addToCart(shopId, obj){
        obj.shopId = shopId;
          console.log('food', obj);
          let addFood = {
            shopId: obj.shopId,
            num : 1,
            id : obj.specfoods[0].food_id,
            name : obj.specfoods[0].name,
            price : obj.specfoods[0].price,
            specs : obj.specfoods[0].specs,
            packing_fee : obj.specfoods[0].packing_fee,
            sku_id : obj.specfoods[0].sku_id,
            stock: obj.specfoods[0].stock,
            categoryId: obj.category_id,
            itemId: obj.item_id,
            foodId: obj.specfoods[0].food_id
          };

        this.ADD_CART(addFood);
      },
      removeOutCart(food){
        let obj = {};
        obj.itemId = this.food.item_id;
        obj.categoryId = this.food.category_id;
        obj.foodId = this.food.specfoods[0].food_id;
        obj.shopId = this.shopId;
        this.REDUCE_CART(obj);
      },
      clickSpecification(food){
          console.log(123, food);
          this.$emit('showSpec', food);
      },
      reduceSpec(){
          console.log('多规格商品，只能去购物车删除');
          this.notReduce = true;
          setTimeout(()=>{
            this.notReduce = false;
          }, 2000)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cart-module {
    .cart-buttons, .choose-specification {
      display: flex;
      align-items: center;
    }
    span {
      margin-right: 0.5rem;
      color: #666;
      &.minus, &.plus {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 0.05rem solid currentColor;
        border-radius: 50%;
        position: relative;
        box-sizing: border-box;
        color: #3190e8;
      }
      &.plus:after, &.plus:before, &.minus:after {
        content: '';
        display: block;
        position: absolute;
        background: #fff;
        top: 50%;
        left: 50%;
      }
      &.minus:after {
        width: 0.45rem;
        height: 0.08rem;
        background: currentColor;
        margin-top: -0.04rem;
        margin-left: -0.225rem;
      }

      &.plus {
        background: #3190e8;
        &:after {
          width: 0.5rem;
          height: 0.08rem;
          margin-top: -0.04rem;
          margin-left: -0.25rem;
        }
        &:before {
          height: 0.5rem;
          width: 0.08rem;
          margin-left: -0.04rem;
          margin-top: -0.25rem;
        }
      }
    }
    .choose-specification {
      span.minus {
        color: #999;
      }
      .specification {
        border: 0.05rem solid #3190e8;
        color: #fff;
        background: #3190e8;
        border-radius: 0.2rem;
        padding: 0.1rem 0.2rem;
        font-size: 0.5rem;
      }
    }
    .tips{
      position: fixed;
      width:75%;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%);
      background: #000;
      color: #ffffff;
      font-size:0.8rem;
      padding:0.4rem;
      border-radius:0.2rem;
      z-index: 1;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }

</style>
