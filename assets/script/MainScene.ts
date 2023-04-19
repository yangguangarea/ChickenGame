import AudioManager from "./AudioManager";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Prefab)
    ruleDialogPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    resultDialogPrefab: cc.Prefab = null;
    
    //游戏节点
    @property(cc.Prefab)
    gameManagerPrefab: cc.Prefab = null;
    
    @property(cc.AudioClip)
    bgmAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    itemClickAudio: cc.AudioClip = null;

    gameManagerNode:cc.Node = null;

    // onLoad () {}

    start () {
        //默认播放音乐
        // setTimeout(() => {
        //     this.musicBtnClick();
        // }, 1000);
    }

    // update (dt) {}

    testBtnClick1() {
        this.showResultDialog();
    }

    testBtnClick2() {
        
    }

    //游戏规则点击
    ruleBtnClick() {
        console.log("游戏规则点击");
        let ruleContent = this.node.getChildByName('ruleContent');
        ruleContent.removeAllChildren();

        let ruleDialog = cc.instantiate(this.ruleDialogPrefab);
        ruleContent.addChild(ruleDialog);
    }

    showResultDialog() {
        let resultDialogContent = this.node.getChildByName('resultDialogContent');
        resultDialogContent.removeAllChildren();

        let resultDialog = cc.instantiate(this.resultDialogPrefab);
        resultDialogContent.addChild(resultDialog);
    }

    //游戏开始点击
    gameBeginClick() {
        console.log("游戏开始点击");
        let loadLayer = this.node.getChildByName('loadLayer');
        loadLayer.active = false;
        let gameLayer = this.node.getChildByName('gameLayer');
        if(this.gameManagerNode) {
            gameLayer.active = true;
            let gameManager = this.gameManagerNode.getComponent(GameManager);
            gameManager.initGame();
        } else {
            gameLayer.removeAllChildren();
            this.gameManagerNode = cc.instantiate(this.gameManagerPrefab);
            gameLayer.addChild(this.gameManagerNode);
        }
    }


    //音乐开关点击
    musicBtnClick() {
        console.log("音乐开关点击");
        if(AudioManager.isPlayBGM()) {
            AudioManager.stopBGM();
        } else {
            AudioManager.playBGM(this.bgmAudio, true);
        }
    }

    //播放点击item音效
    playItemClickAudio() {
        AudioManager.playEffectMusic(this.itemClickAudio);
    }

}

