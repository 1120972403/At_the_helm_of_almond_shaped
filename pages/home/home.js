// pages/home/home.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    type: "look",
    
  },
  attached() {
  },
  methods:{
    click(e) {
      // console.log(e.currentTarget.dataset.name)
      let that = this;
      that.setData({
        type: e.currentTarget.dataset.name
      })
    },
    topublish: function () {
      wx.navigateTo({
        url: '/pages/publish/home/home',
      })
    },

  }
})