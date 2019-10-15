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
    imgUrl : require('../../../../../config.js').imgUrl,
    id:0
  },
  //打电话
  call(e) {
    // console.log(e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  //查看大图
  previewImage: function (e) {
    console.log(e)
    var src = this.data.mgUrl+e.target.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接  
      urls: [src] // 需要预览的图片http链接列表  
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
  onShareAppMessage: function (res) {
    return {
      title: '“执掌杏林”--失物招领,这里应有你的失物',
      path: '/pages/welcome/welcome',
   
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