import App from '../App';
import Vue from 'vue'
import Router from 'vue-router'

const home = r => {
  require.ensure(['../page/home/home'], ()=>{
    r(require('../page/home/home'));
  })
};

const login = resolve => {
  require.ensure(['../page/login/login'], ()=>{
    resolve(require('../page/login/login'));
  })
};

const city = resolve => {
  require.ensure(['../page/city/city'], ()=>{
    resolve(require('../page/city/city'));
  })
};

const msite = resolve => {
  require.ensure(['../page/msite/msite'], () => {
    resolve(require('../page/msite/msite'));
  })
};
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')

Vue.use(Router)

export default[{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [
    {
      path: '',
      redirect: '/home'
    },
    //首页城市列表页
    {
      path: '/home',
      component: home
    },
    {
      path: '/login',
      component: login
    },
    //当前选择城市页
    {
      path: '/city/:cityid',
      component: city
    },
    //所有商铺列表页
    {
      path: '/msite',
      component: msite,
      meta: { keepAlive: true },
    },
    //特色商铺列表
    {
      path: '/food',
      component: food,
    },
  ]
}]
