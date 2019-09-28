// pages/look/newlist/newlist.js
const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //学校要闻
    xyyw:[],
    zhxw:[],
    xshd:[],
    TabCur: 0,
    scrollLeft: 0,   
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //查询通知公共
    wx.request({
      url: apiUrl +'new_list/newlist',
      method:"get",
      success:function(res){
        console.log(res.data.data)
        var xyyw = res.data.data.xyyw
        var zhxw = res.data.data.zhxw
        var xshd = res.data.data.xshd
        var jwgg = res.data.data.jwgg
        that.setData({
          xyyw: xyyw,
          zhxw: zhxw,
          xshd: xshd,
          jwgg: jwgg
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