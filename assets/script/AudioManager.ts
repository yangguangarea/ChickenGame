/** 音效管理模块 */
class AudioManager {
	/** 背景音乐音量大小 */
	private _musicVolume: number = 1.0;
	/** 音效音量大小 */
	private _effectVolume: number = 0.1;
	/** 背景音乐是否打开 */
	private _isBgMusicOn: boolean = true;
	/** 是否正在播放背景音乐 */
	private _isPlayBgMusic: boolean = false;
	/** 背景音乐名称 */
	private _bgMusicName: cc.AudioClip = null;
	constructor() {}
	public initialize(): void {
		this.setMusicVolume(this._musicVolume);
		this.setEffectVolume(this._effectVolume);
	}

	/** 本地播放音效 */
	public playEffectMusic(
		effect: cc.AudioClip,
		isLoop: boolean = false
	): number {
		return cc.audioEngine.playEffect(effect, isLoop);
	}

	// /** 远程播放音效 */
	// public playRemoteEffectMusic(url: string, isLoop: boolean = false) {
	// 	ResManager.getAudioRes(url, (clip) => {
	// 		let audioID = cc.audioEngine.playEffect(clip, isLoop);
	// 	});
	// }

	// /** 远程播放背景音乐 */
	// public playRemoteBGM(url: string, isLoop: boolean) {
	// 	ResManager.getAudioRes(url, (clip) => {
	// 		// console.log("clip----", clip);
	// 		this._isPlayBgMusic = true;
	// 		this._bgMusicName = clip;
	// 		cc.audioEngine.playMusic(clip, isLoop);
	// 	});
	// }

	/** 本地播放背景音乐 */
	public playBGM(music: cc.AudioClip, isLoop: boolean): void {
		this._bgMusicName = music;
		this._isPlayBgMusic = true;
		cc.audioEngine.playMusic(music, isLoop);
        console.log('---播放音乐');
	}

	/** 恢复背景音乐 */
	public resumeBGM(): void {
		if (this._isBgMusicOn) {
			cc.audioEngine.resumeMusic();
		}
	}

	/** 是否正在播放背景音乐 */
	public isPlayBGM(): boolean {
		return this._isPlayBgMusic;
	}

	/** 暂停背景音乐 */
	public pauseBGM(): void {
		if (this._isPlayBgMusic) {
			cc.audioEngine.pauseMusic();
		}
	}

	/** 停止背景音乐 */
	public stopBGM(): void {
		this._isPlayBgMusic = false;
		cc.audioEngine.stopMusic();
        console.log('---停止音乐');
	}

	/** 停止所有音效 */
	public stopAllEffect(): void {
		cc.audioEngine.stopAllEffects();
	}

	/** 暂停所有音效 */
	public pauseEffect(): void {
		cc.audioEngine.pauseAllEffects();
	}

	/** 恢复所有音效 */
	public resumeEffect(): void {
		cc.audioEngine.resumeAllEffects();
	}

	/** 停止指定音效 */
	public stopEffect(soundId: number): void {
		cc.audioEngine.stopEffect(soundId);
	}

	/** 设置背景音乐的音量大小 */
	public setMusicVolume(musicVolume: number): void {
		console.log("musicVolume---", musicVolume);
		this._musicVolume = musicVolume;
		cc.audioEngine.setMusicVolume(musicVolume);
	}

	/** 获取背景音乐的音量大小 */
	public getMusicVolume(): number {
		return cc.audioEngine.getMusicVolume();
	}

	/** 设置音效的音量大小 */
	public setEffectVolume(effectVolume: number): void {
		this._effectVolume = effectVolume;
		cc.audioEngine.setEffectsVolume(effectVolume);
	}

	/** 获取音效的音量大小 */
	public getEffectVolume(): number {
		return cc.audioEngine.getEffectsVolume();
	}

	// /** 预加载音效 */
	// public preloadEffect(filePath: string): void {
	//     cc.audioEngine.preload(filePath);
	// }

	// /** 预加载背景音乐 */
	// public preLoadBGM(filePath: string): void {
	//     cc.audioEngine.preload(filePath);
	// }
}

export default new AudioManager();
