const express = require('express');
const router = express.Router();
const md5 = require('./../utils/md5');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./../utils/passport')(passport);

const resultRes = require('./../utils/response');
const Blog = require('../config/blog');
const User = require('./../models/User');

/**
 * register 用户注册
 */
router.post('/register', function (req, res, next) {
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
            token: '',
            password: md5(md5(password).substr(4, 7) + md5(password))
        });
        newUser.save().then(user => {
            let localUser = {
                id: user.id,
                username: user.username
            };
            return res.json(resultRes.data('注册成功', localUser));
        });
    })
});


/**
 * login 用户登录
 */
router.post('/login', function (req, res, next) {
    let {
        username,
        password
    } = req.body;
    if (!username || !password) {
        return res.json(resultRes.err(400, '缺少必要参数或参数值为空'));
    }
    // 检查用户名是否已经注册
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            password = md5(md5(password).substr(4, 7) + md5(password));
            if (user.password !== password) {
                return res.json(resultRes.err(400, '用户名或密码错误'));
            } else {
                let token = jwt.sign({name: user.name}, Blog.website.secret, {
                    expiresIn: 10080
                });

                let query = {name: user.name};
                User.update(query, {$set: {token: token}}, {}, function () {
                    let localUser = {
                        id: user.id,
                        username: user.username,
                        token: Blog.website.Bearer + token
                    };
                    return res.json(resultRes.data('登录成功', localUser));
                });

            }
        } else {
            return res.json(resultRes.err('400', '用户名不存在'));
        }
    })
});


/**
 * updateById 更新用户信息
 username: String, // 用户名
 nickname: String, // 昵称
 mobile : String, // 手机号
 email : String , // 邮箱账号
 cnname: String, // 中文名
 usname: String, // 英文名
 */
router.put('/info', function (req, res, next) {
    const {username, nickname, mobile, email, cnname, usname} = req.body;
    // 检查用户名是否已经注册
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            password = md5(md5(password).substr(4, 7) + md5(password));
            if (user.password !== password) {
                return res.json(resultRes.err(400, '用户名或密码错误'));
            } else {

                let token = jwt.sign({name: user.name}, Blog.website.secret, {
                    expiresIn: 10080
                });

                let query = {name: user.name};
                User.update(query, {$set: {token: token}}, {}, function () {
                    let localUser = {
                        id: user.id,
                        username: user.username,
                        token: Blog.website.Bearer + token
                    };
                    return res.json(resultRes.data('登录成功', localUser));
                });

            }
        } else {
            return res.json(resultRes.err('400', '用户名不存在'));
        }
    })
});

router.get('/info', passport.authenticate('bearer', {session: false}), function (req, res) {
    console.log(req);
    res.json({username: req.user.username});
});


module.exports = router;
