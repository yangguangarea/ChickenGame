import { GameOverType, NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdsDialog extends cc.Component {
    onLoad() {
        console.log('------AdsDialog__onLoad');
        EventManager.dispatchEvent(NOTI_NAME.TABLE_DIALOG_VISIBLE, false);
    }

    onDestroy() {
        console.log('------AdsDialog__onDestroy');
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
    }

    closeBtnClick() {
        let content = this.node.getChildByName('content');
        content.scale = 1;
        cc.tween(content)
        .to(0.3, {scale: 0},  {easing: 'quadOut'})
        .call(() => {
            // this.contentNode.scale = 1;
            this.node.destroy();
        } )
        .start();
    }

    initDialog() {

    }

    getBtnClick() {
        //关闭弹窗，转盘开始转
        EventManager.dispatchEvent(NOTI_NAME.ROTATE_TABLE);
        EventManager.dispatchEvent(NOTI_NAME.CLOSE_DIALOG, {
            adsDialog: true,
        });
    }
}