const app = getApp()
const apiUrl = require('../../config.js').apiUrl
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgs: [
      "https://cdn.nlark.com/yuque/0/2019/png/223589/1551628180485-assets/web-upload/1431efa1-478c-4ea6-bd13-ab08e581cb57.png?x-oss-process=image/resize,w_275",
      "https://cdn.nlark.com/yuque/0/2019/jpeg/280373/1564724418389-assets/web-upload/c727b73d-67be-41c0-a369-d7636b3dcd01.jpeg?x-oss-process=image/resize,w_275",
      "http://img.kaiyanapp.com/64f96635ddc425e3be237b5f70374d87.jpeg?imageMogr2/quality/60",
    ],
  },
  bindGetUserInfo(e) {
    var that = this
    var nickName = "";
    var avatarUrl = "";
    var gender = "";
    var province = "";
    var city = "";
    var country = ""
    //获取用户信息
    wx.getUserInfo({
      // 此处有bug可能一个先取值，导致传到数据库为空
      success: function(res) {
        wx.setStorageSync('isFirst', res.userInfo);
        nickName = res.userInfo.nickName;
        avatarUrl = res.userInfo.avatarUrl,
        gender = res.userInfo.gender,
        city = res.userInfo.city,
        province = res.userInfo.province,
        country = res.userInfo.country
      }
    })

    wx.login({
      success(res) {
        wx.request({
          url: apiUrl + 'login/login',
          method: 'post',
          data: {
            code: res.code,
            nickName: nickName,
            avatarUrl: avatarUrl,
            gender: gender,
            province:province,
            city: city,
            country: country,
          },
          success: function(s) {
            console.log("返回来的值", s.data)
            if (s.data.code == 200) {

              wx.setStorageSync('token', s.data.data);
              wx.navigateTo({
                url: '/pages/home/home'
              })
            } else {
              console.log("登录失败");
              return;
            }
          }
        })
      }
    })

  },

})