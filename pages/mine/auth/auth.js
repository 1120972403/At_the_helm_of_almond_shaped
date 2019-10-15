// pages/mine/auth/auth.js
const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
const imgUrl = require('../../../config.js').imgUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
      header: {},
      stuInfo: '',
      cookies: '',
      error:""
    },
    //认证成功之后的跳转
    bego(){
      console.log(1)
      wx.reLaunch({
        url: '/pages/home/home',
      })
    },
    //用户刷新验证码
  getCode(){
    var _this = this;
    wx.request({
      url: apiUrl + 'apiserver/getVerify',
      success: function (res) {
        var img = res.data.data.imgUrl.replace(/..\/public\//gi, imgUrl)
        _this.setData({
          img: img,
          cookies: res.data.data.cookies
        })
      }
    })

  },
    // 用户协议
    goto() {
      wx.navigateTo({
        url: './agreement/agreement',
      })
    },
    //再次登录
    again() {
      this.getCode()
      this.setData({
        modalName: null,
      })
    },
    formSubmit: function(e) {


      
      var info = e.detail.value
      console.log('value', e.detail.value);

      if (info.account.length == 0 || info.pwd.length == 0 || info.verify.length == 0) {
        wx.showToast({
          title: '信息输入不完整!',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
      } else {
        var _this = this;
        wx.request({
          url: apiUrl + 'apiserver/login',
          method: 'post',
          header: this.data.header,
          data: {
            "account": info.account,
            "pwd": info.pwd,
            "verifycode": info.verify,
            "cookies": this.data.cookies
          },
          method: "post",
          success: function(e) {
            console.log(e.data);
            if (e.data.message == "ok" || e.data.code == 0) {
              var stu_name = e.data.data.replace(/<[^>]+>/g, '').replace(/\s+/g, '').replace(/教学管理系统/g, '').replace(/[^\u4e00-\u9fa5]/g, '').replace(/修改密码设置锁定注销退出登录时间版权所有添加我的桌面我的桌面填充一级菜单填充二级菜单填充三级菜单填充一级菜单构建一级菜单同时符合下拉菜单要求设定默认显示一级菜单构建左菜单构建下拉菜单遍历取出二级菜单二级左菜单字符串加入二级下拉菜单构建三级下拉字符串遍历取出三级菜单三级左菜单字符串三级下拉菜单字符串取出三级菜单装载三级下拉菜单没有下面代码有问题装载一级下拉菜单判断是否为注销登录判断是否为单点登录单点登录的注销还要注销中心服务器/g, '');
              console.log(stu_name)
              //执行信息添加
              wx.request({
                url: apiUrl + 'user/auth',
                method: 'post',
                header: {
                  token: wx.getStorageSync('token')
                },
                data: {
                  stu_num: info.account,
                  stu_name: stu_name
                },
                success: function(res) {
                  var stu_info = new Array();
                  stu_info[0] = stu_name
                  stu_info[1] = info.account
                  wx.setStorageSync('stu_info', stu_info); 
                  console.log(res.data)
                  _this.setData({
                    modalName: "DialogModal",
                    modalName: "DialogModal1",
                    error: e.data.msg
                  })

                }
              })
            }
            else{
              // 显示弹出 与hideModal对应
            _this.setData({
              img: '',
              modalName: "DialogModal",
              error: e.data.message
            })
            }
          }
        })
      }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  this.getCode();
  },
})
