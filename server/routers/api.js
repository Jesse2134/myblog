const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const resultRes = require('./../utils/response');
const User = require('./../models/User');
/*
 * register 用户注册
 */
router.post('/user/register', function (req, res, next) {
  const {
    username,
    password,
    repassword
  } = req.body;
  if (!username || !password || !repassword) {
    return res.json(resultRes.err(400, '缺少必要参数或参数值为空'));
  }
  if (password !== repassword) {
    return res.json(resultRes.err(400, '两次输入的密码不一致'));
  }
  // 检查用户名是否已经注册
  User.findOne({
    username: username
  }).then(user => {
    if (user) {
      return res.json(resultRes.err(400, '用户名已注册'));
    }
    let newUser = new User({
      username: username,
      password: md5.update(password).digest('base64')
    });
    newUser.save().then(user => {
      return res.json(resultRes.data('注册成功', user));
    });
  })
});

module.exports = router;