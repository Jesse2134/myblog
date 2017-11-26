import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/layout/home';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    redirect: '/dashboard',
    component: Home,
    icon: '',
    children: [{
      path: 'dashboard',
      component: Home,
    }],
  }],
});
