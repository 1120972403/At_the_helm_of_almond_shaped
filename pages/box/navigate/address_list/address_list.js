// pages/box/navigate/address_list/address_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { "name": "校医院", "phone": 61800120,},
      { "name": "成都市第五人民医院", "phone": 82722252,},
      { "name": "医学信息工程学院/信息与教育技术中心", "phone": 61800100, },
      { "name": "后勤基建处/后勤服务中心", "phone": 61800555, },
      { "name": "计划财务处", "phone": 61800183, },
      { "name": "研究生院", "phone": 87714869, },
      { "name": "科技处", "phone": 61800103, },
      { "name": "教务处", "phone": 61800075, },
      { "name": "人事处", "phone": 61800112, },
      { "name": "保卫处", "phone": 61800110, }, 
      { "name": "校团委", "phone": 61800130, },
      { "name": "党委学生工作部/学生处/招生就业处", "phone": 61800091, },
      { "name": "纪检监察处", "phone": 61800067, }, 
      { "name": "基础医学院", "phone": 61800223,},
      { "name": "药学院", "phone": 61800231, },
      { "name": "针灸推拿学院/第三附属医院", "phone": 86115270, },
      { "name": "第二临床医学院/第二附属医院", "phone": 85229807, },
      { "name": "图书馆", "phone": 87716140, },
      { "name": "公寓服务中心", "phone": 61800263,},

    ],
  },
  //打电话
  call(e) {
    // console.log(e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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