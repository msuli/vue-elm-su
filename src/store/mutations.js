import {RECORD_ADDRESS, SAVE_GEOHASH } from './mutation-types';
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

  }
}
