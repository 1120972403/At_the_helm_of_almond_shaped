const app = getApp()
const apiUrl = require('../../../config.js').apiUrl
Component({
  options: {
    addGlobalClass: true,
    
  },
  data: {
    newsList: [
    ],
    mapUrl: "",
    // 天气信息
    update: '',
    basic: {},
    today: {},
    tomorrow: {},
    afterTomor: {},
    todyIcon: '../../../images/weather/999.png',
    tomorrowIcon: '../../../images/weather/999.png',
    afterTomorIcon: '../../../images/weather/999.png',
    isTiptrue: true,
    CustomBar: app.globalData.CustomBar, 

  },
  attached() {
    var that = this;
    // var isFir = wx.getStorageSync('isFirst');
    // if (isFir == undefined || isFir == '') {
    //   //如果检测到还没登录需要登录再进入
    //   wx.reLaunch({
    //     url: '/pages/welcome/welcome',
    //   })
    // }
    let firstOpen = wx.getStorageSync("loadOpen")
    console.log("是否首次打开本页面==", firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      that.setData({
        isTiptrue: true,
      })
    } else {
      that.setData({
        isTiptrue: false,
       
      })
    }
    // if (!firstOpen){
    //   that.setData({
    //     modalName: 'news',

    //   })
    //}
    // 天气数据获取
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var key = '69413a0519bd48759383724b6e64b0bb';//你自己的key
        //需要在微信公众号的设置-开发设置中配置服务器域名
        wx.request({
            url: 'https://free-api.heweather.com/s6/weather?key=' + key + '&location=' + longitude + ',' + latitude,
          method: 'GET',
          success: function (res) {
            var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
            var basic = res.data.HeWeather6[0].basic;
            var update = res.data.HeWeather6[0].update.loc;//更新时间
            that.setData({
              update: update,
              basic: basic,
              today: daily_forecast_today,
              todyIcon: '/images/weather/' + daily_forecast_today.cond_code_d + '.png', //在和风天气中下载天气的icon图标，根据cond_code_d显示相应的图标
            });
          }
        })
       
        
      }
    })
    //滚动消息
    wx.request({
      url: apiUrl +'look/newList',
      method:'get',
      success:function(res){
        console.log( res.data.data)
        that.setData({
          newsList: res.data.data,
          news: res.data.data[0]
        })
      }
    })
    
  },
  methods: {
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    
    closeThis(e) {
      wx.setStorage({
        key: 'loadOpen',
        data: 'OpenTwo'
      })
      this.setData({
        isTiptrue: false
      })
    },

  },

})