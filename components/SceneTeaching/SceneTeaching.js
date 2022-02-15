// components/SceneTeaching/SceneTeaching.js
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
    // isShow:true,
    kai:"http://wechatweb.scitg.com.cn/img/xcx/icon/kai.png",
    shou:"http://wechatweb.scitg.com.cn/img/xcx/icon/shou.png"
  },
  observers:{ //监听数据的更改
    "sceneTeachingData"(data){
      data ===this.data.sceneTeachingData //这里不要写this.setData({})
      // console.log(data,"sceneTeachingData")
    }
  },
  ready:function(){
    // console.log(this.properties.sceneTeachingData,"sceneTeachingData1111111111111");
},
  /**
   * 组件的方法列表
   */
  methods: {
    toChange(e) {
      // console.log(e);
       this.setData({
         isShow:!this.data.isShow,
     })
     

   },
  }
})
