

/** 事件监听管理模块 */
class EventManager {
    constructor() {}
    private _instance = new cc.EventTarget();

    public initialize(): void {
        // this._instance = new cc.EventTarget();
        // this._instance.
        // this._instance.removeAll
        // this._instance.targetOff(,);
    }

    public addListener(eventName:string, callBack:Function, target?:any){
        if(eventName === undefined || eventName === null || eventName === "") return;
        this._instance.on(eventName, callBack, target);
    }

    public removeListener(eventName: string, callback?: Function, target?: any) {
        this._instance.off(eventName, callback, target);
    }

    public dispatchEvent(eventName: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        this._instance.emit(eventName, arg1, arg2, arg3, arg4, arg5);
    }
}

export default new EventManager();
