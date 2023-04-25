import { GameOverType, NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";
import NetWork from "./NetWork";
import weixinXX, { getCurrentPages } from "./weixin";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PrizeDialog extends cc.Component {
    @property(cc.Node)
    failNode: cc.Node = null;

    @property(cc.Node)
    succNode: cc.Node = null;

    @property(cc.Node)
    recordNode: cc.Node = null;

    onLoad() {
        EventManager.dispatchEvent(NOTI_NAME.TABLE_DIALOG_VISIBLE, false);
    }

    onDestroy() {
        EventManager.dispatchEvent(NOTI_NAME.TABLE_DIALOG_VISIBLE, true);
    }

    start () {
        let content = this.node.getChildByName('content');
        content.scale = 0;
        content.opacity = 255;
        cc.tween(content)
        .to(0.2, {scale: 1.1})
        .to(0.1, {scale: 1})
        .start();

        this.scheduleOnce(()=> {
            weixinXX.addJumpBtn4();
        }, 0.3);
    }

    closeBtnClick() {
        let content = this.node.getChildByName('content');
        content.scale = 1;
        weixinXX.removeJumpBtn2();
        cc.tween(content)
        .to(0.3, {scale: 0},  {easing: 'quadOut'})
        .call(() => {
            // this.contentNode.scale = 1;
            this.node.destroy();
        } )
        .start();

        //关闭弹窗，转盘开始转
        // EventManager.dispatchEvent(NOTI_NAME.CLOSE_DIALOG, {
        //     adsDialog: true,
        // });
    }

    initDialog(type:string, param1, param2) {
        //发送接口获取记录
        this.failNode.active = false;
        this.succNode.active = false;
        this.recordNode.active = false;
        
        if(type === 'failNode') {
            this.failNode.active = true;
        } else if(type === 'succNode') {
            this.succNode.active = true;
            this.succNode.getChildByName('prizeCountLabel').getComponent(cc.Label).string = `${param1}元`;
        } else if(type === 'recordNode') {
            this.recordNode.active = true;
            //转换时间戳
            // 2023/4/3 12:53
            if(param1 === '0') {
                this.recordNode.getChildByName('prizeLabel').getComponent(cc.Label).string = '';
                this.recordNode.getChildByName('timeLabel').getComponent(cc.Label).string = '';
            } else {
                this.recordNode.getChildByName('prizeLabel').getComponent(cc.Label).string = `${param1}元红包`;
                this.recordNode.getChildByName('timeLabel').getComponent(cc.Label).string = `${param2}`;
            }
        }
    }

    jumpBtnClick() {
        //跳转外部

    }
}