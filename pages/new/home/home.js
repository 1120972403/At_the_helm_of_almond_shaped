// pages/car/car.js
const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
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
  attached() {

    var that = this
    if (!wx.getStorageSync('stu_info')) {
      that.setData({
        modalName: "goauth",
        flag:"**********嘿嘿！加密了*************"
      })
    }
    wx.request({
      url: apiUrl +'article/articleList',
      method:'post',
      data:{
        type:"all"
      },
      success:(res)=>{
        console.log(res.data.data.articleList)
        that.setData({
          articleList: res.data.data.articleList
        })
      }
    })

  },

  methods: {
    add() {
      wx.navigateTo({
        url: '/pages/publish/home/home',
      })
    },
    // 评论页面跳转
    pinglun: function() {
      wx.navigateTo({
        url: '/pages/new/comment/comment',
      })
    },
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})