import fetch from '../config/fetch';

//获取首页默认地址
export const cityGuess =
  () =>
    fetch('/v1/cities', {
      type: 'guess'
    });

//获取热门城市
export const hotCities = () =>
  fetch('/v1/cities', {
    type: 'hot'
  });


//获取首页所有城市
export const cityGroup = () =>
  fetch('/v1/cities', {
    type: 'group'
  });

//获取图片验证码
export const getCaptcha = ()=> fetch('/v1/captchas', {}, 'POST');

/**
 *  获取当前定位城市
 * */
export const currentCity = number => fetch('/v1/cities/' + number);

//获取搜索历史
export const searchHistory = (cityId, value) => fetch('/v1/pois',{
    type: 'search',
    city_id: cityId,
    keyword: value
})

/**
 * 获取msitee页面地址信息
 */
export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 */
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
});

/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return fetch('/shopping/restaurants', data);
}

/**
 * 获取food页面的种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
  latitude,
  longitude
});

/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
  latitude,
  longitude,
  kw: ''
});
/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
  latitude,
  longitude,
  kw: ''
});

/**
 * 获取shop页面商铺详情
 */
export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
  latitude,
  longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});

/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
  restaurant_id
});

/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
  has_content: true,
  offset,
  limit: 10,
  tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');


/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');



