import { NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";
import UIUtil from "./UIUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Toast extends cc.Component {
    @property(cc.Label)
    toastLabel: cc.Label = null;

    @property(cc.Sprite)
    toastBg: cc.Sprite = null;

    onLoad () {
        EventManager.addListener(NOTI_NAME.SHOW_TOAST, this.showText, this);
    }

    onDestroy () {
        EventManager.removeListener(NOTI_NAME.SHOW_TOAST, this.showText, this);
    }

    start () {
        this.toastLabel.node.active = false;
        this.toastBg.node.active = false;
    }
    /**
     * @param text 要显示的文字
     * @param duration 显示时间. 默认值为500ms
     * @param zIndex 节点层级
     */
    showText(text: string, duration:number = 1500, zIndex?) {
        this.toastLabel.node.active = true;
        this.toastBg.node.active = true;

        if (zIndex) {
            this.node.parent.zIndex = zIndex;
        }

        let labelSize = UIUtil.measureSize(text, cc.size(600, 0), this.toastLabel.fontSize, this.toastLabel.lineHeight);
        this.toastLabel.node.setContentSize(labelSize);
        this.toastLabel.string = text;
        this.toastLabel._forceUpdateRenderData();
        setTimeout(() => {
        }, 500);
        
        this.toastBg.node.setContentSize(this.toastLabel.node.width + 20, this.toastLabel.node.height + 20);
        
        this.runAction(this.toastLabel.node, duration);
        this.runAction(this.toastBg.node, duration);
    }

    runAction(node:cc.Node, duration:number){
        if(!node) return;
        node.stopAllActions();
        duration /= 1000;
        node.opacity = 0;
        cc.tween(node)
        .to(0.1, {opacity: 255})
        .delay(duration)
        .to(0.1, {opacity: 0}).start();
    }
}
