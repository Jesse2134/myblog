const mongoose = require('mongoose');

// 初始化数据结构模型并导出
module.exports = new mongoose.Schema({
  username: string,
  password: string
});