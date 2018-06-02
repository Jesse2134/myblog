const mongoose = require('mongoose');

// 初始化数据结构模型并导出
// resume 简历
module.exports = new mongoose.Schema({
    userId: String,// 所属用户
    name: String, // 名称
    avatar: String, // 主图
    gallery: String, //图集
    content: Object, // 内容
    createdAt: Date, // 注册时间
    createdBy: String, // 创建人
    updatedAt: Date, // 更新时间
    updatedBy: String,// 修改人
    status: Boolean // 状态
});
