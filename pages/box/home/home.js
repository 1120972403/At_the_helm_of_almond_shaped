//index.js
//获取应用实例
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    tab:[
      {
        title:'学习助手',
        content:[{
          title: '四六级查分'
        },
          {
            title: 'NCER查分'
          }, {
            title: '抢课助手'
          }, {
            title: '练题程序'
          },
        ]
     
      }
    ],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.cdutcm.edu.cn/upload/main/advertisement/843c4f43f57d4f378ecfc890ce3c0baa_1200_350.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.cdutcm.edu.cn/upload/main/advertisement/00b0fbd754544ec4a52a6c7c8b7c82b3_1200_350.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.cdutcm.edu.cn/upload/main/advertisement/1685c491cc1e4419b16e77c4e830207e_1200_350.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.cdutcm.edu.cn/upload/main/advertisement/e1899a26994547079fa579c33da4ecc0_1200_350.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'https://www.cdutcm.edu.cn/upload/main/advertisement/7974631511d14bc882d067637a1be58e_1200_350.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'https://www.cdutcm.edu.cn/upload/main/advertisement/a0b44ebb62f44bc9a38dedab853bb3d2_1200_350.jpg'
    }],

  },

  methods:{
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  }
})