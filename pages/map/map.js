const {
  GetVisitInfoById
} = require("../../http/api.js");
Page({
  data: {
    longitude: 113.324520,
    latitude: 23.099994,
    markers: []
  },
  onLoad: function (options) {
    // index.js里sendAppMessage传过来的地址
    // console.log(options, "Obj!!!!!!!!!!!!!!!!");
    var that = this;
    that.setData({
      sendVisitId: options.visitId
    })
    console.log(that.data.sendVisitId, "sendVisitId")
    var indexparams = {
      "id": that.data.sendVisitId,
      // "id": '1013',
    }
    GetVisitInfoById(indexparams).then(res => {
      console.log(res.data.address, "]通过ID获取机构信息");
      this.setData({
        address: res.data.address,
        longitude: res.data.lng,
        latitude: res.data.lat
      })
      
    var markers = [{ 
      latitude: res.data.lat, 
      longitude: res.data.lng, 
      name: '浦东新区', 
      desc: '我的位置'
     }] ;
     var covers = [{ 
      latitude: res.data.lat, 
      longitude: res.data.lng, 
      iconPath: 'http://wechatweb.scitg.com.cn/img/xcx/icon_cur_position.png"', 
      rotate: 0 
     }];
     this.setData({ 
      longitude: res.data.lng, 
      latitude: res.data.lat, 
      markers: markers, 
      covers: covers, 
     }) 
    });


  },
  onReady: function () {

  },

})