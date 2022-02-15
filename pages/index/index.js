const {
  GetFinalSolutionByNeedsId
} = require("../../http/api.js");
Page({

      /**
       * 页面的初始数据
       */
      data: {
        hide_view: false,
        see_view: true,
        showModal: false,
        nocancel: false,

        isShow: false, //true为展开
        finalSolutionData: [{
            "specificDate": "",
            "finalSolutions": []
          }

        ],
        needsId: '',
        curUserId: ''

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function () {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        var needsId = getApp().globalData.needsId;
        var curUserId = getApp().globalData.curUserId;

        var indexparams = {
          "needsId": needsId,
          "curUserId": curUserId
        }
        GetFinalSolutionByNeedsId(indexparams).then(res => {
          // console.log(res.data, "获取成型行程列表");
          let tmpdata = [];
          var weekDay = [
            "周日",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
          ];

          for (let i of res.data) {
            i.weekDay = weekDay
            // i.weekDay = newinGift
            i.xhweekday = weekDay[new Date(i.specificDate).getDay()];
            tmpdata.push(i);
            if (i.finalSolutions != null && i.finalSolutions.length > 0) {
              for (let t of i.finalSolutions) {
                if (t.dayType == 0) {
                  t.dayType = "全天";
                } else if (t.dayType == 1) {
                  t.dayType = "上午";
                } else if (t.dayType == 2) {
                  t.dayType = "下午";
                } else {
                  t.dayType = "晚上";
                }
                console.log(t.phoneNoA, "phoneNoA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                getApp().globalData.phoneNoA = t.phoneNoA; //发送短信手机号
              }
            }

          }
          this.setData({
            finalSolutionData: tmpdata
          })
        });
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {},

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
        wx.showLoading({
          title: '加载中',
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
      onPullDownRefresh: function () {
        console.log("正在下拉刷新");
        wx.showLoading({
          title: '加载中',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        var needsId = getApp().globalData.needsId;
        var curUserId = getApp().globalData.curUserId;

        var indexparams = {
          "needsId": needsId,
          "curUserId": curUserId
        }
        GetFinalSolutionByNeedsId(indexparams).then(res => {
          // console.log(res.data, "获取成型行程列表");
          let tmpdata = [];
          var weekDay = [
            "周日",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
          ];
          for (let i of res.data) {
            i.weekDay = weekDay
            // i.weekDay = newinGift
            i.xhweekday = weekDay[new Date(i.specificDate).getDay()];
            tmpdata.push(i);
            if (i.finalSolutions != null && i.finalSolutions.length > 0) {
              for (let t of i.finalSolutions) {
                if (t.dayType == 0) {
                  t.dayType = "全天";
                } else if (t.dayType == 1) {
                  t.dayType = "上午";
                } else if (t.dayType == 2) {
                  t.dayType = "下午";
                } else {
                  t.dayType = "晚上";
                }
                getApp().globalData.phoneNoA = t.phoneNoA; //发送短信手机号
              }
            }

          }
          this.setData({
            finalSolutionData: tmpdata
          })
        });
        wx.stopPullDownRefresh({
          success: (res) => {
            console.log("刷新结束")
          },
        })
      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {},

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function (res) {
        if (res.from === 'button') {
          if (res.from === 'button') {
            console.log(res.target.dataset.visitid,"visitId")
          }
          return {
            title: '位置分享',
            imageUrl: 'http://zhtong.sipyun.com/XHREPMINIPROGRAM/images/mapM.jpg',
            path: '/pages/map/map?visitId=' + res.target.dataset.visitid ,
            success: function (res) {
              // 转发成功
              console.log(res);
              console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function (res) {
              // 转发失败
              console.log("转发失败:" + JSON.stringify(res));
            }
          }
        }
}
      })