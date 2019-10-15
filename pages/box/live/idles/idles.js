// pages/box/live/idles/idles.js
const app = getApp()
const apiUrl = require('../../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    page: 1,
    TabCur: 0,
    scrollLeft: 0,
    idlesList: [],
    isLoad: true,
    tmp: '',
    CustomBar: app.globalData.CustomBar,
  },
  //搜索信息
  valuechange: function (res) {
    this.setData({
      tmp: res.detail.value
    })

  },
  search: function () {
    wx.showToast({
      title: '搜索ing',
      icon: 'loading',
      duration: 1000
    })
    this.setData({
      page: 1,
      isLoad: true
    })
    var keyword = this.data.tmp
    this._getList(1, keyword);
  },
  /** 浮动小球添加信息 **/
  add: function () {
    var that = this;
    wx.scanCode({
      // 只允许从相机扫码
      onlyFromCamera: true,
      success(res) {
        //res.result为获取到的isbn码
        console.log(res.result)
        that.hideModal();
        wx.navigateTo({
          url: './add/add?isbn=' + res.result,
        })
      },
      fail: function () {
        // 显示弹出 与hideModal对应
        that.setData({
          modalName: "DialogModal"
        })
      }

    })
  },
  // 显示弹出
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  //数据请求
  _getList(page, keyword) {
    var that = this
    wx.request({
      url: apiUrl + 'box_Idles/idlesList',
      method: 'post',
      data: {
        page,
        keyword
      },
      success: function (res) {
        console.log(res.data.data)
        //检查是否还有下一页数据，若没有则提示并中断
        if (res.data.data.idlesList.length == 0) {
          that.setData({
            over: 'over'
          })
        }
        //  concat合并数组  第一次进入不需要累加
        if (page != 1) {
          that.setData({
            //非第一次进入 以前更新到data中的idlesList+刚刚获取的idlesList
            idlesList: that.data.idlesList.concat(res.data.data.idlesList)
          })
        } else {
          //第一次进入 
          that.setData({
            idlesList: res.data.data.idlesList,
          })
        }
        //加载样式flase
        setTimeout(() => {
          that.setData({
            isLoad: false
          })
        }, 1000)
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!wx.getStorageSync('stu_info')) {
      that.setData({
        modalName: "goauth",
      })
    }
    var page = 1;
    this._getList(page, "");
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

    this.onLoad();
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
    //将page置1,再次刷新执行第一次操作    
    this.setData({
      page: 1,
      isLoad: true
    })
    this._getList(1, "");

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉此时page', this.data.page)
    this.setData({
      page: this.data.page + 1,
      isLoad: true
    })
    this._getList(this.data.page, "");


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})