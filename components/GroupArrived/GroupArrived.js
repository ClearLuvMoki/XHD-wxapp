// components/GroupArrived/GroupArrived.js
const {
  AliSendMessage
} = require("../../http/api.js");

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    groupArrivedData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    nocancel: false,
    show: false,
    classtime: '',
    breaktime: '',
    classaddr: '',
    noShowex: false,
    Showex: true,
    classdate: '2020-03-25',
    classtime: '12:01',
    TimeChangeTea: '10:01',
    kai:"http://wechatweb.scitg.com.cn/img/xcx/icon/kai.png",
    shou:"http://wechatweb.scitg.com.cn/img/xcx/icon/shou.png"
  },
  observers: { //监听数据的更改
    "groupArrivedData"(data) {
      data === this.data.groupArrivedData //这里不要写this.setData({})
      // console.log(data,"groupArrivedData")
    }
  },
  ready: function () {
    // console.log(this.properties.groupArrivedData.phoneNoA,"groupArrivedData11111111111111");
    var groupTeacherPhone = getApp().globalData.phone //助教手机号
    var groupTeacherName = getApp().globalData.groupTeacherName //助教名称
    this.setData({
      groupTeacherPhone: groupTeacherPhone,
      groupTeacherName: groupTeacherName
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 复制文本按钮
    copyBtn:function(){
      var groupTeacherPhone = getApp().globalData.phone //助教手机号
      var groupTeacherName = getApp().globalData.groupTeacherName //助教名称
      let content = '【新汇点】尊敬的'+this.properties.groupArrivedData.teacherName+'，您好！授课具体信息如下：\n课程名称：'+this.properties.groupArrivedData.activityTitle+'\n授课时间：'+this.data.classdate+' '+this.data.classtime+'\n茶歇时间：'+this.data.TimeChangeTea+'\n上课地点：'+this.data.classaddr+'\n班主任老师：'+groupTeacherName+'\n如有问题，请联系：'+groupTeacherPhone
      wx.setClipboardData({
        data: content.replace(/\\n/,'\n'),
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data,"复制文本！！！！！！！！！！！！！！") // data
            }
          })
        }
      })
    },
    // 长按复制文本
    copyText: function () {
      // console.log(t, "复制电话");
      // console.log(this.data.groupArrivedData.inRemark2);
      wx.setClipboardData({
        data: this.data.groupArrivedData.inRemark2,
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data,"复制电话！！！！！！！！！！！！！！") // data
            }
          })
        }
      })
    },
    //获取input值
    //  点击开始日期组件确定事件
    bindDateStartChange: function (e) {
      console.log('日期，携带值为', e.detail.value)
      var that = this;
      that.setData({
        classdate: e.detail.value
      })
    },
    //时间组件
    bindTimeChange: function(e) {
      console.log('时间，携带值为', e.detail.value)
      var that = this;
      that.setData({
        classtime: e.detail.value
      })
    },
    //茶歇时间
    bindTimeChangeTea: function(e) {
      console.log('茶歇时间，携带值为', e.detail.value)
      var that = this;
      that.setData({
        TimeChangeTea: e.detail.value
      })
    },
    classaddrInput: function (e) {
      this.setData({
        classaddr: e.detail.value
      })
      console.log(this.data.classaddr, "classaddr")
    },

    // 短信发送事件
    showModal: function () {
      var that = this;
      that.setData({
        showModal: true
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
      var groupTeacherPhone = getApp().globalData.phone //助教手机号
      var groupTeacherName = getApp().globalData.groupTeacherName //助教名称
      var _this = this;
      _this.setData({
        Apiclasstime: this.data.classtime,
        Apibreaktime: this.data.breaktime,
        Apiclassaddr: this.data.classaddr,
      })
      var sendmsgparams = {
        "PhoneNumbers": groupTeacherPhone,
        "TemplateParam": {
          "name": this.properties.groupArrivedData.teacherName,
          // "groupname": "lalalalalala",
          "groupname": this.properties.groupArrivedData.activityTitle,
          "classtime": this.data.classdate+" "+this.data.classtime,
          "breaktime": this.data.TimeChangeTea,
          "classaddr":this.data.classaddr,
          // "classaddr": this.data.Apiclassaddr,
          "headteacher": groupTeacherName,
          "phone": groupTeacherPhone
        }
      }
      // console.log(sendmsgparams, "1sendmsgparams!!!!!!!!@@@@@@@@@@@@@@@@@")
      if (this.data.TimeChangeTea == '') {
        wx.showToast({
          title: '茶歇时间不能为空',
          icon: 'fail',
          duration: 1000
        })
        return;
      }
      if (this.data.classaddr == '') {
        wx.showToast({
          title: '上课地点不能为空',
          icon: 'fail',
          duration: 1000
        })
        return;
      }
      if ( this.data.classdate+this.data.classtime == '') {
        wx.showToast({
          title: '授课时间不能为空',
          icon: 'fail',
          duration: 1000
        })
        return;
      }
      // console.log(sendmsgparams, "2sendmsgparams!!!!!!!!@@@@@@@@@@@@@@@@@")
      AliSendMessage(sendmsgparams).then(res => {
        console.log(res, "alires")
        if (res.code == 0) {
          if (res.data.Code == "OK") {
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
      console.log(e);
      this.setData({
        isShow: !this.data.isShow,
      })
    },
  





  }
})