// pages/look/getJob/getJob.js
const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    getlist:[],
    isLoad: true,
    page:1,
    hidden: false
  },
  //数据请求
  _getList(page) {
    var that = this
    wx.request({
      url: apiUrl + 'get_job/getlist',
      method: 'post',
      data: {
        page,
      },
      success: function (res) {
        console.log(res.data);
        //检查是否还有下一页数据，若没有则提示并中断
        if (res.data.data.getlist.length == 0) {
          that.setData({
            over: 'over'
          })
        }
        //  concat合并数组  第一次进入不需要累加
        if (page != 1) {
          that.setData({
            //非第一次进入 以前更新到data中的idlesList+刚刚获取的idlesList
            getlist: that.data.getlist.concat(res.data.data.getlist)
          })
        } else {
          //第一次进入 
          that.setData({
            getlist: res.data.data.getlist,
          })
        }
        //加载样式flase
        setTimeout(() => {
          that.setData({
            isLoad: false,
            hidden: true
          })
        }, 300)
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = 1;
    this._getList(page);
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
    //将page置1,再次刷新执行第一次操作
    this.setData({
      page: 1,
      isLoad: true
    })
    this._getList(1);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉此时page', this.data.page)
    this.setData({
      page: this.data.page + 1,
      isLoad: true
    })
    this._getList(this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})