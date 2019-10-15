// pages/box/swiperlist/swiperlist.js
const apiUrl = require('../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url: apiUrl + 'box_news/newslist?id=' + options.id,
      method: "get",
      success:(res)=> {
        console.log(res.data)
        var html = res.data.data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
        this.setData({
          html: html,
          title: res.data.data.title,
          date: res.data.data.create_time
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