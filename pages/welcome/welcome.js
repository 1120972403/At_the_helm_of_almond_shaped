const app = getApp()
const apiUrl = require('../../config.js').apiUrl
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isFir = wx.getStorageSync('isFirst');
    if (isFir == undefined || isFir == ''){
      //如果检测到还没登录需要登录再进入
      this.setData({
        isFir: false
      })
    }
    else{
      //如果检测到已经登录过了，影藏登录按钮，直接延时1秒跳转
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/home/home',
        })
      }, 1000)
      this.setData({
        isFir: true
      })
    }
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo)
      wx.setStorageSync('isFirst', e.detail.userInfo);
      wx.login({
        success: (res) => {
          wx.request({
            url: apiUrl + 'login/login',
            method: 'post',
            data: {
              code: res.code,
              userInfo: e.detail.userInfo,
            },
            success: function (s) {
              console.log("返回来的值", s.data)
              if (s.data.code == 200) {

                wx.setStorageSync('token', s.data.data);
                wx.reLaunch({
                  url: '/pages/home/home'
                })
              } else {
                console.log("登录失败");
                return;
              }
            },
          })
        },
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
})