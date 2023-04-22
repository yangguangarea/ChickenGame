import { NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RuleDialog extends cc.Component {


    isCloseStartGame = false;//关闭弹窗时是否开始游戏
    onLoad () {

    }

    onDestroy() {

    }

    start () {
        // let content = this.node.getChildByName('content');
        // content.opacity = 0;
        // content.scale = 1.2;
        // content.runAction(cc.spawn(cc.scaleTo(0.2, 1, 1), cc.fadeIn(0.2)));

        // let bg_grey = this.node.getChildByName('bg_grey');
        // bg_grey.opacity = 0;
        // bg_grey.runAction(cc.fadeTo(0.2, 155));

        let content = this.node.getChildByName('content');
        content.scale = 0;
        content.opacity = 255;
        cc.tween(content)
        .to(0.2, {scale: 1.1})
        .to(0.1, {scale: 1})
        .start();

    }

    initDialog(isCloseStartGame) {
        if(isCloseStartGame === true) {
            this.isCloseStartGame = true;
        }
    }

    closeBtnClick() {
        // console.log("----RuleDialog---closeBtnClick");
        // let content = this.node.getChildByName('content');
        // content.scale = 1;
        // content.opacity = 255;
        // content.runAction(
        //     // cc.sequence(cc.delayTime(delayTime), 
        //     cc.sequence(cc.spawn(cc.scaleTo(0.2, 1.2, 1.2), cc.fadeOut(0.2)), cc.callFunc(()=> {
        //         this.node.destroy();
        //     }))
        // );

        // let bg_grey = this.node.getChildByName('bg_grey');
        // bg_grey.runAction(cc.fadeTo(0.2, 0));

        let content = this.node.getChildByName('content');
        content.scale = 1;
        cc.tween(content)
        .to(0.3, {scale: 0},  {easing: 'quadOut'})
        .call(() => {
            // this.contentNode.scale = 1;
            if(this.isCloseStartGame) {
                EventManager.dispatchEvent(NOTI_NAME.SHOW_GAME_LAYER);
            }
            this.node.destroy();
        } )
        .start();

    }

}