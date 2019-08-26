// pages/car/car.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    car: true,
  },
  // 评论页面跳转
  pinglun: function () {
    wx.navigateTo({
      url: '/pages/new/comment/comment',
    })
  },
  methods: {
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})