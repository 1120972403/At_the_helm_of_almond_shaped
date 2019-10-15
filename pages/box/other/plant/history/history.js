// pages/box/other/plant/history/history.js
const app = getApp()
const apiUrl = require('../../../../../config.js').apiUrl
const imgUrl = require('../../../../../config.js').imgUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  gotoinfo:function (a) {
    var t = a.currentTarget.dataset.infoid;
    wx.navigateTo({
      url: "./detail/detail?id=" + t,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    wx.request({
      url: apiUrl +'plant/history',
      method:"get",
      success:(res)=>{
        console.log(res.data.data)
        var data = res.data.data
        data.forEach(function (value, index, list) {
          list[index].imgUrl = list[index].imgUrl.replace(/..\/public\//gi, imgUrl); 
        });
        console.log(data)
        that.setData({
          list: data
        })
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