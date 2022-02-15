// components/TheLecture/TheLecture.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false, //true为展开
    spanShow: true, //true为展开
    spannoShow: false, //true为展开
    kai:"http://wechatweb.scitg.com.cn/img/xcx/icon/kai.png",
    shou:"http://wechatweb.scitg.com.cn/img/xcx/icon/shou.png"
  },
  observers:{ //监听数据的更改
    "defaultData"(data){
      data ===this.data.defaultData //这里不要写this.setData({})
      // console.log(data,"defaultData")
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toChange(e) {
       console.log(e)
      this.setData({
        isShow:!this.data.isShow,
    })
     
    },
  }
})
