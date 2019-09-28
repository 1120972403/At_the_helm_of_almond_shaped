//小程序配置文件

// var apiUrl = "http://wx.jingyiban.cn/index.php/api/"
var apiUrl ="http://admin.cn/index.php/api/"
var url = "http://admin.cn/"
var config = {
  apiUrl,
  url
};


//统一规定 小程序端上传图片等一律加上上传的域名
//服务器端统一不加
module.exports = config