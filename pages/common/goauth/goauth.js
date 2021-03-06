// pages/common/goauth/goauth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    // var that = this
    // if (!wx.getStorageSync('stu_info')) {
    //   that.setData({
    //     modalName: "DialogModal",
    //   })
    // }
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo)
      wx.setStorageSync('isFirst', e.detail.userInfo);
      wx.login({
        success: (res) => {
          wx.request({
            url: apiUrl + 'login/login',
            method: 'post',
            data: {
              code: res.code,
              userInfo: e.detail.userInfo,
            },
            success: function (s) {
              console.log("返回来的值", s.data)
              if (s.data.code == 200) {

                wx.setStorageSync('token', s.data.data);
                wx.navigateTo({
                  url: '/pages/mine/auth/auth'
                })
                that.setData({
                  modalName: null
                })

              } else {
                console.log("登录失败");
                return;
              }
            },
          })
        },
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  back() {
    wx.navigateTo({
      url: '/pages/home/home',
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