// components/w-detail-component/w-detail-component.js
Component({
 
  /**
   * 组件的属性列表
   */
  properties: {
    groupArrivedData:{
      type: Object
    }
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false, //true为展开
  },
  ready:function(){
    // console.log(this.properties.groupArrivedData,"groupArrivedData!!!!!!!!!!!!!!!!!");
},
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
