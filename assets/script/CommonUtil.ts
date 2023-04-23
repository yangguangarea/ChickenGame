

export enum ItemType {
	changlai = 'changlai',
	changwang = 'changwang'
}

export const NOTI_NAME = {
	SHOW_TOAST: "SHOW_TOAST", //展示toast
	SHOW_RESULT_DIALOG: "SHOW_RESULT_DIALOG",
	SHOW_GAME_LAYER: "SHOW_GAME_LAYER",
	SHOW_TABLE_DIALOG: "SHOW_TABLE_DIALOG",
	INIT_GAME: "INIT_GAME",
	CLOSE_DIALOG: "CLOSE_DIALOG",
	SHOW_ADS_DIALOG: "SHOW_ADS_DIALOG",
	ROTATE_TABLE: 'NOTI_NAME.ROTATE_TABLE',
	TABLE_DIALOG_VISIBLE: 'TABLE_DIALOG_VISIBLE',
	SHOW_PRIZE_DIALOG: 'SHOW_PRIZE_DIALOG',
	PLAY_ITEM_CLICK_AUDIO: 'PLAY_ITEM_CLICK_AUDIO',
};

export enum GameOverType {
	timeOver = 'timeOver',//倒计时结束
	longTimeNoClick = 'longTimeNoClick',//10秒没操作
	success = 'success',
	clickFail = 'clickFail',//选错三次
}

export default class CommonUtil {
	/**
	 * @description: 生成随机数 [min, max]
	 */
	public static randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	
	public static  getparam1(params){
		let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		return queryString;
	}

	public static  getparam2(obj){
		var arr = Object.keys(obj);
		var str = "?";
		for(var i in obj){
			str += i;
			str += "=";
			str += obj[i];
			str += "&";
		}
		// str = str.substr(0,str.length-1);
		return str;
	}

	public static jumpOtherWebview(url) {
		// window.location.href = url;
		// window.open(url);
	}

	//提取参数中的指定内容
	public static getParam = (url, name) => {
		if(url.indexOf('?') === -1) {
			return null;
		}
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = url.split("?")[1].match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	};
}