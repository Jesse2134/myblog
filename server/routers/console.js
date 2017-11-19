const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
  res.json({
    code: 200,
    message: '我是管理端'
  });
});

module.exports = router;