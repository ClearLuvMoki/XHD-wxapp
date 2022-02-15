// pages/text/text.js
const {
  GetNoticeStringByNeedsId
} = require("../../http/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 复制文本按钮
  labelOne: function () {
    var that = this;
    that.setData({
      showModal: true
    });
    var needsId = getApp().globalData.needsId;
    var noticeparamsTypeOne = {
      "type": "1",
      "needsId": needsId
    };
    GetNoticeStringByNeedsId(noticeparamsTypeOne).then(res => {
      console.log(res.data.replace(/<br\/\>/g, "\n"));
      this.setData({
        noticeparamsTypeOne: res.data.replace(/<br\/\>/g, "\n"),
      })
    })
  },
  labelTwo: function () {
    var that = this;
    that.setData({
      showModal: true
    });
    var needsId = getApp().globalData.needsId;
    var noticeparamsTypeOne = {
      "type": "2",
      "needsId": needsId
    };
    GetNoticeStringByNeedsId(noticeparamsTypeOne).then(res => {
      console.log(res.data.replace(/<br\/\>/g, "\n"));
      this.setData({
        noticeparamsTypeOne: res.data.replace(/<br\/\>/g, "\n"),
      })
    })
  },
  labelThree: function () {
    var that = this;
    that.setData({
      showModal: true
    });
    var needsId = getApp().globalData.needsId;
    var noticeparamsTypeOne = {
      "type": "3",
      "needsId": needsId
    };
    GetNoticeStringByNeedsId(noticeparamsTypeOne).then(res => {
      console.log(res.data.replace(/<br\/\>/g, "\n"));
      this.setData({
        noticeparamsTypeOne: res.data.replace(/<br\/\>/g, "\n"),
      })
    })
  },
  labelFour: function () {
    var that = this;
    that.setData({
      showModal: true
    });
    var needsId = getApp().globalData.needsId;
    var noticeparamsTypeOne = {
      "type": "4",
      "needsId": needsId
    };
    GetNoticeStringByNeedsId(noticeparamsTypeOne).then(res => {
      console.log(res.data.replace(/<br\/\>/g, "\n"));
      this.setData({
        noticeparamsTypeOne: res.data.replace(/<br\/\>/g, "\n"),
      })
    })
  },
  labelFive: function () {
    var that = this;
    that.setData({
      showModal: true
    });
    var needsId = getApp().globalData.needsId;
    var noticeparamsTypeOne = {
      "type": "5",
      "needsId": needsId
    };
    GetNoticeStringByNeedsId(noticeparamsTypeOne).then(res => {
      console.log(res.data.replace(/<br\/\>/g, "\n"));
      this.setData({
        noticeparamsTypeOne: res.data.replace(/<br\/\>/g, "\n"),
      })
    })
  },
  labelSix: function () {
    var that = this;
    that.setData({
      showModal: true
    });
    var needsId = getApp().globalData.needsId;
    var noticeparamsTypeOne = {
      "type": "6",
      "needsId": needsId
    };
    GetNoticeStringByNeedsId(noticeparamsTypeOne).then(res => {
      console.log(res.data.replace(/<br\/\>/g, "\n"));
      this.setData({
        noticeparamsTypeOne: res.data.replace(/<br\/\>/g, "\n"),
      })
    })
  },

  modalCancel: function () {
    // console.log("发送成功了么！！！！！！！！！！！！！！")
    var that = this;
    that.setData({
      show: true
    });
  },
  modalConfirm: function (e) {
    this.setData({
      nocancel: !this.data.nocancel
    });
    wx.setClipboardData({
      data: this.data.noticeparamsTypeOne,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data,"复制内容！！！！！！！！！！！！！！") // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onShareAppMessage: function () {

  }
})