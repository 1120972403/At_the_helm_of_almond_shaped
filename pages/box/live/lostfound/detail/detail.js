// pages/box/live/lostfound/detail/detail.js
const app = getApp()
const apiUrl = require('../../../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    lostfoundDetail:[],
    swiperList: [],
  },
  //打电话
  call(e) {
    // console.log(e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var id = options.id
    var that = this
    wx.request({
      // url: apiUrl + 'lost_found/lostfoundDetail?id=' + id,
      url: apiUrl + "lost_found/lostfoundDetail?id=" + id,
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'get',
      success: function (res) {
        console.log("照片", res.data.data.imgs)
        console.log('详细', res.data.data.lostfoundDetail)
        // var imgs = res.data.data.imgs.replace(/..\/public/gi, 'http://wx.jingyiban.cn')
        that.setData({
          lostfoundDetail: res.data.data.lostfoundDetail,
          imgs: res.data.data.imgs
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