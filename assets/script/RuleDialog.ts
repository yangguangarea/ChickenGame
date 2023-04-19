const {ccclass, property} = cc._decorator;

@ccclass
export default class RuleDialog extends cc.Component {
    onLoad () {

    }

    onDestroy() {

    }

    start () {
        let content = this.node.getChildByName('content');
        content.opacity = 0;
        content.scale = 1.2;
        content.runAction(cc.spawn(cc.scaleTo(0.2, 1, 1), cc.fadeIn(0.2)));

        let bg_grey = this.node.getChildByName('bg_grey');
        bg_grey.opacity = 0;
        bg_grey.runAction(cc.fadeTo(0.2, 155));
    }

    closeBtnClick() {
        console.log("----RuleDialog---closeBtnClick");
        let content = this.node.getChildByName('content');
        content.scale = 1;
        content.opacity = 255;
        content.runAction(
            // cc.sequence(cc.delayTime(delayTime), 
            cc.sequence(cc.spawn(cc.scaleTo(0.2, 1.2, 1.2), cc.fadeOut(0.2)), cc.callFunc(()=> {
                this.node.destroy();
            }))
        );

        let bg_grey = this.node.getChildByName('bg_grey');
        bg_grey.runAction(cc.fadeTo(0.2, 0));
    }

}