// pages/box/live/lostfound/lostfound.js
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
    lostfoundList: [],
    isLoad: true,
    //选择的tabSelect的id
    tabId:0,
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
    this._getList('all',1, keyword);
  },
  /** 浮动小球添加信息 **/
  add: function() {
    var that = this;
    wx.navigateTo({
      url: './addlost/addlost',
    })
  },
  _getList(type, page, keyword=""){
    var that = this
    wx.request({
      url: apiUrl + 'lost_found/lostfoundList',
      method: 'post',
      data:{
        type,
        page,
        keyword,
      },
      success: function (res) {
        console.log(res.data.data.lostfoundList)
        // 检查是否还有下一页数据，若没有则提示并中断
        if (res.data.data.lostfoundList.length == 0) {
          that.setData({
            over: 'over'
          })
        }
        //  concat合并数组  第一次进入不需要累加
        if (page != 1) {
          that.setData({
            //非第一次进入 以前更新到data中的idlesList+刚刚获取的idlesList
            lostfoundList: that.data.lostfoundList.concat(res.data.data.lostfoundList)
          })
        } else {
          //第一次进入 
          that.setData({
            lostfoundList: res.data.data.lostfoundList
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
  tabSelect(e) {
    var tabId = e.currentTarget.dataset.id
    this.setData({
      tabId: tabId
    })
    var type
    this.setData({
      TabCur: tabId,
      scrollLeft: (tabId - 1) * 60,

    })
    if (tabId == 0) {
        //查询全部
      this._getList('all',1,"");
    }
    else if (tabId == 1) {
      //查询报失的列表
      this._getList('lost', 1, "");
    } else {
      //查询招领列表
      this._getList('found', 1, "");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (!wx.getStorageSync('stu_info')) {
      that.setData({
        modalName: "goauth",
        flag:"****"
 
      })
    }
    this._getList('all', 1, "");
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
    this._getList('all', 1, "");
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
  onPullDownRefresh: function () {
    //将page置1,再次刷新执行第一次操作
    console.log("111")
    var tabId = this.data.tabId
    this.setData({
      page: 1,
      isLoad: true
    })
    if (tabId == 0) {
      //查询全部
      this._getList('all', 1, "");
    }
    else if (tabId == 1) {
      //查询报失的列表
      this._getList('lost', 1, "");
    } else {
      //查询招领列表
      this._getList('found', 1, "");
    }
 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉此时page', this.data.page)
    var tabId = this.data.tabId
    this.setData({
      page: this.data.page + 1,
      isLoad: true
    })
    if (tabId == 0) {
      //查询全部
      var type = "all"
      this._getList(type, this.data.page,'');
    }
    else if (tabId == 1) {
      //查询报失的列表
      var type = 'lost'
      this._getList(type, this.data.page,'');
    } else {
      //查询招领列表
      var type = 'found'
      this._getList(type, this.data.page,'');
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})