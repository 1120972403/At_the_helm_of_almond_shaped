// pages/box/other/plant/flower/flower.js
const imgUrl = require('../../../../../config.js').imgUrl

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: -40,
    flowerBoxTop: "700rpx",
  },
  currentChange: function(t) {
    
    var e = t.detail;
    this.setData({
      scrollTop: -40,
    });
  },
  back(){
    wx.navigateTo({
      url: '/pages/box/other/plant/plant',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var xx = JSON.parse(options.result)
    // var xx = JSON.parse(result);

    var img = xx.data.img.replace(/..\/public/gi, imgUrl)
    console.log(img)
    that.setData({
      list: xx.data.list.result,
      img: img
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})