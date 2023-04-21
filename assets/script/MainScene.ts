import AdsDialog from "./AdsDialog";
import AudioManager from "./AudioManager";
import { GameOverType, NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";
import GameManager from "./GameManager";
import ResultDialog from "./ResultDialog";
import TableDialog from "./TableDialog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Prefab)
    ruleDialogPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    resultDialogPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    tableDialogPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    adsDialogPrefab: cc.Prefab = null;
    
    //游戏节点
    @property(cc.Prefab)
    gameManagerPrefab: cc.Prefab = null;
    
    @property(cc.AudioClip)
    bgmAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    itemClickAudio: cc.AudioClip = null;

    gameManagerNode:cc.Node = null;

    onLoad () {
        EventManager.addListener(NOTI_NAME.SHOW_GAME_LAYER,this.showGameLayer,this);
        EventManager.addListener(NOTI_NAME.SHOW_RESULT_DIALOG,this.showResultDialog,this);
        EventManager.addListener(NOTI_NAME.SHOW_TABLE_DIALOG,this.showTableDialog,this);
        EventManager.addListener(NOTI_NAME.SHOW_ADS_DIALOG,this.showAdsDialog,this);
        EventManager.addListener(NOTI_NAME.CLOSE_DIALOG,this.closeDialog,this);
    }
    onDestroy() {
        EventManager.removeListener(NOTI_NAME.SHOW_GAME_LAYER,this.showGameLayer,this);
        EventManager.removeListener(NOTI_NAME.SHOW_RESULT_DIALOG,this.showResultDialog,this);
        EventManager.removeListener(NOTI_NAME.SHOW_TABLE_DIALOG,this.showTableDialog,this);
        EventManager.removeListener(NOTI_NAME.SHOW_ADS_DIALOG,this.showAdsDialog,this);
        EventManager.removeListener(NOTI_NAME.CLOSE_DIALOG,this.closeDialog,this);
    }


    

    start () {
        //默认播放音乐
        // setTimeout(() => {
        //     this.musicBtnClick();
        // }, 1000);

        let menuLayer = this.node.getChildByName('menuLayer');
        menuLayer.getChildByName('btnRule1').active = true;
        menuLayer.getChildByName('btnMusic1').active = true;
        menuLayer.getChildByName('btnRule2').active = false;
        menuLayer.getChildByName('btnMusic2').active = false;
        this.loadingLayerAni();
    }

    // update (dt) {}

    testBtnClick1() {
        this.showResultDialog(10, 1, GameOverType.success);
        
        // this.showResultDialog(8, 1, GameOverType.longTimeNoClick);
    }

    testBtnClick2() {
        // this.showResultDialog(9, 1, GameOverType.timeOver);
        EventManager.dispatchEvent(NOTI_NAME.SHOW_TABLE_DIALOG);
    }

    loadingLayerAni() {
        let btnBegin = this.node.getChildByName('loadLayer').getChildByName('btnBegin');
        btnBegin.runAction(cc.sequence(cc.scaleTo(0.3, 1.1), cc.scaleTo(0.3, 1)).repeatForever());
    }

    //游戏规则点击
    ruleBtnClick() {
        console.log("游戏规则点击");
        let ruleContent = this.node.getChildByName('ruleContent');
        // ruleContent.removeAllChildren();
        for (const children of ruleContent.children) {
            children.destroy();
        }
        let ruleDialog = cc.instantiate(this.ruleDialogPrefab);
        ruleContent.addChild(ruleDialog);
    }

    showResultDialog(score:number, clickSuccessCount:number, gemeOverType:GameOverType) {
        let resultDialogContent = this.node.getChildByName('resultDialogContent');
        // resultDialogContent.removeAllChildren();
        for (const children of resultDialogContent.children) {
            children.destroy();
        }
        let resultDialog = cc.instantiate(this.resultDialogPrefab);
        resultDialog.getComponent(ResultDialog).initDialog(score, clickSuccessCount, gemeOverType);
        resultDialogContent.addChild(resultDialog);
    }

    showTableDialog() {
        let tableDialogContent = this.node.getChildByName('tableDialogContent');
        // tableDialogContent.removeAllChildren();
        for (const children of tableDialogContent.children) {
            children.destroy();
        }
        let tableDialog = cc.instantiate(this.tableDialogPrefab);
        tableDialog.getComponent(TableDialog).initDialog();
        tableDialogContent.addChild(tableDialog);
    }

    showAdsDialog() {
        let adsDialogContent = this.node.getChildByName('adsDialogContent');
        // adsDialogContent.removeAllChildren();
        for (const children of adsDialogContent.children) {
            children.destroy();
        }
        let adsDialog = cc.instantiate(this.adsDialogPrefab);
        adsDialog.getComponent(AdsDialog).initDialog();
        adsDialogContent.addChild(adsDialog);
    }


    closeDialog(dialogMap) {
        // let dialogMap = {
        //     resultDialog: true,
        //     tableDialog: true,
        //     adsDialog: true,
        // }
        if(!dialogMap)return;
        if(dialogMap.resultDialog === true) {
            let resultDialogContent = this.node.getChildByName('resultDialogContent');
            for (const children of resultDialogContent.children) {
                children.destroy();
            }
        }
        if(dialogMap.tableDialog === true) {
            let tableDialogContent = this.node.getChildByName('tableDialogContent');
            for (const children of tableDialogContent.children) {
                children.destroy();
            }
        }
        if(dialogMap.adsDialog === true) {
            let adsDialogContent = this.node.getChildByName('adsDialogContent');
            for (const children of adsDialogContent.children) {
                children.destroy();
            }
        }
    }
    
    //游戏开始点击
    gameBeginClick() {
        console.log("游戏开始点击");
        this.showGameLayer();
        // this.ruleBtnClick();
    }

    showGameLayer() {
        let loadLayer = this.node.getChildByName('loadLayer');
        loadLayer.active = false;
        let menuLayer = this.node.getChildByName('menuLayer');
        menuLayer.getChildByName('btnRule1').active = false;
        menuLayer.getChildByName('btnMusic1').active = false;
        menuLayer.getChildByName('btnRule2').active = true;
        menuLayer.getChildByName('btnMusic2').active = true;

        EventManager.dispatchEvent(NOTI_NAME.CLOSE_DIALOG, {
            resultDialog: true,
            tableDialog: true,
        });

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

