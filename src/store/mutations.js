import {RECORD_ADDRESS, SAVE_GEOHASH, CLEAR_CART, ADD_CART, REDUCE_CART, INIT_BUYCART} from './mutation-types';
import {setStore, getStore} from '../config/mUtile';
export default {
  //记录当前经度和纬度
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  //保存geohash
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
  [ADD_CART](state, obj){
    let cartList = [...state.cartList];
    let flag = false;
    cartList.forEach((item, index) => {
      if(item.foodId === obj.foodId){
        item.num++;
        flag = true;
      }
    })
    if(!flag){
      cartList.push(obj)

    }
    state.cartList = [...cartList];
    setStore('cartList', state.cartList);
  },
  [REDUCE_CART](state, obj){
    let cartList = state.cartList;
    cartList.forEach((item, index) => {
      if(item.itemId == obj.itemId && item.categoryId == obj.categoryId && item.foodId == obj.foodId){
        if(item.num >= 1){
          item.num--;
        }
      }
    })
    state.cartList = [...cartList];
    console.log('cartList', state.cartList)
    setStore('cartList', state.cartList);
  },
  [CLEAR_CART](state){
    state.cartList = [];
    setStore('cartList', state.cartList);
  },
  //网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = getStore('cartList');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
}
