

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
}