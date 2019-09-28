// pages/look/getJob/msgarticle/msgarticle.js
const app = getApp()
const apiUrl = require('../../../../config.js').apiUrl
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
    var id = options.id
    var that = this
    wx.request({
      url: apiUrl + 'get_job/getdetail?id=' + id,
      method: 'get',
      success: function (res) {
        console.log('详细', res.data.data[0].article_content)
        var res = res.data.data[0]
        var html = res.article_content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ').replace(/\/Upload/gi, "http://www.cdutcm.edu.cn/Upload").replace(/line-height: 2.5/gi, 'line-height: 150%').replace(/font-size: 18px/gi, 'font-size: 14px')
        that.setData({
          title: res.article_title,
          date:res.article_date,
          html: html
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