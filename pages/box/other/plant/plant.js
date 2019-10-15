// pages/box/other/plant/plant.js
const app = getApp()
const apiUrl = require('../../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testPicFile: '',
    userInfo: [],
    result: [],
    Width: app.globalData.Width,
    Height: app.globalData.Height,
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //识别推荐的
  history() {
    wx.navigateTo({
      url: './history/history',
    })
  },
  selectimg: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          testPicFile: tempFilePaths[0]
        })
        that._upload(tempFilePaths[0])
      }
    })
  },
  _upload(testPicFile) {
    var that = this
    wx.uploadFile({
      url: apiUrl + 'plant/Aiplant',
      filePath: testPicFile,
      name: 'image',
      header: {
        token: wx.getStorageSync('token')
      },
      success: function(x) {
        var result = JSON.parse(x.data)
        console.log(result);
        if (result.code == 200) {
          wx.navigateTo({
            url: "./flower/flower?result=" + JSON.stringify(result)
          });
          return false;
        } else {
          that.setData({
            modalName: 'Image',
            error: "识别失败",
          })
        }
      },
      fail:function(e){
        that.setData({
          modalName: 'Image',
          error: "识别失败",
        })
      }
      
    })
  },
  takePhoto() {
    let that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log("拍摄成功")
        var tempImagePath = res.tempImagePath
        that.setData({
          testPicFile: res.tempImagePath
        })
        this._upload(tempImagePath)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.setData({
      testPicFile: ''
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})