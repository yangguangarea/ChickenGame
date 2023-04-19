import CommonUtil, { ItemType } from "./CommonUtil";

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

    start () {

    }

    
    initGame(itemType:ItemType, cb:Function) {
        this.itemType = itemType;
        this.clickCallBack = cb;
        this.itemChangelai.active = false;
        this.itemChangewang.active = false;
        // 2-6秒移动至屏幕右侧  750/6----750/2
        this.moveSpeed = CommonUtil.randomNumber(Math.floor(750/6), Math.floor(750/2));
        if(itemType === ItemType.changlai) {
            this.itemChangelai.active = true;
        } else {
            this.itemChangewang.active = true;
        }
    }

    click() {
        this.clickCallBack && this.clickCallBack(this.id);
    }


    chooseCorrect() {
        this.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(()=> {
            this.node.destroy();
        })));
    }

    chooseError() {

    }

    // update(dt: number) {
    //     //当从屏幕左侧移动到右侧时，自动销毁

    // }

}
