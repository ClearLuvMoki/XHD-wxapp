const {
  request
} = require('./request.js');

// 基于业务封装的数据请求
module.exports = {
  // 个人中心api
  GetTrainingMainByNeedsId: (indexparams) => {
    //  console.log("获取个人中心")
    return request("/VueSolutions/GetTrainingMainByNeedsId", "POST", indexparams,
      true);
  },
  //  主页成型行程api
  GetFinalSolutionByNeedsId: (indexparams) => {
    //  console.log("获取成型行程")
    return request("/VueSolutions/GetFinalSolutionByNeedsId4MiniPro", "POST", indexparams,
      true);
  },
  //消息中心api
  GetAxnPhoneListByPhone: (msgparams) => {
    //  console.log("消息中心api")
    return request("/AppBindAxb/GetAxnPhoneListByPhone", "POST", msgparams,
      true);
  },
  //发送短信api
  AliSendMessage: (sendmsgparams) => {
    //  console.log("发送短信api")
    return request("/AppSMS/AliSendMessage", "POST", 
    sendmsgparams,
      true);
  },
  //login api
  GetGroupInfoByPhoneNo: (params) => {
    //  console.log("login api")
    return request("/VueSolutions/GetGroupInfoByPhoneNo", "POST",params,
      true);
  },
  //通过ID获取机构信息
  GetVisitInfoById: (params) => {
    //  console.log("login api")
    return request("/VueSolutions/GetVisitInfoById", "POST",params,
      true);
  },
  //小程序-获取文字提醒模版
  GetNoticeStringByNeedsId: (params) => {
    //  console.log("login api")
    return request("/WechatData/GetNoticeStringByNeedsId", "POST",params,
      true);
  }
}