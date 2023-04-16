
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)
    readyBegin: cc.Node = null;

    @property(cc.Node)
    gameContent: cc.Node = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    maxTime = 60;
    gameTime = 60;//游戏剩余时间

    clickTime = 0;//游戏累计无操作时间
    score = 0;

    clickErrCount = 0;//累计点击错误次数
    clickErrMaxCount = 3;//最大允许点击错误次数

    isPlaying = false;//游戏是否进行中

    // onLoad () {}

    start () {
        this.initGame();
    }

    //初始化游戏
    initGame() {
        this.gameTime = this.maxTime;
        this.score = 0;
        this.clickErrCount = 0;
        this.timeLabel.string = `${this.maxTime}秒`;
        this.scoreLabel.string = `x${this.score}`;
        this.readyBegin.active = true;
        //延迟一秒后消失
        this.readyBegin.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(()=> {
            this.readyBegin.active = false;
            this.startGame();
        })));

        //清除所有存在的item
        this.gameContent.removeAllChildren();
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

    }

    //开始游戏
    startGame() {
        this.isPlaying = true;
    }

    finishGame() {
        this.isPlaying = false;
    }
}
