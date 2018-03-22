import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import action from './action';

Vue.use(Vuex);

 const state = {
  latitude: '',  //当前位置纬度
  longitude: '',   //当前位置经度
  geohash: 'wtw3sm0q087',//地址geohash值,用一个字符串表示经度和纬度两个坐标
}
export default new Vuex.Store({
  state, mutations, action
})
