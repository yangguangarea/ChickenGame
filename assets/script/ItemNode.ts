import CommonUtil, { ItemType, NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemNode extends cc.Component {

    @property(cc.Node)
    itemChangelai: cc.Node = null;
    @property(cc.Node)
    itemChangewang: cc.Node = null;

    itemType:ItemType = null;

    moveSpeed = 0;//向右的移动速度

    clickCallBack:Function = null;//点击后的回调函数

    id = '';
    gameManager:GameManager = null;

    isDead:boolean = false;//是否处于点中销毁过程

    onLoad() {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }
    onDestroy() {
        // this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start () {

    }
    
    initGame(itemType:ItemType, cb:Function, gameManager:GameManager) {
        this.itemType = itemType;
        this.clickCallBack = cb;
        this.itemChangelai.active = false;
        this.itemChangewang.active = false;
        this.gameManager = gameManager;
        // 2-6秒移动至屏幕右侧  750/6----750/2
        this.moveSpeed = CommonUtil.randomNumber(Math.floor(750/6), Math.floor(750/2));

        if(CommonUtil.randomNumber(1, 5) >= 3) {
            this.itemType = ItemType.changlai;
            this.itemChangelai.active = true;
            this.itemChangelai.getChildByName('aniNode').getComponent(cc.Animation).play();
        } else {
            this.itemType = ItemType.changwang;
            this.itemChangewang.active = true;
            this.itemChangewang.getChildByName('aniNode').getComponent(cc.Animation).play();
        }
    }

    click() {
        console.log("-----点中了", this.itemType);
        if(this.itemType === ItemType.changlai) {
            EventManager.dispatchEvent(NOTI_NAME.PLAY_ITEM_CLICK_AUDIO, true);
        } else {
            EventManager.dispatchEvent(NOTI_NAME.PLAY_ITEM_CLICK_AUDIO);
        }
        
        this.clickCallBack && this.clickCallBack(this.id);
    }

    chooseCorrect() {
        this.isDead = true;
        this.node.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(()=> {
            this.node.destroy();
        })));
    }

    chooseError() {

    }

    update(dt: number) {
        //当从屏幕左侧移动到右侧时，自动销毁
        if(!this.gameManager || !this.gameManager.isPlaying) return;
        if(this.isDead) return;

        //每一帧进行位移
        this.node.x += this.moveSpeed * dt;
        //移出屏幕外的进行销毁
        if(this.node.x > this.gameManager.gameContent.width / 2 + this.node.width / 2 + 50) {
            if(this.isDead) {

            } else {
                this.gameManager.destoryOneItem(this.id);
                this.node.removeFromParent();
            }
        }
    }

}
