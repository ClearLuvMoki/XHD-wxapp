const {
	GetTrainingMainByNeedsId
} = require("../../http/api.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		GetTrainingMainByNeedsIdList: {
			groupName: "",
			clientName: "",
			trainingDate: "",
			trainingEndDate: "",
			peopleNum: "",
			trainingAddress: "",
			projectNo: ""
		}
	},
	//引用我们要调用的方法
	// 退出登录
	ExitUserInfo() {
		console.log("退出啦");
		// 清除本地缓存
		// wx.removeStorageSync('userInfo');
		wx.clearStorage();
		let that = this;
		that.onLoad();
		wx.redirectTo({
			url: '/pages/login/login'
		})

		
	},
	// chakan 
	toViewBtn() {
		
		var needsId = getApp().globalData.needsId;
		console.log(needsId,"needsId")
		// console.log("查看");
		wx.navigateTo({
			url: '/pages/toView/toView?needsId=' +needsId
			// url: 'http://oa.scitg.com.cn/Contact/Score?id=9560' //正式环境
			// url: 'http://testwx.scitg.com.cn/Contact/Score?id=9560' //测试环境
		})

		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		// let resData = wx.getStorageSync('userInfo');
		// console.log("gern-----", resData)
		var needsId = getApp().globalData.needsId;
		var curUserId = getApp().globalData.curUserId;
		var groupTeacherPhone = getApp().globalData.phone //助教手机号
		var groupTeacherName = getApp().globalData.groupTeacherName //助教名称
		this.setData({
			groupTeacherPhone: groupTeacherPhone,
			groupTeacherName: groupTeacherName
		})
		var indexparams = {
			"needsId": needsId,
			"curUserId": curUserId
		}
		// 调用方法
		GetTrainingMainByNeedsId(indexparams).then(res => {
			// console.log(res.data);
			this.setData({
				GetTrainingMainByNeedsIdList: res.data,
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
	onShow: async function () {
		// 小圆点
		//PassportBiz.isChatReadRedDot();
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
	onPullDownRefresh: async function () {
		await this._login();
		wx.stopPullDownRefresh();
	},

	//登录
	_login: async function () {
		await PassportBiz.loginSilence(this);

		// 取得token里的信息
		let token = PassportBiz.getToken();
		if (!token) {
			return;
		}

		// 先用token里信息渲染
		let user = {};
		user.USER_PIC = token.pic;
		user.USER_NAME = token.name;
		user.USER_ITEM = token.item;
		user.USER_SEX = token.sex;
		user.USER_STATUS = token.status;

		this.setData({
			user
		});

		// 再调用服务器信息渲染
		this._getUserInfo();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	_getUserInfo: async function () {
		if (!PassportBiz.isLogin()) return;

		// 取得用户信息
		let opt = {
			title: 'bar'
		};
		let user = await cloudHelper.callCloudData('user/my_detail', {}, opt);
		if (!user || user.USER_STATUS == 0 || user.USER_STATUS == 9) {
			pageHelper.reload();
		}
		this.setData({
			user
		});
	},

	url: function (e) {
		pageHelper.url(e);
	},

	bindAvatarTap: async function () {
		UserBiz.chooseAvatar(PassportBiz.getUserKey(), 'my_index');
	},

	// bindSetTap: async function (e) {
	// 	wx.showActionSheet({
	// 		itemList: ['清除缓存', '重新登录', '退出登录'],
	// 		success: async res => {
	// 			let idx = res.tapIndex;
	// 			if (idx == 0) {
	// 				let token = PassportBiz.getToken(); 
	// 				cacheHelper.clear();
	// 				cacheHelper.set(comm.CACHE_TOKEN, token); 
	// 			}
	// 			if (idx == 1) {
	// 				await this._login();
	// 			}
	// 			if (idx == 2) {
	// 				cacheHelper.clear();
	// 				this.setData({
	// 					user: null
	// 				});
	// 			}

	// 		},
	// 		fail: function (res) {}
	// 	})
	// }
})