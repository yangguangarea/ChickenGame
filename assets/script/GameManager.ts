import CommonUtil, { ItemType } from "./CommonUtil";
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

    chooseItemType:ItemType = ItemType.changlai;//选择点击的常来常往类型

    maxTime = 60;
    gameTime = 60;//游戏剩余时间

    clickTime = 0;//游戏累计无操作时间
    score = 0;

    clickErrCount = 0;//累计点击错误次数
    clickErrMaxCount = 3;//最大允许点击错误次数

    isPlaying = false;//游戏是否进行中

    maxItemCount = 8;//最大的item存在数量

    checkTickTime = 0;
    checkTickTimeMax = 0.3;//检测生成item的时间间隔
    itemMap = {};
    itemCount = 0;
    itemIdIndex = 0;

    // onLoad () {}

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

        //清除所有存在的item
        this.gameContent.removeAllChildren();
        this.itemMap = {};
        this.itemCount = 0;
        this.itemIdIndex = 0;

    }

    chooseChanglai() {
        this.chooseItemType = ItemType.changlai;
        this.readyBegin.active = false;
        this.startGame();
    }

    chooseChangwang() {
        this.chooseItemType = ItemType.changwang;
        this.readyBegin.active = false;
        this.startGame();
    }


    //开始游戏
    startGame() {
        this.isPlaying = true;
    }

    finishGame() {
        this.isPlaying = false;
    }

    clickItemCb(itemId:string) {
        //点击item后进行销毁
        if(!this.isPlaying) return;
        let item:ItemNode = this.itemMap[itemId];
        if(item) {
            if(item.itemType === this.chooseItemType) {
                //选择正确加分，销毁
                delete this.itemMap[item.id];
                this.itemCount--;
                item.chooseCorrect();
                this.score++;
            } else {
                this.clickErrCount++;
                if(this.clickErrCount >= this.clickErrMaxCount) {
                    this.finishGame();
                }

                //选择错误随机移动所有item位置
                
            }
        }
        // this.itemMap[itemId] as ItemNode = ;

    }

    update (dt:number) {
        if(!this.isPlaying) return;
        this.clickTime += dt;
        //游戏超过10秒没操作游戏结束
        if(this.clickTime >= 10) {
            this.finishGame();
        }

        //倒计时结束
        this.gameTime -= dt;
        if(this.gameTime <= 0) {
            this.timeLabel.string = `${0}秒`;
            this.finishGame();
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
                item.initGame(this.chooseItemType, this.clickItemCb);
                this.gameContent.addChild(itemNode);
                
                console.log('-----生成了一个', this.itemCount);
                //初始化位置
                itemNode.x = -(itemNode.width / 2 + 30 + this.gameContent.width / 2);
                itemNode.y = CommonUtil.randomNumber(- this.gameContent.height / 2, this.gameContent.height / 2);

                this.itemCount++;
                this.itemIdIndex++;
                this.itemMap[`id${this.itemIdIndex}`] = item;
                item.id = `id${this.itemIdIndex}`;
            }
        }

        // //每一帧进行位移
        // for (const id in this.itemMap) {
        //     const item:ItemNode = this.itemMap[id];

        //     //需要判断item状态
        //     item.node.x += item.moveSpeed * dt;
        //     //移出屏幕外的进行销毁
        //     if(item.node.x > this.gameContent.width / 2 + item.node.width / 2 + 50) {
        //         item.node.removeFromParent();
        //         delete this.itemMap[id];
        //         this.itemCount--;
        //     }
        // }
    }


}
