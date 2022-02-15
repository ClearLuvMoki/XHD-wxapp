var that;
var app = getApp();
// var api = require("../../api/api.js"); //配置文件
Page({
  // come_baby:function(event){
  //   wx.switchTab({
  //     url: '../index/index',
  //   })
  // },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: 'http://wechatweb.scitg.com.cn/img/xcx/loading.png' ,
    // imgUrls: '../../images/loading.png' ,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // api.Loading(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //渲染界面后 才显示
    // api.UnLoading(this, 100);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '新汇点小程序',
      path: '/pages/index/index'
    }
  },
  goto_next: function (val) {
    // wx.switchTab({
    //   url: '/pages/login/login'
    // })
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})