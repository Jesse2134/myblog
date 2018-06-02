const express = require('express');
const router = express.Router();
const passport = require('passport');

const resultRes = require('./../utils/response');
const Blog = require('../config/blog');
const Resume = require('./../models/Resume');

router.get('/info', passport.authenticate('bearer', {session: false}), function (req, res) {
    console.log(req);
    res.json({username: req.user.username});
});

router.post('/info', passport.authenticate('bearer', {session: false}), function (req, res) {
    console.log(res);
    res.json({username: req.user.username});
});

module.exports = router;
