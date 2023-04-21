import { GameOverType } from "./CommonUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TableDialog extends cc.Component {

    @property(cc.Node)
    tableNode: cc.Node = null;

    @property(cc.Node)
    lightNode: cc.Node = null;
    

    isStartReward: boolean = false;//是否处于抽奖

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
        this.lightNode.active = false;
        this.addLightAni();
    }

    addLightAni() {
        let pos1Array = [{x: 1.8, y: 236}, {x: 1.8, y: -231}, {x: -233, y: 1.3}, {x: 234, y: 1.3}];
        let pos2Array = [{x: -165, y: 166}, {x: 165, y: 166}, {x: -165, y: -163}, {x: 165, y: -163}];

        for (const pos of pos1Array) {
            let lightNode = cc.instantiate(this.lightNode);
            lightNode.active = true;
            lightNode.setPosition(pos.x, pos.y);
            let yellow = lightNode.getChildByName('tableDialog_sp_light_yellow');
            let white = lightNode.getChildByName('tableDialog_sp_light_white');
            this.tableNode.addChild(lightNode, 1);

            lightNode.runAction(cc.sequence(cc.callFunc(()=> {
                yellow.active = true;
                white.active = false;
            }), cc.delayTime(0.3), cc.callFunc(()=> {
                yellow.active = false;
                white.active = true;
            }), cc.delayTime(0.3)).repeatForever());
        }

        for (const pos of pos2Array) {
            let lightNode = cc.instantiate(this.lightNode);
            lightNode.active = true;
            lightNode.setPosition(pos.x, pos.y);
            let yellow = lightNode.getChildByName('tableDialog_sp_light_yellow');
            let white = lightNode.getChildByName('tableDialog_sp_light_white');
            this.tableNode.addChild(lightNode, 1);

            lightNode.runAction(cc.sequence(cc.callFunc(()=> {
                yellow.active = false;
                white.active = true;
            }), cc.delayTime(0.3), cc.callFunc(()=> {
                yellow.active = true;
                white.active = false;
            }), cc.delayTime(0.3)).repeatForever());
        }

    }


    //抽奖
    drawBtnClick() {
        //先打开市民贷10秒倒计时弹窗
        //关闭弹窗，转盘开始转

        //默认逆时针旋转

        // 360/16
        let reward = '16.88';
        let rewardMap = [1.68, 8.88, 2.68, 5.88, '谢谢参与', 16.88, 1.68, 2.68]

        let rotate = 0;
        for (let i = 0; i < rewardMap.length; i++) {
            if(`${rewardMap[i]}` === `${reward}`) {
                // rotate = 22.5 + 45 * i + 360 * 2;
                rotate = -22.5 - 45 * i - 360 * 2;
                console.log("-----旋转的是", i, rewardMap[i]);
            }
        }
        
        console.log("----rotate", rotate);
        this.isStartReward = true;
        this.tableNode.runAction(cc.sequence(cc.rotateBy(2, rotate).easing(cc.easeCubicActionOut()), cc.delayTime(0.5), cc.callFunc(()=> {
            //弹出中奖金额弹窗
            this.isStartReward = false;
        })));
    }

    //了解贷款
    jumpBtnClick() {

    }

    //中奖记录
    recordBtnClick() {

    }


}