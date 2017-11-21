import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => {
  require.ensure(['../page/home/Home.vue'], ()=>{
    resolve(require('../page/home/Home.vue'));
  })
};

const Login = resolve => {
  require.ensure(['../page/login/Login.vue'], ()=>{
    resolve(require('../page/login/Login.vue'));
  })
};


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Home},
    {path: '/login', component: Login}
  ]
})
