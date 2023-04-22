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