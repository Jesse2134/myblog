/**
 * app.js 应用启动入口
 */
// 加载express模块
const express = require('express');
//创建app应用
const app = express();
const Blog = require('./config/blog');

// 静态文件托管
app.use('/public', express.static(__dirname + '/public'));

// 分模块路由
// 管理端路由
app.use('/api/console', require('./routers/console'));
// 移动或者前端路由
app.use('/api/views', require('./routers/views'))

// 监听http请求
const port = Blog.website.port;
app.listen(port, function () {
  console.log('server start at ' + port);
});