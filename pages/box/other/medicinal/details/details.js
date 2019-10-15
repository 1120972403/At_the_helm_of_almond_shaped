// pages/box/other/medicinal/details/details.js
const apiUrl = require('../../../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: apiUrl+'/medicinal/details',
      method:'post',
      data: {
        id: options.id
      },

      success: function (res) {
        console.log(res.data.data),
          that.setData({
          detail: res.data.data,
          })
        setTimeout(function () {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})