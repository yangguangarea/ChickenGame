
/** UI通用方法 */
export default class UIUtil {
    /**
	 * @description: 计算文本的实际宽高
	 * @param text:文本内容
     * @param designSize:文本最大宽度
     * @param fontSize:字体大小
     * @param lineHeight:字体行高
	 * @return:文本的尺寸
	 */
    public static measureSize(text: string, designSize: cc.Size, fontSize: number, lineHeight:number):cc.Size {
        let node = new cc.Node();
        let label = node.addComponent<cc.Label>(cc.Label);

        label.fontSize = fontSize;
        label.lineHeight = lineHeight;
        label.string = text;
        // 计算宽
        label.overflow = cc.Label.Overflow.NONE;
        label.node.setContentSize(cc.size(0, lineHeight));
        label._forceUpdateRenderData();
        // label["_forceUpdateRenderData"]();
        let textWidth = Math.min(label.node.width, designSize.width);
        // 计算高
        label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        label.node.setContentSize(cc.size(textWidth, 0));
        label._forceUpdateRenderData();
        let textHeight = label.node.height;
        node.destroy();
        return cc.size(textWidth + 15, textHeight + 3);
    }

    // /**
	//  * @description: 判断是否显示新版挽留弹窗
	//  */
    // public static async judgeShowRetainDialog() {
    //     const minVersion = (isIosApp()) ? "10.1.0" : "9.10.0";
    //     let result = {
    //         isShow:false,//是否显示
    //         isShowNewRetainDialog:false//新版还是旧版
    //     }
    //     const version = await getUserInfo("version");
    //     const userid = await getUserInfo("uid");
    //     const isShowNewRetainDialog = compareVersion(version, minVersion) >= 0;
    //     const compareKey = (isShowNewRetainDialog) ? "SHOW_NEW_RETAIN_DIALOG" : "SHOW_RETAIN_DIALOG";
    //     result.isShowNewRetainDialog = isShowNewRetainDialog;
    //     if (!LocalDataManager.getData(compareKey + userid)) {
    //         LocalDataManager.setData(compareKey + userid, "true");
    //         result.isShow = true;
    //     }
    //     return Promise.resolve(result);
    // }

    // /**
	//  * @description: 获取屏幕适配系数 ipad最短是0， 设计分辨率是1
	//  */
    // public static getWindowFitFactor():number {
    //     let factor = 1;
    //     let designProportion = cc.view.getDesignResolutionSize().height / cc.view.getDesignResolutionSize().width;
    //     let minProportion = 4 / 3;//1.333333
    //     // let minProportion = 16 / 9;//1.7777
    //     let actualProportion = cc.winSize.height / cc.winSize.width;
    //     factor = 1/(designProportion - minProportion) * actualProportion - minProportion * 1 / (designProportion - minProportion);
    //     return factor;
    // }

    /**
	 * @description: 创建一个空节点
	 */
    public static createNode(anchor: cc.Vec2, pos: cc.Vec2, size: cc.Size, color: cc.Color): cc.Node {
        let node: cc.Node = new cc.Node();
        if (anchor !== undefined && anchor !== null) {
            node.setAnchorPoint(anchor);
        }
        if (pos !== undefined && pos !== null) {
            node.setPosition(pos);
        }
        if (size !== undefined && size !== null) {
            node.setContentSize(size);
        }
        if (color !== undefined && color !== null) {
            node.color = color;
        }
        return node;
    }

    /**
	 * @description: 节点旋转动画
	 */
    public static circleRotateAction(node: cc.Node, time:number = 3, angle:number = 360) {
        if(!node || !cc.isValid(node)) return;
        node.runAction(cc.rotateBy(time, angle).repeatForever());
    }
}