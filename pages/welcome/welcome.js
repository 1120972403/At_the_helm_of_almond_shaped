const app = getApp()
const apiUrl = require('../../config.js').apiUrl
Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
   * 生命周期函数--监听页面加载
   */    
  onLoad: function (options) {
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }, 500)
  },
})