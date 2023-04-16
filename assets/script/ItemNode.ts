import CommonUtil, { ItemType } from "./CommonUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemNode extends cc.Component {

    @property(cc.Node)
    itemChangelai: cc.Node = null;
    @property(cc.Node)
    itemChangewang: cc.Node = null;

    // onLoad () {}
    // itemType = 

    start () {

    }

    
    initGame(itemType:ItemType) {
        this.itemChangelai.active = false;
        this.itemChangewang.active = false;
        if(itemType === ItemType.changlai) {
            this.itemChangelai.active = true;
        } else {
            this.itemChangewang.active = true;
        }

        //初始化位置
        this.node.x = -(this.node.width / 2 + 30 + this.node.parent.width / 2);
        this.node.y = CommonUtil.randomNumber(- this.node.parent.height / 2, this.node.parent.height / 2);
    }

    update(dt: number) {
        //当从屏幕左侧移动到右侧时，自动销毁

    }

}
