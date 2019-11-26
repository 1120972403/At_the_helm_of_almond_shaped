// pages/look/hint/hint.js
const apiUrl = require('../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[]
  },
  // 打开显示和关闭
  on(e){
    let index = e.currentTarget.dataset.index
    let flag = this.data.newsList[index].flag
    this.data.newsList[index].flag = !flag

    this.setData({
      newsList: this.data.newsList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let indexFlag = options.index
    console.log('indexFlag',indexFlag)
    //滚动消息
    wx.request({
      url: apiUrl + 'look/newList',
      method: 'get',
      success: (res)=> {
        // console.log(res.data.data)
        let newsList=res.data.data
        // 循环遍历添加对象 val.flag = false;
        newsList.forEach((val, index, val_arr) => {
          val.flag = false;
          val_arr[indexFlag].flag = true
        });
        console.log(newsList)
        this.setData({
          newsList: newsList
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