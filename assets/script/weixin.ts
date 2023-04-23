
// https://open.weixin.qq.com/connect/oauth2/authorize?
// appid=wx520c15f417810387
// &redirect_uri=https://chong.qq.com/php/index.php?d=&c=wxAdapter&m=mobileDeal&showwxpaytitle=1&vb2ctag=4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect

// export function checkIsWechatBrowser() {
// 	let ua = navigator.userAgent.toLowerCase();
// 	if (ua.match(/MicroMessenger/i) == "micromessenger"){
// 		console.log("-----是微信浏览器");
// 		return true; // 微信浏览器
// 	}else{
// 		console.log("-----非微信浏览器");
// 		return false; // 非微信浏览器
// 	}
// }

// export function getCurrentPages() {
// 	console.log('---window.location.href', window.location.href);
// 	return window.location.href;
// }

// class weixinXX {
// 	//微信H5网页授权登录流程(公众号登录流程)
// 	async weixinOALoginFlow() {
// 		//首选判断当前的浏览器是不是微信浏览器
// 		let isWechat = checkIsWechatBrowser();
// 		if (isWechat) {
// 		//获取微信code
// 		let pages = getCurrentPages();
// 		//获取当前的页面对象
// 		let curPage = pages[pages.length - 1];
// 		//获取code
// 		let code = curPage.options.code || "";
// 		//如果code存在,请求服务端获取用户信息
// 		if (code) {
// 			//公众号登录
// 			let isLogin = await this.weixinOALogin(code);
// 			//如果登录成功,就再请求服务端接口获取一下用户信息
// 			if (isLogin) {
// 			// //获取用户信息
// 			const userinfo = await this.getUserInfo();
// 			return userinfo;
// 			} else {
// 			uni.showToast({
// 				title: "登录失败",
// 				icon: "error",
// 				duration: 2000,
// 			});
// 			return false;
// 			}
// 		} else {
// 			//当前的页面全路径
// 			let fullPath = curPage.__page__.fullPath;
// 			//当前的页面URL
// 			let currentPageUrl = "";
// 			if (fullPath && fullPath[0] == "/") {
// 			currentPageUrl = "http://" + document.domain + fullPath;
// 			} else {
// 			currentPageUrl = "http://" + document.domain + "/" + fullPath;
// 			}
// 			//跳转到微信授权页面授权
// 			this.jumpToWechatAuthorizePage(currentPageUrl);
// 		}
// 		} else {
// 		//表明非微信浏览器环境下(可以引导使用扫码登录等)
// 		return 0;
// 		}
// 	},
// 	//微信公众号登录
// 	async weixinOALogin(code) {
// 		const res = await APP.$api.wxoaLogin({
// 		code: code,
// 		});
// 		if (res.code === "0" && res.data.access_token) {
// 		//将获取到的access_token保存起来
// 		uni.setStorageSync("access_token", res.data.access_token);
// 		return true;
// 		} else {
// 		return false;
// 		}
// 	},
// 	//跳转到微信授权页面
// 	jumpToWechatAuthorizePage(currentPageUrl) {
// 		let redirectUrl = config.wechatCallbackUrl + "?frompage=" + encodeURIComponent(currentPageUrl)
// 		let linkUrl = config.wechatAuthorizeLink
// 		.replace("{APPID}", config.wechatAppId)
// 		.replace("{REDIRECT_URI}", encodeURIComponent(redirectUrl));
// 		window.location.href = linkUrl;
// 	},
// 	/*
// 	https://open.weixin.qq.com/connect/oauth2/authorize?
// 	appid=wx520c15f417810387
// 	&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60
// 	&response_type=code
// 	&scope=snsapi_base
// 	&state=123#wechat_redirect
// 	*/
// 	//获取用户信息
// 	async getUserInfo(refresh = true) {
// 		//如果不用刷新直接从缓存取数据
// 		if (!refresh) {
// 		const userinfo = uni.getStorageSync("_user_info");
// 		if (userinfo) {
// 			return JSON.parse(userinfo);
// 		}
// 		}
// 		//看看本地有没有存储访问令牌
// 		const accessToken = uni.getStorageSync("access_token");
// 		if (!accessToken) {
// 		return false;
// 		}
// 		//根据access_token请求服务端获取用户信息
// 		const res = await APP.$api.getUserInfo({
// 		access_token: accessToken,
// 		});
// 		if (res.code === "0") {
// 		//获取用户信息之后缓存起来
// 		uni.setStorageSync("_user_info", JSON.stringify(res.data));
// 		return res.data;
// 		} else {
// 		//说明access_token过期了
// 		uni.removeStorageSync("access_token");
// 		uni.removeStorageSync("_user_info");
// 		//显示模态框
// 		return false;
// 		}
// 	},

// 	onLoad(args) {
// 		if (args.frompage) {
// 		//获取code参数
// 		let code = args.code || "";
// 		let sourceUrl = args.frompage;
// 		//把code参数追加源地址链接
// 		if (code) {
// 			if (sourceUrl.indexOf("?") !== -1) {
// 			sourceUrl += "&code=" + code;
// 			} else {
// 			sourceUrl += "?code=" + code;
// 			}
// 		}
// 		//跳转到源地址
// 		window.location.href = sourceUrl;
// 		}
// 	},
// }

// export default new weixinXX();