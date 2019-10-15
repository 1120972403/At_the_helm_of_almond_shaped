// pages/look/newlist/newdetail/newdetail.js
const app = getApp()
const apiUrl = require('../../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    html:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.request({
      url: apiUrl + 'new_list/newdetail?id=' + id,
      success:function(res){
        console.log(res.data.data);
        var title = res.data.data[0].article_title
        var date = res.data.data[0].article_date
        var str = res.data.data[0].article_content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ').replace(/\/Upload/gi, "http://www.cdutcm.edu.cn/Upload").replace(/line-height: 2.5/gi, 'line-height: 150%').replace(/font-size: 18px/gi,'font-size: 14px')
        // console.log(str)
        that.setData({
          title: title,
          date: date,
          html: str,
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