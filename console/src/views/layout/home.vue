<template>
  <el-row class="container">
      <el-col :span="24" class="header">
          <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
              {{collapsed?'ZZ':sysUserName}}
          </el-col>
          <el-col :span="10">
              <div class="tools" @click="collapsed = !collapsed">
                  <i class="fa fa-align-justify"></i>
              </div>
          </el-col>
          <el-col :span="4" class="userinfo">
              <el-dropdown trigger="hover">
                  <span class="el-dropdown-link userinfo-inner">
                      <img :src="this.sysUserAvatar"> {{sysUserName}}</span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>{{button.mymsg}}</el-dropdown-item>
                      <el-dropdown-item>{{button.setting}}</el-dropdown-item>
                      <el-dropdown-item divided @click.native="logout">{{button.logout}}</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </el-col>
      </el-col>
      <el-col :span="24" class="main">
          <!-- <aside>
              <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="collapsed"
                  router unique-opened>
                  <div v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden">
                      <el-submenu :index="index+''">
                          <template slot="title">
                              <i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>
                          </template>
                          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                             <span slot="title">{{child.name}}</span>
                          </el-menu-item>
                      </el-submenu>
                      <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                          <i :class="item.iconCls"></i>{{item.children[0].name}}
                      </el-menu-item>
                  </div>
              </el-menu>
          </aside> -->
           <!-- 导航菜单-->
          <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
              <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
                  unique-opened router v-show="!collapsed">
                  <div v-for="(item,index) in $router.options.routes" :key="index" v-if="!item.hidden">
                      <el-submenu :index="index+''" v-if="!item.leaf">
                          <template slot="title">
                              <i :class="item.iconCls"></i>{{item.name}}</template>
                          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                              {{child.name}}
                          </el-menu-item>
                      </el-submenu>
                      <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                          <i :class="item.iconCls"></i>{{item.children[0].name}}
                      </el-menu-item>
                  </div>
              </el-menu>
              <!--导航菜单-折叠后-->
              <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                  <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :key="index" class="el-submenu item">
                      <template v-if="!item.leaf">
                          <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                              <i :class="item.iconCls"></i>
                          </div>
                          <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                              <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;"
                                  :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                          </ul>
                      </template>
                      <template v-else>
                          <li class="el-submenu">
                              <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''"
                                  @click="$router.push(item.children[0].path)">
                                  <i :class="item.iconCls"></i>
                              </div>
                          </li>
                      </template>
                  </li>
              </ul>
          </aside>  
          <section class="content-container">
              <div class="grid-content bg-purple-light">
                  <el-col :span="24" class="breadcrumb-container">
                      <strong class="title">{{$route.name}}</strong>
                      <el-breadcrumb separator="/" class="breadcrumb-inner">
                          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                              {{ item.name }}
                          </el-breadcrumb-item>
                      </el-breadcrumb>
                  </el-col>
                  <el-col :span="24" class="content-wrapper">
                      <transition name="fade" mode="out-in">
                          <router-view></router-view>
                      </transition>
                  </el-col>
              </div>
          </section>
      </el-col>
      <!--<el-col :span="24" class="footer">-->
      <!--<div>-->
      <!--<p>-->
      <!--版权所有-->
      <!--</p>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--重新登录-->
      <el-col>
          <el-dialog title="" v-model="$root.reLoginFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
              size="tiny">
              <el-form class="reLogin-container" :model="reLoginForm" ref="reLoginForm" label-position="left">
                  <h3 class="title">{{label.adminLogin}}</h3>
                  <el-form-item prop="User.userName" :rules="[{ required: true, message: rules.NotNull, trigger: 'blur'}]">
                      <el-input type="text" v-model="reLoginForm.User.userName" auto-complete="off" placeholder="账号"></el-input>
                  </el-form-item>
                  <el-form-item prop="User.password" :rules="[{ required: true, message: rules.NotNull, trigger: 'blur'}]">
                      <el-input type="password" v-model="reLoginForm.User.password" auto-complete="off" placeholder="密码"></el-input>
                  </el-form-item>
                  <el-checkbox v-model="checked" checked class="remember">{{button.rememberPwd}}</el-checkbox>
                  <el-form-item style="width:100%;">
                      <el-button type="primary" style="width:60%;" @click.native.prevent="handleLoginSubmit" :loading="logining">{{button.login}}
                      </el-button>
                      <el-button type="default" style="width:30%;" @click.native.prevent="handleReset">{{button.reset}}</el-button>
                  </el-form-item>
              </el-form>
          </el-dialog>
      </el-col>
  </el-row>
</template>

<script>
  // import {
  //     isLogin,
  //     login,
  //     logout
  // } from '../../services/api'
  export default {
      data() {
          return {
              collapsed: false,
              label: this.ZZ.config.Label,
              rules: this.ZZ.config.Rules,
              button: this.ZZ.config.Button,
              message: this.ZZ.config.Message,
              notify: this.ZZ.config.Notify,
              sysUserName: '',
              sysUserAvatar: '',
              logining: false,
              isOpenMenu: true,
              menuItems: [],
              reLoginForm: {
                  User: {
                      userName: 'admin',
                      password: 'admin',
                  }
              },
              checked: true
          }
      },
      methods: {
          // 折叠导航栏
          collapse: function () {
              this.collapsed = !this.collapsed;
          },
          handleopen() {

          },
          handleclose() {

          },
          showMenu(i, status) {
              this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ?
                  'block' : 'none';
          },
          openMenu(e) {
              this.isOpenMenu = e
          },
          onSubmit() {},
          handleselect(a, b) {
          },
          handleReset() {
              this.$refs.reLoginForm.resetFields();
          },
          handleLoginSubmit(ev) {
              const self = this;
              const root = self.$root;
              self.$refs.reLoginForm.validate((valid) => {
                  if (valid) {
                      let arg = {
                          userType: 'tsadmin',
                          params: {
                              username: self.reLoginForm.User.userName,
                              password: self.reLoginForm.User.password
                          }
                      };
                      self.logining = true;
                      login(arg).then(res => {
                          if (root.handleApiRes(res)) {
                              self.token = res.result.token;
                              if (self.token) {
                                  root.resultRes(self.notify.LoginSuccess);
                                  sessionStorage.setItem('token', JSON.stringify(self.token));
                                  sessionStorage.setItem('user', JSON.stringify(res.result));
                                  root.reLoginFormVisible = false;
                                  // // TODO 处理 /:id等跳转问题
                                  // let redirect = decodeURIComponent(self.$route.query.redirect);
                                  // if(redirect === '/') {
                                  //     self.$router.replace('/')
                                  // } else {
                                  //     self.$router.push({ path: redirect });
                                  // }
                              }
                          }
                          self.logining = false;
                      }).catch((e) => {
                          root.handleApiCatch(e);
                          self.logining = false;
                      });
                  }
              });
          },

          //退出登录
          logout() {
              const self = this;
              const root = self.$root;
              this.$confirm('确认退出吗?', '系统提示', {
                  type: 'info'
              }).then(() => {
                  let arg = {
                      userType: 'tsadmin'
                  };
                  logout(arg).then((res) => {
                      if (root.handleApiRes(res)) {
                          sessionStorage.removeItem('user');
                          sessionStorage.removeItem('token');
                          self.$router.push({
                              path: '/admin/login'
                          });
                      }
                  }).catch((e) => {
                      root.handleApiCatch(e);
                  });
              })
          }
      },
      created() {
          const self = this;
          const root = self.$root;
          isLogin().then((res) => {
              if (res.result.errcode === 8002 || res.result.errcode === 40001) {
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('user');
                  root.resultRes(self.notify.AuthError);
                  root.reLoginFormVisible = true;
              }
          })
      },
      mounted() {
          let user;
          if (sessionStorage.getItem('user')) {
              user = JSON.parse(sessionStorage.getItem('user'));
          }
          if (user.userName) {
              this.sysUserName = user.userName.length > 0 ? user.userName : '管理员';
          } else {
              this.sysUserName = '管理员';
          }
          if (user.avatar) {
              this.sysUserAvatar = user.avatar.length > 0 ? user.avatar : './static/logo.png';
          } else {
              this.sysUserAvatar = './static/logo.png';
          }
      }
  }
</script>

