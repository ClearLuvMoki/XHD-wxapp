
const {baseUrl} = require('./env.js').test
//封装ajax

// 专用域名
const subDomain='';
module.exports={
  // 二次封装wx.request 
  // {String }url:请求的接口地址 
  // {String} method:请求方式 GET,POST.... 
  // {Object} data:要传递的参数 
  // { boolean }isSubDomain:表示是否添加二级子域名 true代表添加,false代表不添加 
  
  //二次封装wx.request
  request:(url,method,data,isSubDomain)=>{
    return new Promise((resolve,reject)=>{
      // console.log('这是我封装的ajax请求',baseUrl);
      // http://10.6.100.243:81/VueSolutions/GetTrainingMainByNeedsId
      // 拼接
      let _url=`${baseUrl}/${isSubDomain?subDomain:''}${url}`;
      // console.log(_url,"_url");
      // console.log(data,"data");
      wx.request({
        url:_url,
        data:data,
        method:method,
        header:{
          // 'content-type':' application/x-www-form-urlencoded'
          'content-type':' application/json'
        },
        success:res=>{
          // console.log('获取数据',res)
          // let {code}=res.data; 
          resolve(res.data)
        }
      })
    })
  }
}
