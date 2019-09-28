// pages/box/live/idles/add/add.js
const app = getApp()
const apiUrl = require('../../../../../config.js').apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn:0,
    discount: 10,
    picker: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    new_price: 0,
    bookInfo:[]
  },
  PickerChange(e) {
    console.log(e)
    var price = e.currentTarget.dataset.prcie
    var discount = e.detail.value
    //trim()去除字符串两边的空格,去掉‘元’
    var reg = /[\u4e00-\u9fa5]/g;
    price = price.replace(reg, "").trim()
    console.log('price', price);
    console.log('discount', discount);
    let new_price = (price * discount) / 10
    this.setData({
      discount: discount,
      new_price: new_price
    })
  },

  formSubmit: function(e) {
    var info = e.detail.value
    console.log('value',e.detail.value);
    if (info.new_price == 0 || info.new_price == "0元" ) {
      wx.showToast({
        title: '请选择折扣!',
        icon: 'loading',
        mask:true,
        duration: 1000
      })
    }
    else if (info.remark.length == 0) {
      wx.showToast({
        title: '请输入书籍描述!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else if (info.mode.length == 0) {
      wx.showToast({
        title: '请选择交易方式!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else if (info.phone.length == 0 || info.qq.length == 0) {
      wx.showToast({
        title: '输入电话或者QQ!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else {
      var that = this
      var bookInfo = this.data.bookInfo
      console.log('bookInfo', bookInfo)
      wx.request({
        url: apiUrl + 'box_Idles/addIdles', 
        header: {
          token: wx.getStorageSync('token')
        },
        method: "POST",
        data: {
          isbn: this.data.isbn,
          title:bookInfo.title,
          logo: bookInfo.logo,
          author_name: bookInfo.author[0].name,
          author_desc: bookInfo.author_desc,
          publisher: bookInfo.publisher,
          published: bookInfo.published,
          page: bookInfo.page,
          price: bookInfo.price,
          description: bookInfo.description, 
          remark: info.remark,
          discount: info.discount,
          mode: info.mode,
          new_price: info.new_price,
          phone: info.phone,
          qq: info.qq,
        },
        success: function(res) {
          console.log('提交返回',res.data);
          if (res.data.code == 1) {
            wx.showToast({
              title: '提交成功！！！', //这里打印出登录成功
              icon: 'success',
              duration: 1500
            })
            wx.navigateBack();
          }
          else {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 1000
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      isbn: options.isbn
    })
    wx.request({
      url: apiUrl + 'apiserver/getBookInfo',
      method: 'get',
      header: {
        // token: wx.getStorageSync('token')
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Njc4Njg0OTgsIm5iZiI6MTU2Nzg2ODQ5OCwidXNlcmluZm8iOnsiaW5mbyI6eyJ1aWQiOjYsImF1dGgiOjF9fX0.hcFrkIXJRlJIpDPXHG5tEgmiQlXtESOHwIfinUxXN2k'
      },
      data: {
        isbn: options.isbn
      },
      success: function(res) {
        console.log(res.data.data)
        if (res.data.data.title == "null" || res.data.data.title == "" || res.data.data.title == null){
          that.setData({
            modalName: "DialogModal"
          })
        }
        that.setData({
          bookInfo: res.data.data,
          hidden: false
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  back(){
    wx.navigateBack();
  },
  // 显示弹出
  hideModal(e) {
    this.setData({
      modalName: null
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