// 1,根据code换取openId
// https://api.sumaokeji.com/sumao/api/bank/getOpenIdByCode?code=
// 请求方式：Get
// 参数：code 从微信获取
// 返回：{
// 	"status":1000,//请求状态，1000成功，其余失败
// 	"message":"获取成功!!!!!",
// 	"data":""//openId
// }

// 2，抽奖
// https://api.sumaokeji.com/sumao/api/bank/prize?openId=
// 请求方式：Get
// 参数：openId
// 返回:{
// 	"status":1000,//请求状态，1000成功，其余失败
// 	"message":"获取成功!!!!!",
// 	"data":{
// 		"prizeName":"",//奖品名称
// 		"content":"",//奖品描述
// 		"amount":中奖金额
// 	}
// }

// 3，抽奖
// https://api.sumaokeji.com/sumao/api/bank/getRecord?openId=
// 请求方式：Get
// 参数：openId
// 返回:{
// 	"status":1000,//请求状态，1000成功，其余失败
// 	"message":"获取成功!!!!!",
// 	"data":{
// 		"prizeName":"",//奖品名称
// 		"content":"",//奖品描述
// 		"amount":,中奖金额
// 		"insertTime":中奖时间
// 	}
// }




// export default class CommonUtil {
// 	/**
// 	 * @description: 生成随机数 [min, max]
// 	 */
// 	public static randomNumber(min: number, max: number): number {
// 		return Math.floor(Math.random() * (max - min + 1) + min);
// 	}
// }
import weixinXX, { getCurrentPages } from "./weixin";
class NetWork {

	openId:string = '';
	url = null;

	sendXHR (requestName:string, param?, succCallback?, failCallback?) {
		var xhr = new XMLHttpRequest();


		requestName = 'https://api.sumaokeji.com/sumao/api/bank/' + requestName;

		xhr.open("GET", "https://api.sumaokeji.com/sumao/api/bank/getOpenIdByCode?code=1000", true);
		if (cc.sys.isNative) {
			xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
		}
		// note: In Internet Explorer, the timeout property may be set only after calling the open()
		// method and before calling the send() method.
		xhr.timeout = 10000;// 10 seconds for timeout
		
		// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');  //设置为表单方式提交
		xhr.onreadystatechange = function () {  //绑定响应状态事件监听函数
			// console.log("------", xhr.readyState, xhr.status);
			if (xhr.readyState == 4) {  //监听readyState状态
				if (xhr.status == 200 || xhr.status == 0) {  //监听HTTP状态码
					console.log(xhr.responseText);  //接收数据
					let result = JSON.parse(xhr.responseText);
					console.log(result);
				}
			}
		}
		// xhr.send("callback=functionName");  //发送请求
		xhr.send();
		// this._xhrXHR = xhr;
	}

	
	getSign() {
		// let url = window.location.origin + window.location.pathname;

		let url = window.location.href.split('#')[0];

		console.log('---url', url);
        this.httpGet('getSign?', {
            url : encodeURIComponent(url)
        }, (json) => {
            if(json && json.status === 1000) {
                console.log('请求成功', json);
				weixinXX.hideMenu(json.data);
            } else {
				console.log('请求失败11', json);
                if(json && json.message) {
                }
            }
        }, () => {
            console.log('请求失败22');
        });

	}



	// https://api.sumaokeji.com/sumao/api/bank/getOpenldByCode?code=03111dml28ZAab4HeRkl29P8FY1L1dmg
	// https://changshubank.sumaokeji.com/index.html?code=03111dml28ZAab4HeRkl29P8FY1L1dmg
	httpGet(url, param, succ, fail, method?) {

		// https://api.sumaokeji.com/sumao/api/bank/getSign?url=https%3A%2F%2Fchangshubank.sumaokeji.com%2Findex.html

		console.log('---接口原始url', url);
		console.log('---接口原始param', param);
		// let source = 'https://api.sumaokeji.com/sumao/api/bank/';
		// let source = 'https://changshubank.sumaokeji.com/sumao/api/bank/';
		let source = 'https://bankapi.sumaokeji.com/sumao/api/bank/';
		
		url = source + url;
		for (let key in param) {
			url += key + '=' + param[key];
			url += '&'; 
		}
		url = url.substring(0,url.length-1);
		console.log("接口url:" + url);
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		['about', 'error', 'timeout'].forEach((eventname) => {
			xhr[`on${eventname}`] = () => {
				console.log('eventname :' + eventname);
				if (fail){
					fail(-1, 'network error');
				}
			};
		});
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;")
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				console.log('---结束后xhr', xhr);
				let data = xhr.responseText;
				let json;
				try {
					json = JSON.parse(data);
					console.log("HTTP GET:" + JSON.stringify(json));
					if (succ) {succ(json);}
				} catch (e) {
					cc.log(e);
				} finally {
					json = null;
				}
			}
		}
		xhr.send();
			
	}









}

export default new NetWork();


