const {ccclass, property} = cc._decorator;

@ccclass
export default class ResultDialog extends cc.Component {

    
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


    
    //恭喜你!凭一己之力，共发现X只常来，获得一次幸运抽奖机会!
    //挑战失败! 你一共发现Y只常来，不要泄气，再来一局吧~
    //很遗憾!连续10s中，你与所有常来擦肩而过，不慌再来!

}