// pages/home/home.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    type: "look",
    
  },
  attached() {
  },

  
  methods:{
    tologin(type){
      if (type != 'look') {
        var isFir = wx.getStorageSync('isFirst');
        if (isFir == undefined || isFir == '') {
          //如果检测到还没登录需要登录再进入
          wx.reLaunch({
            url: '/pages/welcome/welcome',
          })
          return true;
        }

      }
    },
    click(e) {
      var type = e.currentTarget.dataset.name;
      let that = this;
      // 检测是否登录
      this.tologin(type);
       that.setData({
          type: type
        })
     
    
   
   
    },
    topublish: function () {
      
      this.tologin('');
      wx.navigateTo({
        url: '/pages/publish/home/home',
      })
    },

  }
})