//小程序配置文件

var apiUrl ="xxxxx"  //这里填你的地址
var imgUrl = "xxxxx"  //这里填你的地址
var config = {
  apiUrl,
  imgUrl
};


//统一规定 小程序端上传图片等一律加上上传的域名
//服务器端统一不加
module.exports = config
