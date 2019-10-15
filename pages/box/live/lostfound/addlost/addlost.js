const app = getApp()
const apiUrl = require('../../../../../config.js').apiUrl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: '',
    index: null,
    picker: ['寻物启事', '失物启事'],
    //地图地址选择
    address: "",
    //获取地址
    choosen: {
      latitude: 0,
      longitude: 0
    },
    flag: false,
    imgUrls: ''
  },
  //获取位置
  chooseLocation: function() {
    // let that = this
    wx.chooseLocation({
      type: 'gcj02',
      success: (res) => {
        // console.log(res)
        this.setData({
          choosen: res,
          flag: true
        })
      },
    })
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log(e.detail.value);
    var that = this
    var info = e.detail.value
    var type = info.type
    //type 0是索引
    if (type == "0") {
      type = "found"
    }
    if (type == "1") {
      type = "lost"
    }
    if (info.title.length == 0) {
      wx.showToast({
        title: '请输入标题!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    }
     else if (info.description.length == 0) {
      wx.showToast({
        title: '请输入描述!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else if (type == null) {
      wx.showToast({
        title: '请选择发布类别!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else if (info.location.length == "(0,0)") {
      wx.showToast({
        title: '请输入或选择位置!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else if (info.phone.length == 0) {
      wx.showToast({
        title: '请输入联系号码!',
        icon: 'loading',
        mask: true,
        duration: 1000
      })
    } else {
      //***********提交前将地址传到数据库 ***********
      if (that.data.imgUrls != '') {
        var imgUrls = that.data.imgUrls.replace(/..\/public/gi, '')
      }
      wx.request({
        url: apiUrl + 'lost_found/addLostfound',
        header: {
          token: wx.getStorageSync('token')
        },
        method: "POST",
        data: {
          title: info.title,
          description: info.description,
          location: info.location,
          type: type,
          phone: info.phone,
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
            setTimeout(function () {
              wx.navigateBack();
            }, 1500)
    
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
            url: apiUrl + 'lost_found/uploadImg',
            filePath: this.data.imgList[i],
            name: 'file',
            success: function (res) {
              var result = JSON.parse(res.data);
              if (that.data.imgUrls == '')
              {
                that.setData({
                  imgUrls: that.data.imgUrls.concat(result.imgUrl)
                })
              }
              else{
                that.setData({
                  imgUrls: that.data.imgUrls.concat(';' + result.imgUrl)
                })
              }

              console.log("存储的返回数组",that.data.imgUrls)
            },
            fail:function(e){
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
      title: '提示',
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