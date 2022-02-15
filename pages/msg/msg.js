const {
  GetAxnPhoneListByPhone
} = require("../../http/api.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    statusType: ["全部", "未接来电"],
    teacherName: [],
    currentType: 0,
    messageList: [],
    extension: '',
    startX: 0, //开始坐标
    startY: 0,
    isGetShow: false,
    isGetMore: false,
    pageIndex: 1,
    pageCount: 1,
    loadmore: false,
    scrollTo: 0,
    enter: "http://wechatweb.scitg.com.cn/img/xcx/icon/enter.png",
    out: "http://wechatweb.scitg.com.cn/img/xcx/icon/out.png"
  },
  // 状态切换
  statusTap: function (e) {
    var type = e.currentTarget.dataset.index;
    this.data.currentType = type
    this.setData({
      currentType: type,
      isGetShow: false,
      isGetMore: false,
      scrollTo: this.data.scrollTo = 0
    });

    console.log(this.data, "lalalalalall")
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '消息加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    var phone = getApp().globalData.phone;
    console.log(phone, "phone!!!!!!!!!!!!!!!!!!!");
    var msgparams = {
      "phone": phone
    }
    // 调用方法
    GetAxnPhoneListByPhone(msgparams).then(res => {
      this.setData({
        messageList: res.data,
      })

      console.log(this.data.messageList, "消息记录")
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取消息列表
    wx.showLoading({
      title: '消息加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    let that = this;
    that.onLoad();
  },

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function (res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '新华小程序',
    path: '/pages/index/index'
  }
},
//手指触摸动作开始 记录起点X坐标
touchstart: function (e) {
  //开始触摸时 重置所有删除
  this.data.messageList.forEach(function (v, i) {
    if (v.isTouchMove) //只操作为true的
      v.isTouchMove = false;
  })
  this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY,
    messageList: this.data.messageList
  })
},
//滑动事件处理
touchmove: function (e) {
  // var this = this,
  index = e.currentTarget.dataset.index, //当前索引
    startX = this.data.startX, //开始X坐标
    startY = this.data.startY, //开始Y坐标
    touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
    //获取滑动角度
    angle = this.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
  this.data.messageList.forEach(function (v, i) {
    v.isTouchMove = false
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    if (i == index) {
      if (touchMoveX > startX) //右滑
        v.isTouchMove = false
      else //左滑
        v.isTouchMove = true
    }
  })
  //更新数据
  this.setData({
    messageList: this.data.messageList
  })
},
/**
 * 计算滑动角度
 * @param {Object} start 起点坐标
 * @param {Object} end 终点坐标
 */
angle: function (start, end) {
  var _X = end.X - start.X,
    _Y = end.Y - start.Y
  //返回角度 /Math.atan()返回数字的反正切值
  return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
},


/**
 * 加载更多
 */
getLoadMore: function (e) {
  wx.showLoading();
  // var this = this;
  var page = e.currentTarget.dataset.page;
  if ((parseInt(page) + 1) < parseInt(this.data.pageCount)) {
    this.setData({
      pageIndex: (parseInt(page) + 1),
      isGetShow: false,
      isGetMore: true
    });
  } else if ((parseInt(page) + 1) >= parseInt(this.data.pageCount)) {
    this.setData({
      pageIndex: this.data.pageCount,
      isGetShow: false,
      isGetMore: true,
      loadmore: false
    });
  }
  wx.hideLoading();
},

// 回拨事件
listbtn: function (e) {
  console.log(e, "e")

  wx.showModal({
    title: '拨打后',
    content: '请输入分机号 ' + e.currentTarget.dataset.extension + ' 并以井号健结束',
    showCancel: true, //是否显示取消按钮
    confirmText: "回拨", //默认是“确定”
    confirmColor: '#F74C31', //确定文字的颜色
    success: function (res) {
      if (res.cancel) {
        //点击取消,默认隐藏弹框
      } else {
        //点击确定小程序调出手机拨号功能
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.secret_no // 仅为示例，并非真实的电话号码
        })
      }
    },
    fail: function (res) {}, //接口调用失败的回调函数
    complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
  });
}
})