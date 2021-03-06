import Vue from 'vue'
import Router from 'vue-router'

const Home = r => {
  require.ensure(['../page/home/home'], ()=>{
    r(require('../page/home/Home'));
  })
};

const login = resolve => {
  require.ensure(['../page/login/login'], ()=>{
    resolve(require('../page/login/login'));
  })
};

const city = resolve => {
  require.ensure([], ()=>{
    resolve(require('../page/city/city'));
  })
};

const Msite = resolve => {
  require.ensure([], () => {
    resolve(require('../page/msite/msite'));
  })
}

Vue.use(Router)

export default[{
  path: '/',
  component: 'App', //顶层路由，对应index.html
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
      path: '/city/:cityId',
      component: City
    },
    //所有商铺列表页
    {
      path: '/msite',
      component: msite,
      meta: { keepAlive: true },
    },
  ]
}]
