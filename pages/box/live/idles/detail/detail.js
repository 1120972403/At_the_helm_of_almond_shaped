// pages/box/live/idles/detail/detail.js
const app = getApp()
const apiUrl = require('../../../../../config.js').apiUrl
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    idlesDetail: []
  },
  //查看大图
  previewImage: function (e) {
    console.log(e)
    var src = e.target.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接  
      urls: [src] // 需要预览的图片http链接列表  
    })
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
  onLoad: function(options) {
    var id = options.id
    var that = this
    wx.request({
      url: apiUrl + 'box_Idles/idlesDetail?id=' + id,
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'get',
      success: function(res) {
        console.log('详细', res.data.data.idlesDetail)
        that.setData({
          idlesDetail: res.data.data.idlesDetail
        })
      }
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