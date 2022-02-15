
const {
  GetGroupInfoByPhoneNo
} = require("../../http/api.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    nocancel: false,
    userInfo: null,
    openId: '',
    access_token: '',
    userMobile: '',
    userPwd:'',
    switchChecked:true,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//接口请求数据
    index: 0 //选择的下拉列表下标

  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
    });
    // console.log(this.data.selectData,"selectData1111111111111")
    // console.log(this.data.selectData[this.data.index].needsId,"needsId1111111111111")
    
  },
  //  调用模态框
  showModal: function () {
    this.setData({
      showModal: true
    })
  },
  modalCancel: function () {
    this.setData({
      show: true
    });
  },
  modalConfirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
   
    // console.log("clickedsucess");
    getApp().globalData.needsId=this.data.selectData[this.data.index].needsId;//设置全局变量（app已经定义 var app=getApp()
    getApp().globalData.curUserId=this.data.selectData[this.data.index].groupTeacherId;//设置全局变量（app已经定义 var app=getApp()
    getApp().globalData.phone=this.data.userMobile;//助教手机号
    getApp().globalData.groupTeacherName=this.data.selectData[this.data.index].groupTeacherName;//助教名称
    wx.switchTab({
      // switch是不能添加参数的。可以换一种思路，跳转页面的时候传参，是为了有个标识，是为了下一个页面更方便的展示信息。我们可以在switch跳转之前设置一个全局变量，到下一个页面的时候，直接去获取全局变量
      url: '../index/index',
    })
    
  },
  formSubmit: function (e){
    console.log(e.detail.value,"formSubmit！！！！"); //格式 Object {userMobile: "user", userPwd: "password"}
    //获得表单数据
    var objData = e.detail.value;
    if (objData.userMobile && objData.userPwd){
     // 同步方式存储表单数据
     wx.setStorageSync( 'userMobile' , objData.userMobile);
     wx.setStorageSync( 'userPwd' , objData.userPwd);


    if (objData.userPwd.length <= 0 && objData.userMobile.length <= 0) {
      wx.showModal({
        title: '错误',
        content: '密码或手机号输入不正确',
        showCancel: false
      });
      return;
    }
    else{
      var params = {
        "phoneNo": objData.userMobile,
        "pwd": objData.userPwd
      }
      GetGroupInfoByPhoneNo(params).then(res => {
        // console.log(res,"res")
        if (res.code != "0") {
          wx.showModal({
            title: '错误',
            content: res.message,
            showCancel: false
          });
        } else {
           //  调用模态框
           this.showModal();
           this.setData({
            selectData: res.data
          });
        }
      })
    }


    }
   },
  //加载完后，处理事件 
  // 如果有本地数据，则直接显示
  onLoad: function (options){
    //获取本地数据
    var userMobile = wx.getStorageSync( 'userMobile');
    var userPwd = wx.getStorageSync( 'userPwd');
    console.log(userMobile,"本地userMobile");
    console.log(userPwd,"本地userPwd");
    if (userMobile){
     this.setData({userMobile: userMobile});
    }
    if (userPwd){
     this.setData({userPwd: userPwd});
    }
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //渲染界面后 才显示
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '新汇点小程序',
      path: '/pages/index/index'
    }
  },
 
  /**
   * 打开同一公众号下关联的另一个小程序
   */
  ToMiniProgram: function () {
    wx.navigateToMiniProgram({
      appId: 'wx01161e2d70e464b3', //要打开的小程序 appId
      path: 'pages/startup/startup', //打开的页面路径，如果为空则打开首页
      extraData: {
        source: '新汇点小程序' //在 App.onLaunch()，App.onShow() 中可接收该数据
      },
      envVersion: 'release', //有效值 develop（开发版），trial（体验版），release（正式版）
      success(res) {
        // 打开成功
      }
    })
  },

})