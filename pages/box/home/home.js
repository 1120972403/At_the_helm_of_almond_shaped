//index.js
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
      url: 'http://admin.cn/index.php/api/box_news/newslist',
      method: "get",
      success: function(res) {
        console.log(res.data.data)
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
  }
})