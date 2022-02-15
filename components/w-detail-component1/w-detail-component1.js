// components/w-detail-component/w-detail-component.js
const {
  GetVisitInfoById
} = require("../../http/api.js");
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    sceneTeachingData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  created: function () {
  },
  methods: {
    checkChange: function (e) {
      console.log(e.detail.value, "ddaaaaaaaaaaaaaa"); /*获取的是一个数组, 包含的是选中的value的值, 如['中国', '日本'], 即要传递的值*/
    },
    copyText: function () {
      // console.log(t, "复制地址");
      // console.log(this.data.sceneTeachingData.address);
      wx.setClipboardData({
        data: this.data.sceneTeachingData.address,
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data,"复制地址！！！！！！！！！！！！！！") // data
            }
          })
        }
      })
    },
    copyTextInRemark3: function () {
      // console.log(t, "复制联系人");
      // console.log(this.data.sceneTeachingData.inRemark3);
      wx.setClipboardData({
        data: this.data.sceneTeachingData.inRemark3,
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data,"复制联系人！！！！！！！！！！！！！！") // data
            }
          })
        }
      })
    }







  }
})