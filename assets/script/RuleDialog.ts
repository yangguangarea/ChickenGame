const {ccclass, property} = cc._decorator;

@ccclass
export default class RuleDialog extends cc.Component {
    // onLoad () {}

    start () {

    }

    // update (dt) {}

    closeBtnClick() {
        console.log("----RuleDialog---closeBtnClick");
        this.node.destroy();
    }

}