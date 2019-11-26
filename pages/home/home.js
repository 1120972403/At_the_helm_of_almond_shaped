// pages/home/home.js
const app = getApp()
const apiUrl = require('../../config.js').apiUrl
Component({

  /**
   * 页面的初始数据
   */
  data: {
    type: "look",
    modalName: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    golist: [{
        img: "/images/write.png",
        name: "发布心情",
        url: "/pages/publish/home/home"
      },
      {
        img: "/images/sale.png",
        name: "闲置物品",
        url: "/pages/box/live/idles/idles"
      },
      {
        img: "/images/lostfound.png",
        name: "失物招领",
        url: "/pages/box/live/lostfound/lostfound"
      },
    ]
  },
  attached() {

  },


  methods: {

    gologin(type) {
      if (type != 'look') {
        var isFir = wx.getStorageSync('isFirst');
        if (isFir == undefined || isFir == '') {
          //如果检测到还没登录需要登录再进入
          this.setData({
            modalName: "goauth",
          })
          return true;
        }
      }
    },
    click(e) {
      var type = e.currentTarget.dataset.name;
      let that = this;
      // 检测是否登录
      this.gologin(type);
      that.setData({
        type: type
      })


    },
    topublish() {
      this.setData({
        modalName: 'bottomModal'
      })
      // this.gologin('');
      // var isFir = wx.getStorageSync('isFirst');
      // if (isFir){
      //   wx.navigateTo({
      //     url: '/pages/publish/home/home',
      //   })
      // }

    },
    goto(e){
      console.log(e)
      let index = e.currentTarget.dataset.index;
      let url = this.data.golist[index].url
      wx.navigateTo({
        url: url
      })
      this.hideModal()

    },
    hideModal() {
      this.setData({
        modalName: null
      })
    },
    bindGetUserInfo(e) {
      console.log(e)
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        console.log(e.detail.userInfo)
        wx.setStorageSync('isFirst', e.detail.userInfo);
        wx.login({
          success: (res) => {
            console.log('code',res.code);
            wx.request({
              url: apiUrl + 'login/login',
              method: 'post',
              data: {
                type:"WX",
                code: res.code,
                userInfo: e.detail.userInfo,
              },
              success: function(s) {
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
      } 
    },
    back() {
      wx.navigateTo({
        url: '/pages/home/home',
      })
    }
  }
})