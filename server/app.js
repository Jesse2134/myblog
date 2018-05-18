/**
 * app.js 应用启动入口
 */
// 加载express模块
const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
// 加载body-parser 解析请求数据
const bodyParser = require('body-parser');
//创建app应用
const app = express();
const Blog = require('./config/blog');

// 静态文件托管
app.use('/public', express.static(__dirname + '/public'));
// bodyParser 配置
app.use(bodyParser.urlencoded({extended: true}));

// 分模块路由
// 移动或者前端路由
app.use('/api', require('./routers/api'))

// 监听http请求 /Users/jesse/Workspaces/MyBlog/myblog/server/db
mongoose.Promise = bluebird;
mongoose.connect(Blog.db.url, {
  useMongoClient: true
}, function (err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功！');
    app.listen(Blog.website.port, function () {
      console.log('server start at ' + Blog.website.port);
    });
  }
});