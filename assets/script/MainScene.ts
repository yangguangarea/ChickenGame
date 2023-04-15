// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    @property(cc.Prefab)
    ruleDialog: cc.Prefab = null;
    
    
    text: string = 'hello';

    // onLoad () {}

    start () {

    }

    // update (dt) {}



    //游戏规则点击
    ruleBtnClick() {
        console.log("游戏规则点击");

        let ruleContent = this.node.getChildByName('ruleContent');
        ruleContent.removeAllChildren();

        let ruleDialog = cc.instantiate(this.ruleDialog);
        ruleContent.addChild(ruleDialog);
    }

    //音乐开关点击
    musicBtnClick() {
        console.log("音乐开关点击");
    }

    //游戏开始点击
    gameBeginClick() {
        console.log("游戏开始点击");
    }

}

//公众号，接入微信，获取用户昵称和头像，openid

//https://modao.cc/app/cwWMTOsdrszq58XEfE0uEW#screen=slcg13rw83mlgdce9jz8nlzyx