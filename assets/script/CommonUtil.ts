

export enum ItemType {
	changlai = 'changlai',
	changwang = 'changwang'
}


export default class CommonUtil {
	/**
	 * @description: 生成随机数 [min, max]
	 */
	public static randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}