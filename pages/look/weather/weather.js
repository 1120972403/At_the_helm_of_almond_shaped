// pages/look/weather/weather.js
Page({
  data: {
    update: '',
    basic: {},
    today: {},
    tomorrow: {},
    afterTomor: {},
    todyIcon: '../../../images/weather/999.png',
    tomorrowIcon: '../../../images/weather/999.png',
    afterTomorIcon: '../../../images/weather/999.png',
  },
  onShow: function () {
    this.getLocation();
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.getWeatherInfo(latitude, longitude);
      }
    })
  },
  getWeatherInfo: function (latitude, longitude) {
    var _this = this;
    var key = '69413a0519bd48759383724b6e64b0bb';//你自己的key
    //需要在微信公众号的设置-开发设置中配置服务器域名
    var url = 'https://free-api.heweather.com/s6/weather?key=' + key + '&location=' + longitude + ',' + latitude;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
        var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
        var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
        var basic = res.data.HeWeather6[0].basic;
        var update = res.data.HeWeather6[0].update.loc;//更新时间
        _this.setData({
          update: update,
          basic: basic,
          today: daily_forecast_today,
          tomorrow: daily_forecast_tomorrow,
          afterTomor: daily_forecast_afterTomor,
          todyIcon: '/images/weather/' + daily_forecast_today.cond_code_d + '.png', //在和风天气中下载天气的icon图标，根据cond_code_d显示相应的图标
          tomorrowIcon: '/images/weather/' + daily_forecast_tomorrow.cond_code_d + '.png',
          afterTomorIcon: '/images/weather/' + daily_forecast_afterTomor.cond_code_d + '.png'
        });
      }
    })
  }
})