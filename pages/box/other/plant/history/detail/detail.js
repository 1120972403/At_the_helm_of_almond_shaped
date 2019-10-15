// pages/box/other/plant/history/detail/detail.js
const app = getApp()
const apiUrl = require('../../../../../../config.js').apiUrl
const url = require('../../../../../../config.js').imgUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    that.setData({
      id: options.id
    })
    wx.request({
      url: apiUrl +'plant/hisdetail?id='+options.id,
      success: (res) => {
        var data = res.data.data
        var imgUrl = data.imgUrl.replace(/..\/public/gi, url)
        that.setData({
          detail: data,
          imgUrl: imgUrl
        })
        console.log(res.data.data)
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
  onShareAppMessage: function (res) {
    return {
      title: '“执掌杏林”--识别结果分享！',
      path: '/pages/box/other/plant/history/detail/detail?id=' + this.data.id,

      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }
})