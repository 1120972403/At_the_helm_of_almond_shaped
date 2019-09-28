// pages/mine/publish/publish.js
const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    flag:''
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  //上下架闲置图书
  delete: function (e) {
    var that = this;
    // console.log(e); return;
    var id = e.currentTarget.dataset.id;//获取当前长按图书id
    var del = e.currentTarget.dataset.del;//获取当前长按图书delete_time
    var type = e.currentTarget.dataset.type;//获取当前长按的类型
    if (type == "myidles"){
      if (del == 0) {
        wx.showModal({
          title: '提示',
          content: '确定要下架此图书吗？',
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: apiUrl + 'box_Idles/delIdles',
                header: {
                  token: wx.getStorageSync('token')
                },
                method: "post",
                data: {
                  id,
                },
                success: function (res) {
                  wx.showToast({
                    title: '下架成功！',
                  })

                }
              })

            } else if (res.cancel) {
              wx.showToast({
                title: '点击取消了',
              })
              return false;
            }

          }
        })
      }
      else {
        wx.showModal({
          title: '提示',
          content: '确定要上架此图书吗？',
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: apiUrl + 'box_Idles/agIdles',
                header: {
                  token: wx.getStorageSync('token')
                },
                method: "post",
                data: {
                  id,
                },
                success: function (res) {
                  wx.showToast({
                    title: '上架成功！',
                  })
                }
              })

            } else if (res.cancel) {
              wx.showToast({
                title: '点击取消了！',
              })
              return false;
            }

          }
        })
      }
    }
    else if (type == 'mylostfound'){
      if (del == 0) {
        wx.showModal({
          title: '提示',
          content: '确定要下架此失物招领吗？',
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: apiUrl + 'lost_found/delLostfound',
                header: {
                  token: wx.getStorageSync('token')
                },
                method: "post",
                data: {
                  id,
                },
                success: function (res) {
                  wx.showToast({
                    title: '下架成功！',
                  })

                }
              })

            } else if (res.cancel) {
              wx.showToast({
                title: '点击取消了',
              })
              return false;
            }

          }
        })
      }
      else {
        wx.showModal({
          title: '提示',
          content: '确定要上架此失物招领吗？',
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: apiUrl + 'lost_found/agLostfound',
                header: {
                  token: wx.getStorageSync('token')
                },
                method: "post",
                data: {
                  id,
                },
                success: function (res) {
                  wx.showToast({
                    title: '上架成功！',
                  })
                }
              })

            } else if (res.cancel) {
              wx.showToast({
                title: '点击取消了！',
              })
              return false;
            }

          }
        })
      }
    }

  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取失物招领列表
    wx.request({
      url: apiUrl + 'lost_found/mylostfound',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'get',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          mylostfound: res.data.data.mylostfound
        })
      }
    })
    //获取闲置图书表
    wx.request({
      url: apiUrl + 'box_Idles/myidles',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'get',
      success:function(res){
        console.log(res.data.data.myidles)
        that.setData({
          myidles: res.data.data.myidles
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