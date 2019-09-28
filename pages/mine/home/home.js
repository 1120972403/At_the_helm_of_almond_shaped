Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo:'',
    stu_info:[]
  },
  attached() {
    var that = this 
    that.setData({
      userInfo: wx.getStorageSync('isFirst'),
      stu_info:wx.getStorageSync('stu_info')
    })
   
   
  },
  methods: {
    navgo(){
      wx.navigateTo({
        url: '/pages/mine/auth/auth',

      })
    }
  }
})