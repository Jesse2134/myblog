const mongoose = require('mongoose');

// 初始化数据结构模型并导出
// User 用户
module.exports = new mongoose.Schema({
    username: String, // 用户名
    password: String, // 密码
    token: String, // token
    role: Object, // 角色
    nickname: String, // 昵称
    mobile: String, // 手机号
    email: String, // 邮箱账号
    cnname: String, // 中文名
    usname: String, // 英文名
    avatar: String, // 头像
    gallery: String, //图集
    content: String, // 宣传册
    createdAt: Date, // 注册时间
    createdBy: String, // 创建人
    updatedAt: Date, // 更新时间
    updatedBy: String,// 修改人
    status: Boolean // 状态
});
