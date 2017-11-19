const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
        code: 200,
        message: '我是首页'
      });
});

module.exports = router;