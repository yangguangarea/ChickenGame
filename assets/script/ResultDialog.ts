import { GameOverType } from "./CommonUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResultDialog extends cc.Component {

    @property(cc.Label)
    resultLabel: cc.Label = null;

    @property(cc.Node)
    resultContent1: cc.Node = null;

    @property(cc.Node)
    resultContent2: cc.Node = null;

    @property(cc.Node)
    resultContent3: cc.Node = null;

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

    initDialog(score:number, clickSuccessCount:number, gemeOverType:GameOverType) {

        if(gemeOverType === GameOverType.success) {
            this.resultLabel.string = `恭喜你!凭一己之力，共发现${score}只常来，获得一次幸运抽奖机会!`;
            this.resultContent1.active = true;
        } else if(gemeOverType === GameOverType.longTimeNoClick) {
            this.resultLabel.string = `很遗憾!连续10s中，你与所有常来擦肩而过，不慌再来!`;
            this.resultContent2.active = true;
        } else if(gemeOverType === GameOverType.timeOver){
            this.resultLabel.string = `挑战失败! 你一共发现${score}只常来，不要泄气，再来一局吧~`;
            this.resultContent3.active = true;
        }
    }
}