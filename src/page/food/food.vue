<template>
  <div>1234</div>
</template>
<script>
  export default {
    data(){
      return {
        geohash: '',  //city页面传过来的地址geohash
        headerTitle: '', //msite页面头部标题
        foodTitle: '',  //排序头部左侧标题
        restaurant_category_id: '', //食品类型id
        restaurant_category_ids: '',//筛选类型的ID值
        sortBy: '', //筛选的条件
        category: null,//分类左侧数据
        categoryDetail: null,//分类右侧的详细数据
        sortByType: '',//根据何种方式排序
        delivery: null,//配送方式数据
        activity: null,//商家支持活动数据
        deliveryMode: null,//选中的配送方式
        supportIds: [],//选中的商铺活动列表
        filterNum: 0,//所选中的所有样式的集合
        confirmStatus: false  //确认选择
      }
    }
  }
</script>
