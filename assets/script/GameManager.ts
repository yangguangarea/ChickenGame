import CommonUtil, { GameOverType, ItemType, NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";
import ItemNode from "./ItemNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Prefab)
    itemNodePrefab: cc.Prefab = null;

    @property(cc.Node)
    readyBegin: cc.Node = null;

    @property(cc.Node)
    gameContent: cc.Node = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Node)
    changlaiTipNode: cc.Node = null;

    @property(cc.Node)
    changwangTipNode: cc.Node = null;

    @property(cc.Node)
    gameStartTip: cc.Node = null;
    

    chooseItemType:ItemType = ItemType.changlai;//选择点击的常来常往类型

    maxTime = 15;
    gameTime = 15;//游戏剩余时间

    clickTime = 0;//游戏累计无操作时间
    score = 0;

    clickErrCount = 0;//累计点击错误次数
    clickErrMaxCount = 3;//最大允许点击错误次数
    clickSuccessCount = 8;//判定是否成功的最低选中次数

    isPlaying = false;//游戏是否进行中

    maxItemCount = 8;//最大的item存在数量

    checkTickTime = 0;
    checkTickTimeMax = 0.66;//检测生成item的时间间隔

    changlaiLeftCount = 15;//常来剩余数量 一场游戏最多只能有这部分常来

    itemMap = {};
    itemCount = 0;
    itemIdIndex = 0;

    onLoad () {
        EventManager.addListener(NOTI_NAME.INIT_GAME,this.initGame,this);
    }

    onDestroy() {
        EventManager.removeListener(NOTI_NAME.INIT_GAME,this.initGame,this);
    }

    start () {
        this.initGame();
    }

    //初始化游戏
    initGame() {
        this.gameTime = this.maxTime;
        this.score = 0;
        this.clickErrCount = 0;
        this.clickTime = 0;
        this.isPlaying = false;
        this.timeLabel.string = `${this.maxTime}秒`;
        this.scoreLabel.string = `x${this.score}`;
        this.readyBegin.active = true;
        //延迟一秒后消失
        // this.readyBegin.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(()=> {
        //     this.readyBegin.active = false;
        //     this.startGame();
        // })));

        this.checkTickTime = 0;

        this.changlaiLeftCount = CommonUtil.randomNumber(10, 18);

        //清除所有存在的item
        this.gameContent.removeAllChildren();
        this.itemMap = {};
        this.itemCount = 0;
        this.itemIdIndex = 0;
        
        this.readyTip();
    }

    chooseChanglai() {
        // this.chooseItemType = ItemType.changlai;
        // this.readyBegin.active = false;
        // this.startGame();
    }

    chooseChangwang() {
        //目前都是常来
        // this.chooseItemType = ItemType.changwang;
        // this.readyBegin.active = false;
        // this.startGame();
    }

    //进入游戏界面后常来常往先位移进场，然后1s后显示游戏开始提示，然后startGame
    readyTip() {
        this.readyBegin.active = true;
        this.changlaiTipNode.x = -570;
        this.changlaiTipNode.runAction(cc.moveTo(0.6, cc.v2(-170, this.changlaiTipNode.y)).easing(cc.easeCubicActionOut()));

        this.changwangTipNode.x = 570;
        this.changwangTipNode.runAction(cc.moveTo(0.6, cc.v2(168, this.changwangTipNode.y)).easing(cc.easeCubicActionOut()));

        this.gameStartTip.opacity = 0;
        this.gameStartTip.getChildByName('countdown_sp_3').active = true;
        this.gameStartTip.getChildByName('countdown_sp_2').active = false;
        this.gameStartTip.getChildByName('countdown_sp_1').active = false;

        this.gameStartTip.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeIn(0.3), cc.delayTime(1), cc.callFunc(()=> {
            this.gameStartTip.getChildByName('countdown_sp_3').active = false;
            this.gameStartTip.getChildByName('countdown_sp_2').active = true;
        }), cc.delayTime(1), cc.callFunc(()=> {
            this.gameStartTip.getChildByName('countdown_sp_2').active = false;
            this.gameStartTip.getChildByName('countdown_sp_1').active = true;
        }), cc.delayTime(1), cc.callFunc(()=> {
            this.readyBegin.active = false;
            this.chooseItemType = ItemType.changlai;
            this.startGame();
        })));
    }

    //开始游戏
    startGame() {
        this.isPlaying = true;
    }

    finishGame(gemeOverType: GameOverType) {
        this.isPlaying = false;
        //弹出弹窗 改成发通知方式
        if(gemeOverType === GameOverType.timeOver) {
            if(this.score >= this.clickSuccessCount) {
                EventManager.dispatchEvent(NOTI_NAME.SHOW_RESULT_DIALOG, this.score, this.clickSuccessCount, GameOverType.success);
            } else {
                EventManager.dispatchEvent(NOTI_NAME.SHOW_RESULT_DIALOG, this.score, this.clickSuccessCount, GameOverType.timeOver);
            }
        } else if(gemeOverType === GameOverType.longTimeNoClick) {
            if(this.score >= this.clickSuccessCount) {
                EventManager.dispatchEvent(NOTI_NAME.SHOW_RESULT_DIALOG, this.score, this.clickSuccessCount, GameOverType.success);
            } else if(this.score === 0) {
                EventManager.dispatchEvent(NOTI_NAME.SHOW_RESULT_DIALOG, this.score, this.clickSuccessCount, GameOverType.longTimeNoClick);
            } else {
                EventManager.dispatchEvent(NOTI_NAME.SHOW_RESULT_DIALOG, this.score, this.clickSuccessCount, GameOverType.timeOver);
            }
        }
    }

    clickItemCb(itemId:string) {
        //点击item后进行销毁
        if(!this.isPlaying) return;
        this.clickTime = 0;
        let item:ItemNode = this.itemMap[itemId];
        if(item) {
            if(item.itemType === this.chooseItemType) {
                //选择正确加分，销毁
                delete this.itemMap[item.id];
                this.itemCount--;
                item.chooseCorrect();
                this.score++;
                this.scoreLabel.string = `x${this.score}`;
            } else {
                this.clickErrCount++;
                if(this.clickErrCount >= this.clickErrMaxCount) {
                    // this.finishGame(GameOverType.clickFail);
                }
                //选择错误随机移动所有item位置
            }
        }
    }

    destoryOneItem(id) {
        delete this.itemMap[id];
        this.itemCount--;
    }

    update (dt:number) {
        if(!this.isPlaying) return;
        this.clickTime += dt;
        //游戏超过10秒没操作游戏结束
        if(this.clickTime >= 10) {
            this.finishGame(GameOverType.longTimeNoClick);
        }

        //倒计时结束
        this.gameTime -= dt;
        if(this.gameTime <= 0) {
            this.timeLabel.string = `${0}秒`;
            this.finishGame(GameOverType.timeOver);
        } else {
            this.timeLabel.string = `${Math.floor(this.gameTime)}秒`;
        }

        this.checkTickTime+=dt;
        if(this.checkTickTime > this.checkTickTimeMax) {
            this.checkTickTime = 0;
            //检测是否可以生成一个item

            if(this.itemCount < this.maxItemCount) {
                let itemNode = cc.instantiate(this.itemNodePrefab);
                let item = itemNode.getComponent(ItemNode);
                item.initGame(this.chooseItemType, this.clickItemCb.bind(this), this);
                this.gameContent.addChild(itemNode);
                
                //todo 常来出现数量超过这个数，就全都只出现常往
                // if(item.itemType === ItemType.changlai) {
                //     this.changlaiLeftCount--;
                // }
                // if(this.changlaiLeftCount <= 0) {

                // }

                // console.log('-----生成了一个', this.itemCount);
                //初始化位置
                itemNode.x = -(itemNode.width / 2 + 30 + this.gameContent.width / 2);
                itemNode.y = CommonUtil.randomNumber(- this.gameContent.height / 2, this.gameContent.height / 2);

                this.itemCount++;
                this.itemIdIndex++;
                this.itemMap[`id${this.itemIdIndex}`] = item;
                item.id = `id${this.itemIdIndex}`;

                //重新排序，y高的zindex小
                this.gameContent.children.sort((a, b)=> {
                    return b.y - a.y;
                });
            }
        }
    }
}
