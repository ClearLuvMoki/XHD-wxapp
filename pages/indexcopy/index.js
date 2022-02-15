const {
  GetFinalSolutionByNeedsId,
  AliSendMessage
} = require("../../http/api.js");
var phone = getApp().globalData.phone;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    nocancel: false,
    isShow: false, //true为展开
    finalSolutionData: [],
    needsId:'',
    curUserId:''
    
  },
  //获取input值
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
    // console.log(this.data.name,"name")
  },
  groupnameInput: function (e) {
    this.setData({
      groupname: e.detail.value
    })
    // console.log(this.data.groupname,"groupname")
  },
  classtimeInput: function (e) {
    this.setData({
      classtime: e.detail.value
    })
    // console.log(this.data.classtime,"classtime")
  },
  breaktimeInput: function (e) {
    this.setData({
      breaktime: e.detail.value
    })
    // console.log(this.data.breaktime,"breaktime")
  },
  classaddrInput: function (e) {
    this.setData({
      classaddr: e.detail.value
    })
    // console.log(this.data.classaddr,"classaddr")
  },
  headteacherInput: function (e) {
    this.setData({
      headteacher: e.detail.value
    })
    // console.log(this.data.headteacher,"headteacher")
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
    // console.log(this.data.phone,"phone")
  },
  // 电话回拨事件
  telbtn: function (e) {
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
            phoneNumber: e.currentTarget.dataset.phonenox // 仅为示例，并非真实的电话号码
          })

        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    });
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
    var that =this;
    that.setData({
      nocancel: !that.data.nocancel
    });
    console.log("clickedsucess");

    console.log(phone,"phone!!!!!!!!!!!!!!!!!!!");
    var sendmsgparams = {
      "PhoneNumbers": phone,
      "TemplateParam": {
            "name": that.data.name,
            "groupname": that.data.groupname,
            "classtime": that.data.classtime,
            "breaktime":  that.data.breaktime,
            "classaddr": that.data.classaddr,
            "headteacher":  that.data.headteacher,
            "phone": phone
          }
    }
    AliSendMessage(sendmsgparams).then(res => {
      console.log(res,"发送开始！！！！！！！！！！！！！！！！！！！")
      if (res.code == 0) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '发送失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })

  },
  /*
   * isShow做取反操作
   * */
  toChange(e) {
    //  console.log(e)
    let index = e.currentTarget.dataset.index;
    let finalSolutionData = this.data.finalSolutionData;
    finalSolutionData[index].isShow = !finalSolutionData[index].isShow;
    // let testFlag=!this.data.testFlag;
    this.setData({
      finalSolutionData: finalSolutionData,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var needsId = getApp().globalData.needsId;
    var curUserId = getApp().globalData.curUserId;
    
    var indexparams = {
      "needsId": needsId,
      "curUserId": curUserId
    }
    GetFinalSolutionByNeedsId(indexparams).then(res => {
      // console.log(res.data, "获取成型行程列表");
      let tmpdata = []
      for (let i of res.data) {
        i.isShow = false
        tmpdata.push(i);
        if(i.dayType == 0){
          i.dayType = "全天";
        }
      }
      this.setData({
        finalSolutionData: tmpdata,
      })
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onShareAppMessage: function () {},

})