
// https://open.weixin.qq.com/connect/oauth2/authorize?
// appid=wx520c15f417810387
// &redirect_uri=https://chong.qq.com/php/index.php?d=&c=wxAdapter&m=mobileDeal&showwxpaytitle=1&vb2ctag=4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect

import CommonUtil from "./CommonUtil";
import NetWork from "./NetWork";
import { hex_sha1 } from "./sha1";
const { wx } = window;
export function checkIsWechatBrowser() {
	let ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger"){
		console.log("-----是微信浏览器");
		return true; // 微信浏览器
	}else{
		console.log("-----非微信浏览器");
		return false; // 非微信浏览器
	}
}

export function getCurrentPages() {
	console.log('---window.location.href', window.location.href);
	return window.location.href;
}

class weixinXX {
	//微信H5网页授权登录流程(公众号登录流程)
	async weixinOALoginFlow() {
		//首选判断当前的浏览器是不是微信浏览器
		let isWechat = checkIsWechatBrowser();
		if (isWechat) {
			//获取微信code
			let pages = getCurrentPages();
			let code = CommonUtil.getParam(pages, 'code');
			// //获取当前的页面对象
			// let curPage = pages[pages.length - 1];
			// //获取code
			// let code = curPage.options.code || "";
			//如果code存在,请求服务端获取用户信息
			if (code) {
				// //公众号登录
				// let isLogin = await this.weixinOALogin(code);
				// //如果登录成功,就再请求服务端接口获取一下用户信息
				// if (isLogin) {
				// 	// //获取用户信息
				// 	const userinfo = await this.getUserInfo();
				// 	return userinfo;
				// } else {
				// 	uni.showToast({
				// 		title: "登录失败",
				// 		icon: "error",
				// 		duration: 2000,
				// 	});
				// 	return false;
				// }
			} else {
				//当前的页面全路径
				let fullPath = curPage.__page__.fullPath;
				//当前的页面URL
				let currentPageUrl = "";
				if (fullPath && fullPath[0] == "/") {
					currentPageUrl = "http://" + document.domain + fullPath;
				} else {
					currentPageUrl = "http://" + document.domain + "/" + fullPath;
				}
				//跳转到微信授权页面授权
				this.jumpToWechatAuthorizePage(currentPageUrl);
			}
			} else {
			//表明非微信浏览器环境下(可以引导使用扫码登录等)
			return 0;
		}
	}

	//跳转到微信授权页面
	jumpToWechatAuthorizePage(currentPageUrl) {
		currentPageUrl = 'https://changshubank.sumaokeji.com/index.html';
		let appid = 'wxff3693cf40c5f63f';
		// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';

		// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect';

		// let redirectUrl = config.wechatCallbackUrl + "?frompage=" + encodeURIComponent(currentPageUrl)
		// let linkUrl = config.wechatAuthorizeLink
		// .replace("{APPID}", config.wechatAppId)
		// .replace("{REDIRECT_URI}", encodeURIComponent(redirectUrl));


		let linkUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid 
		+ '&redirect_uri=' + encodeURIComponent(currentPageUrl)
		+ '&response_type=code&scope=snsapi_base' + `&state=${123}` + '#wechat_redirect';
		window.location.href = linkUrl;
	}
	
	// https://open.weixin.qq.com/connect/oauth2/authorize?
	// appid=wx520c15f417810387
	// &redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60
	// &response_type=code
	// &scope=snsapi_base
	// &state=123#wechat_redirect
	

// AppID与AppSecret账号：
// AppID：
// AppSecret：b811ca802a947e1f279279532bc4c9bb

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
	hideMenu(configData) {
		console.log("---------微信接口1111");
		function docReady(fn) {
			console.log("---------微信接口2222");
			if (document.readyState === 'complete' || document.readyState === 'interactive') {
				fn()
			} else {
				console.log("---------微信接口3333");
				document.addEventListener('DOMContentLoaded', fn);
			}
		}
		console.log("---------微信接口4444");
		docReady(async () => {
			console.log("---------微信接口5555");
			let ua = navigator.userAgent.toLowerCase()
			let isWXWork = ua.match(/wxwork/i) == 'wxwork'
			let isWeixin = !isWXWork && ua.match(/MicroMessenger/i) == 'micromessenger'
			let isMobile = false
			let isDesktop = false
			if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i)) {
				isMobile = true
			} else {
				isDesktop = true
			}
			console.warn('ua', ua)
			console.warn(ua.match(/MicroMessenger/i) == 'micromessenger')
			let m = ua.match(/MicroMessenger/i)
			console.warn(m && m[0] === 'micromessenger')
	
			if (isWeixin) {
				console.log("---------微信接口6666");
	
				wx.ready(function(res){
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					console.log('-------wx.ready', res);
					// wx.hideMenuItems({
					// 	menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
					// });
	
					wx.hideAllNonBaseMenuItem({
						success: () => {console.log('----hideAllNonBaseMenuItem---success');},
						fail: () => {console.log('----hideAllNonBaseMenuItem---fail');},
						complete: () => {console.log('----hideAllNonBaseMenuItem---complete');},
						cancel: () => {console.log('----hideAllNonBaseMenuItem---cancel');},
					});
				});
				wx.error(function(res){
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log('-------wx.error', res);
				});
	
				let urlN = window.location.href.split('#')[0];
				let timestampn = new Date().getTime().toString();
				let timestamp = timestampn.substring(0, 10);			//生成签名的时间戳
				let nonceStr = Math.random().toString(36).substr(2);	//生成签名的随机串
				// let con = `jsapi_ticket=${res.content.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${urlN}`
				// let signature = hex_sha1(con);		//签名
				let con = `jsapi_ticket=${'jdiwjd'}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${urlN}`
				let signature = hex_sha1(con);


				// let smallWxAppid = 'wx7f0aa46ec0a6ca47';
				let smallWxAppid = configData.appId;
				nonceStr = configData.nonceStr;
				timestamp = configData.timestamp;
				signature = configData.signature;

				// configData
				// {"status":1000,"message":"获取成功!!!!!!","data":{"appId":"wxff3693cf40c5f63f","nonceStr":"tJXhWUcVJr92CjlU","timestamp":"1682392225","url":"https://changshubank.sumaokeji.com/index.html","signature":"664a570a2099f15ea1f598343c69f813402b485e"}}
				NetWork.url = configData.url;


				let configParam = {
					debug: false, // 调试时可开启
					// appId: 'wxe5f52902cf4de896',
					appId: smallWxAppid,
					timestamp: timestamp, // 必填，填任意数字即可
					nonceStr: nonceStr, // 必填，填任意非空字符串即可
					signature: signature, // 必填，填任意非空字符串即可
					jsApiList: ['hideAllNonBaseMenuItem'], // 安卓上必填一个，随机即可
					openTagList:['wx-open-launch-weapp'], // 填入打开小程序的开放标签名
				};
				console.log('----wx.configParam', configParam);
				wx.config(configParam);
			}
		})

	}


	addJumpBtn() {
		let url = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';//要显示的图片url地址
		let gameDiv = document.getElementById('Cocos2dGameContainer');//获取div元素
		let bigImg = document.createElement("img");//创建img元素
		bigImg.id = 'QRCode';
		bigImg.src = url;//给img标签添加图片源
		bigImg.alt = 'bigImg';

		bigImg.width = 150;
		bigImg.height = 150;

		bigImg.style.position = 'absolute';
		bigImg.style.top = "70px";//y坐标
		bigImg.style.left = parseInt(gameDiv.style.width.replace(/px/, '')) / 2 - bigImg.width / 2 + "px";//设置图片居中显示

		gameDiv.appendChild(bigImg);      //为div添加子元素img
	}


	addJumpBtn2() {
		// let htmlStr = "";
		// for(let i = 0; i< count; i++){
		// 	let user = data[i];
		// 	htmlStr +="<div id='"+user['email']+"' class='ry-box clearfix'>"+
		// 			"<div class='ry-img'><img src='${ctxNewFront}/images/user_img01.png' width='79' height='79' /></div>"+
		// 			"<div class='ry-cont'>"+
		// 			"<div class='ry-name'>"+user['userName']+"</div>"+
		// 			"<div class='ry-tag green'>"+user['count']+"</div>"+
		// 			"<div class='ry-tag rad'>"+user['undoneDelayCount']+"</div>"+
		// 			"<div class='jd-name'>当前接单："+user['currentOrder']+"</div>"+
		// 			"</div>"+
		// 			"</div></div>";
		// }
		// //清空
		// //插入htmlStr
		// $('#contentDiv').nextAll().remove();
		// document.getElementById('contentDiv').insertAdjacentHTML('afterEnd',htmlStr);



	}

	// https://changshubank.sumaokeji.com/tableDialog_btn_jump.png
	addJumpBtn3() {

		let htmlW = document.documentElement.clientWidth;
		let htmlH = document.documentElement.clientHeight;
		// 获取body的宽度
		let bodyW = document.body.clientWidth;
		let bodyH = document.body.clientHeight;
		// 兼容处理
		let W = htmlW||bodyW;
		let H = htmlH||bodyH;

		// document.documentElement.style.fontSize = (W / 750 * 100) + 'px';
		let btnWidth = `${258/750* W}px`;
		let btnHeight = `${111/750* W}px`;
		let color = 'background-color: rgba(245, 194, 51, 0);'
		
		//计算高度位置
		let leftPos = `${(750 / 2 + 141.4 - 258/2) / 750 * W}px`;
		let topPos = `${(420.366 - 111/2) / 750 * W + H / 2}px`;
		// (1334 / 2 + 420.366 - 111/2) / 1334 * H


		// let username = 'gh_d43f693ca31f';
		// let path = '/page/component/index';

		let smallWxAppid = 'wx7f0aa46ec0a6ca47';
		let path = 'pages/middlePage/middlePage?shareurl=%2FpackageB%2Fpages%2FcitizenLoan%2FapplyOnce%2FapplyOnce%3Fproducttype%3D100066';
		let username = 'gh_cdc8cf19b197';


		// let htmlStr = `<div id="wxbtncontainer" class="wxbtncontainer" style="position:absolute; left:${leftPos}; top:${topPos}; width: ${btnWidth}; height: ${btnHeight}; display: block; background-color: rgba(245, 194, 151, 0.8);">` + 
		let htmlStr = `<div id="wxbtncontainer" class="wxbtncontainer" style="position:absolute; left:${leftPos}; top:${topPos}; width: ${btnWidth}; height: ${btnHeight}; display: block;">` + 
						`<wx-open-launch-weapp id="launch-btn" username="${username}" path="${path}">` + 
							// '<script type="text/wxtag-template">' + 
							'<template>' + 
								`<button id="wxbtn" class="wxbtn" style="width: ${btnWidth}; height: ${btnHeight}; ${color} text-align: center; font-size: 17px; display: block; border: none; background-size: 100%; background-repeat: no-repeat; background-image: url(https://changshubank.sumaokeji.com/tableDialog_btn_jump.png); "></button>` + 
							// '</script>' + 
							'</template>' + 
						'</wx-open-launch-weapp>' + 
					'</div>';

		// htmlStr = '<wx-open-launch-weapp id="launch-btn" username="gh_d43f693ca31f" path="/page/component/index">' + 
		// 				'<template>' + 
		// 					'<button style="width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>' + 
		// 				'</template>' + 
		// 			'</wx-open-launch-weapp>';
		
		// htmlStr = '<button style="position:absolute; left:0; top:0; width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>';
		
		// htmlStr = '<wx-open-launch-weapp id="launch-btn" username="gh_d43f693ca31f" path="/page/component/index">' + 
		// 				'<button style="width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>' + 
		// 			'</wx-open-launch-weapp>';
		let gameDiv = document.getElementById('Cocos2dGameContainer');//获取div元素
		// gameDiv.insertAdjacentHTML('afterEnd',htmlStr);
		gameDiv.insertAdjacentHTML('beforeend',htmlStr);


		setTimeout(() => {
			let wxbtn = document.getElementById('wxbtn');//获取div元素
			if(wxbtn) {
				// wxbtn.onclick();
				wxbtn.onclick = () => {
					console.log("------点击了跳转市民贷");
				}
			}
		}, 300);
	}


	addJumpBtn4() {

		let htmlW = document.documentElement.clientWidth;
		let htmlH = document.documentElement.clientHeight;
		// 获取body的宽度
		let bodyW = document.body.clientWidth;
		let bodyH = document.body.clientHeight;
		// 兼容处理
		let W = htmlW||bodyW;
		let H = htmlH||bodyH;
		// 258 111    445 83   -288.3
		// document.documentElement.style.fontSize = (W / 750 * 100) + 'px';
		let btnWidth = `${445/750* W}px`;
		let btnHeight = `${83/750* W}px`;
		let color = 'background-color: rgba(232, 51, 12, 0);'
		
		//计算高度位置
		let leftPos = `${(750 / 2 - 445/2) / 750 * W}px`;
		let topPos = `${(288.3 - 83/2) / 750 * W + H / 2}px`;
		// (1334 / 2 + 420.366 - 111/2) / 1334 * H

		// let username = 'gh_d43f693ca31f';
		// let path = '/page/component/index';

		let smallWxAppid = 'wx7f0aa46ec0a6ca47';
		let path = 'pages/middlePage/middlePage?shareurl=%2FpackageB%2Fpages%2FcitizenLoan%2FapplyOnce%2FapplyOnce%3Fproducttype%3D100066';
		let username = 'gh_cdc8cf19b197';

		// let htmlStr = `<div id="wxbtncontainer2" class="wxbtncontainer2" style="position:absolute; left:${leftPos}; top:${topPos}; width: ${btnWidth}; height: ${btnHeight}; display: block; background-color: rgba(232, 51, 12, 0.8);">` + 
		let htmlStr = `<div id="wxbtncontainer2" class="wxbtncontainer2" style="position:absolute; left:${leftPos}; top:${topPos}; width: ${btnWidth}; height: ${btnHeight}; display: block;">` + 
						`<wx-open-launch-weapp id="launch-btn" username="${username}" path="${path}">` + 
							// '<script type="text/wxtag-template">' + 
							'<template>' + 
								`<button id="wxbtn2" class="wxbtn2" style="width: ${btnWidth}; height: ${btnHeight}; ${color} text-align: center; font-size: 17px; display: block; border: none; background-size: 100%; background-repeat: no-repeat; background-image: url(https://changshubank.sumaokeji.com/prizeDialog_btn_jump.png); "></button>` + 
							// '</script>' + 
							'</template>' + 
						'</wx-open-launch-weapp>' + 
					'</div>';

		// htmlStr = '<wx-open-launch-weapp id="launch-btn" username="gh_d43f693ca31f" path="/page/component/index">' + 
		// 				'<template>' + 
		// 					'<button style="width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>' + 
		// 				'</template>' + 
		// 			'</wx-open-launch-weapp>';
		
		// htmlStr = '<button style="position:absolute; left:0; top:0; width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>';
		
		// htmlStr = '<wx-open-launch-weapp id="launch-btn" username="gh_d43f693ca31f" path="/page/component/index">' + 
		// 				'<button style="width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>' + 
		// 			'</wx-open-launch-weapp>';
		let gameDiv = document.getElementById('Cocos2dGameContainer');//获取div元素
		// gameDiv.insertAdjacentHTML('afterEnd',htmlStr);
		gameDiv.insertAdjacentHTML('beforeend',htmlStr);


		setTimeout(() => {
			let wxbtn = document.getElementById('wxbtn2');//获取div元素
			if(wxbtn) {
				// wxbtn.onclick();
				wxbtn.onclick = () => {
					console.log("------点击了跳转市民贷");
				}
			}
		}, 300);
	}



	removeJumpBtn() {
		let ele = document.getElementById('wxbtncontainer');
		if(ele) {
			ele.remove();
		}
	}

	removeJumpBtn2() {
		let ele = document.getElementById('wxbtncontainer2');
		if(ele) {
			ele.remove();
		}
	}

}

export default new weixinXX();