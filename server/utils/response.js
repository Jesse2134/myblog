const resultRes = {
  err: function (code, msg) {
    return {
      code: code,
      msg: msg
    }
  },
  data: function (msg, obj) {
    return {
      code: 200,
      msg: msg,
      data: obj
    }
  },
}
module.exports = resultRes;