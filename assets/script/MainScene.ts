import AdsDialog from "./AdsDialog";
import AudioManager from "./AudioManager";
import CommonUtil, { GameOverType, NOTI_NAME } from "./CommonUtil";
import EventManager from "./EventManager";
import GameManager from "./GameManager";
import NetWork from "./NetWork";
import PrizeDialog from "./PrizeDialog";
import ResultDialog from "./ResultDialog";
import RuleDialog from "./RuleDialog";
import TableDialog from "./TableDialog";
import weixinXX, { getCurrentPages } from "./weixin";

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

    @property(cc.Prefab)
    prizeDialogPrefab: cc.Prefab = null;

    //游戏节点
    @property(cc.Prefab)
    gameManagerPrefab: cc.Prefab = null;
    
    @property(cc.AudioClip)
    bgmAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    itemChanglaiClickAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    itemChangwangClickAudio: cc.AudioClip = null;

    gameManagerNode:cc.Node = null;

    
    onLoad () {
        EventManager.addListener(NOTI_NAME.SHOW_GAME_LAYER,this.showGameLayer,this);
        EventManager.addListener(NOTI_NAME.SHOW_RESULT_DIALOG,this.showResultDialog,this);
        EventManager.addListener(NOTI_NAME.SHOW_TABLE_DIALOG,this.showTableDialog,this);
        EventManager.addListener(NOTI_NAME.SHOW_ADS_DIALOG,this.showAdsDialog,this);
        EventManager.addListener(NOTI_NAME.SHOW_PRIZE_DIALOG,this.showPrizeDialog,this);
        EventManager.addListener(NOTI_NAME.CLOSE_DIALOG,this.closeDialog,this);
        EventManager.addListener(NOTI_NAME.PLAY_ITEM_CLICK_AUDIO,this.playItemClickAudio,this);
        
    }
    onDestroy() {
        EventManager.removeListener(NOTI_NAME.SHOW_GAME_LAYER,this.showGameLayer,this);
        EventManager.removeListener(NOTI_NAME.SHOW_RESULT_DIALOG,this.showResultDialog,this);
        EventManager.removeListener(NOTI_NAME.SHOW_TABLE_DIALOG,this.showTableDialog,this);
        EventManager.removeListener(NOTI_NAME.SHOW_ADS_DIALOG,this.showAdsDialog,this);
        EventManager.removeListener(NOTI_NAME.SHOW_PRIZE_DIALOG,this.showPrizeDialog,this);
        EventManager.removeListener(NOTI_NAME.CLOSE_DIALOG,this.closeDialog,this);
        EventManager.removeListener(NOTI_NAME.PLAY_ITEM_CLICK_AUDIO,this.playItemClickAudio,this);
    }

    start () {
        //默认播放音乐
        // setTimeout(() => {
        //     this.musicBtnClick();
        // }, 1000);

        this.musicBtnClick();

        let menuLayer = this.node.getChildByName('menuLayer');
        menuLayer.getChildByName('btnRule1').active = true;
        menuLayer.getChildByName('btnMusic1').active = true;
        menuLayer.getChildByName('btnRule2').active = false;
        menuLayer.getChildByName('btnMusic2').active = false;
        this.loadingLayerAni();
        this.getOpenIdByCode();
        this.addBadiuListenerCode();
    }

    addBadiuListenerCode() {
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?9e5b8055a0b9197ce153d1079d63435b";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
    }

    getOpenIdByCode() {
        let pages = getCurrentPages();
        let code = CommonUtil.getParam(pages, 'code');
        NetWork.httpGet('getOpenIdByCode?', {
            code : code
        }, (json) => {
            if(json.status === 1000) {
                console.log('请求成功', json);
                NetWork.openId = json.data;
                
                NetWork.getSign();
            }
        }, () => {
            console.log('请求失败');
        });
    }

    // update (dt) {}

    testBtnClick1() {
        // this.showResultDialog(10, 1, GameOverType.success);
        // this.showResultDialog(9, 1, GameOverType.timeOver);
        // this.showResultDialog(8, 1, GameOverType.longTimeNoClick);
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'succNode', '2.44');
        console.log("----idowiahiwoadj点击按钮111");
        EventManager.dispatchEvent(NOTI_NAME.SHOW_TABLE_DIALOG);
        // getCurrentPages();

        // weixinXX.jumpToWechatAuthorizePage('aaa');
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_TOAST, '您没有抽中奖品', 1500);

        // weixinXX.addJumpBtn();
        // weixinXX.addJumpBtn3();

        // NetWork.getSign();

        
        // weixinXX.addJumpBtn3();
        // this.scheduleOnce(() => {
        //     weixinXX.removeJumpBtn();
        // }, 2);

        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'failNode');
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'succNode', '2.44');
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'recordNode', '2.44', '2024/4/3 11:55');
    }

    testBtnClick2() {
        // NetWork.sendXHR();
        // NetWork.getOpenidByCode();
        // NetWork.httpGet({'code': 3218789}, (data)=> {
        //     console.log('----请求成功', data);
        // }, (code, reason) => {
        //     console.log('----请求失败', code, reason);
        // });

        // EventManager.dispatchEvent(NOTI_NAME.SHOW_TABLE_DIALOG);
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'failNode');
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'succNode', '2.44');
        // EventManager.dispatchEvent(NOTI_NAME.SHOW_PRIZE_DIALOG, 'recordNode', '2.44', '2024/4/3 11:55');
        console.log("----jdiwojdiwojoi222");
        // getCurrentPages();
        // console.log('---window.location.href', window.location.href);
        // checkIsWechatBrowser();

        weixinXX.removeJumpBtn();
    }

    testBtnClick3() {
        EventManager.dispatchEvent(NOTI_NAME.SHOW_TABLE_DIALOG);
    }

    //游戏规则点击
    ruleBtnClick(isCloseStartGame = false) {
        console.log("游戏规则点击");
        let ruleContent = this.node.getChildByName('ruleContent');
        // ruleContent.removeAllChildren();
        for (const children of ruleContent.children) {
            children.destroy();
        }
        let ruleDialog = cc.instantiate(this.ruleDialogPrefab);
        ruleDialog.getComponent(RuleDialog).initDialog(isCloseStartGame);
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
    showPrizeDialog(type:string, param1, param2) {
        let prizeDialogContent = this.node.getChildByName('prizeDialogContent');
        // adsDialogContent.removeAllChildren();
        for (const children of prizeDialogContent.children) {
            children.destroy();
        }
        let prizeDialog = cc.instantiate(this.prizeDialogPrefab);
        prizeDialog.getComponent(PrizeDialog).initDialog(type, param1, param2);
        prizeDialogContent.addChild(prizeDialog);
    }

    closeDialog(dialogMap) {
        // let dialogMap = {
        //     resultDialog: true,
        //     tableDialog: true,
        //     adsDialog: true,
        //     prizeDialog: true,
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
        if(dialogMap.prizeDialog === true) {
            let prizeDialogContent = this.node.getChildByName('prizeDialogContent');
            for (const children of prizeDialogContent.children) {
                children.destroy();
            }
        }
    }
    
    //游戏开始点击
    gameBeginClick() {
        console.log("游戏开始点击");
        // this.showGameLayer();
        // this.testBtnClick3();
        this.ruleBtnClick(true);
    }

    showGameLayer() {
        let loadLayer = this.node.getChildByName('loadLayer');
        loadLayer.active = false;
        let menuLayer = this.node.getChildByName('menuLayer');
        menuLayer.getChildByName('btnRule1').active = false;
        menuLayer.getChildByName('btnMusic1').active = false;
        menuLayer.getChildByName('btnRule2').active = false;
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
    playItemClickAudio(isChanglai:boolean) {
        if(isChanglai) {
            AudioManager.playEffectMusic(this.itemChanglaiClickAudio); 
        } else {
            AudioManager.playEffectMusic(this.itemChangwangClickAudio);
        }
    }

    loadingLayerAni() {
        let loadLayer = this.node.getChildByName('loadLayer');
        let btnBegin = loadLayer.getChildByName('btnBegin');
        btnBegin.runAction(cc.sequence(cc.scaleTo(0.3, 1.1), cc.scaleTo(0.3, 1)).repeatForever());

        let cloudNode = loadLayer.getChildByName('cloudNode');

        let moveCloudArray = [{
            isLeft: true,//是否初始是从左边开始移动
            moveDis: 40,
            moveTime: 4,
        }, {
            isLeft: false,
            moveDis: 30,
            moveTime: 6,
        }, {
            isLeft: true,
            moveDis: 30,
            moveTime: 3.5,
        }, {
            isLeft: true,
            moveDis: 20,
            moveTime: 4,
        }, {
            isLeft: false,
            moveDis: 20,
            moveTime: 5,
        }];
        for (let index = 0; index < 4; index++) {
            const cloud = cloudNode.getChildByName(`sp_cloud_${index + 1}`);
            let moveAni = moveCloudArray[index];
            let leftPos = moveAni.isLeft ? - moveAni.moveDis : moveAni.moveDis;
            let rightPos  = moveAni.isLeft ? moveAni.moveDis : -moveAni.moveDis;
            cloud.runAction(cc.sequence(
                cc.moveBy(moveAni.moveTime, cc.v2(leftPos, 0)),
                cc.moveBy(moveAni.moveTime, cc.v2(rightPos, 0))
            ).repeatForever());
        }
        
        let sp_title = loadLayer.getChildByName('sp_title');
        let sp_swallow = sp_title.getChildByName('sp_swallow');
        sp_swallow.runAction(cc.sequence(
            cc.moveBy(3, cc.v2(-30, 30)),
            cc.moveBy(4, cc.v2(30, -30))
        ).repeatForever());


        let sp_wheat_1 = sp_title.getChildByName('sp_wheat_1');
        sp_wheat_1.runAction(cc.sequence(
            cc.rotateBy(3, 15),
            cc.rotateBy(4, -15)
        ).repeatForever());

        let sp_wheat_2 = sp_title.getChildByName('sp_wheat_2');
        sp_wheat_2.runAction(cc.sequence(
            cc.rotateBy(4, -15),
            cc.rotateBy(5, 15)
        ).repeatForever());


        let changlaiNode = loadLayer.getChildByName('changlaiNode');
        let changlai_hand = changlaiNode.getChildByName('changlai_hand');
        let changwang_hand = changlaiNode.getChildByName('changwang_hand');
        changlai_hand.runAction(cc.sequence(
            cc.rotateBy(1.5, 20),
            cc.rotateBy(1, -20)
        ).repeatForever());
        changwang_hand.runAction(cc.sequence(
            cc.rotateBy(1, 20),
            cc.rotateBy(1.5, -20)
        ).repeatForever());
    }

}

