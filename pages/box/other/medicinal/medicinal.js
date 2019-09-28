// pages/box/other/medicinal/medicinal.js
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    load: true, 
    typename:'解表药'
  },
//获取右侧列表信息
  getList(typeid){
    var that = this
    wx.request({
      url: 'http://admin.cn/index.php/api/medicinal/typelist',
      method: 'post',
      data:{
        typeid,
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          typelist: res.data.data
        })
      }
    })
  },
  onLoad() {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    //加载左侧的类型列表
    wx.request({
      url: 'http://admin.cn/index.php/api/medicinal/type',
      method:'get',
      success:function(res){
        console.log(res.data.data)
        that.setData({
          type: res.data.data
        })
      }
    })
    //自动加载解表药
    this.getList(1);

  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    console.log(e)
    var typeid = e.currentTarget.dataset.typeid
    var that = this
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50,
      typename: e.currentTarget.dataset.name
    })
    this.getList(typeid);

  },

})