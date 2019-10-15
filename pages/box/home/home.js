//index.js
const apiUrl = require('../../../config.js').apiUrl
//获取应用实例
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    swiperList: [],

  },
  attached() {
    var that = this
    wx.request({
      url: apiUrl+'box_news/newslist',
      method: "get",
      success: function(res) {
        that.setData({
          swiperList: res.data.data
        })

      }
    })

  },
  methods: {
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    gomap(){
      wx.navigateToMiniProgram({
        appId: 'wx7c934c1fcbc0006c',
        path: 'pages/index',
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
    },
    goLib(){
      wx.showModal({
        title: '提示',
        content: '执掌杏林暂不开放图书馆信息操作,请关注“成都中医药大学图书馆”微信公众号，点击“常用服务”进行使用',
      })
    },
    godetail(e){
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/box/swiperlist/swiperlist?id='+id,
      })
    }
  }
})