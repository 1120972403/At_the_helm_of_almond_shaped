var util = require('../../../utils/util.js');
const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
const url = require('../../../config.js').url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: '',
    imgUrls: ''
  },
  formSubmit: function(e) {
    var that = this
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    var time = util.formatTime(new Date());
    that.setData({
      userInfo: wx.getStorageSync('isFirst'),
      stu_info: wx.getStorageSync('stu_info'),
      time: time
    })
  },
  formSubmit: function(e) {
    console.log(e.detail.value);
    var that = this
    var info = e.detail.value
    if (info.content.length == 0) {
      wx.showToast({
        title: '请输入内容!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else {
      //***********提交前将地址传到数据库 ***********
      if (that.data.imgUrls!=''){
        var imgUrls = that.data.imgUrls.replace(/..\/public\//gi, url)
      }
      console.log("存储的返回数组", that.data.imgUrls)
      wx.request({
        url: apiUrl + 'article/addArticle',
        header: {
          token: wx.getStorageSync('token')
        },
        method: "POST",
        data: {
          content: info.content,
          imgs: imgUrls
        },
        success: function(res) {
          console.log('提交返回', res.data);
          if (res.data.code == 1) {
            wx.showToast({
              title: '提交成功！！！', //这里打印出登录成功
              icon: 'success',
              duration: 1500
            })
            wx.navigateBack();
          } else {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 1000
            })
          }
        }
      })
    }
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 上传图片
   */
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {

          that.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          that.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log("res.tempFilePaths", res.tempFilePaths)
        console.log("imgList", this.data.imgList)
        console.log("imgList", this.data.imgList[0])

        //循环把图片上传到服务器
        for (var i = 0; i < this.data.imgList.length; i++) {
          wx.uploadFile({
            url: apiUrl + 'article/uploadImg',
            filePath: this.data.imgList[i],
            name: 'file',
            success: function(res) {
              var result = JSON.parse(res.data);
              if (that.data.imgUrls == '') {
                that.setData({
                  imgUrls: that.data.imgUrls.concat(result.imgUrl)
                })
              } else {
                that.setData({
                  imgUrls: that.data.imgUrls.concat(';' + result.imgUrl)
                })
              }

              console.log("存储的返回数组", that.data.imgUrls)
            },
            fail: function(e) {
              console.log(e)
            }
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    var that = this
    console.log(e)
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          that.data.imgList.splice(index, 1);
          that.data.imgUrls.splice(index, 1);
          that.setData({
            imgList: this.data.imgList,
            imgUrls: this.data.imgUrls
          })
        }
        console.log("删除后imgList", this.data.imgList)
        console.log("删除后imgUrls", this.data.imgUrls)
      }
    })
  },
})