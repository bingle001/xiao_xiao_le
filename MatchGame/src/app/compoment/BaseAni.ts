/**
 * 动画基类
 */
class BaseAni extends eui.Image {

	/** 是否循环播放 */
	public isRepeat: boolean = false;
	/** 播放完成后是否销毁 */
	public isPlayOverDestroy: boolean = false;

	/** 帧率，表示多少帧动一次，数值越大越慢 */
	public frameRate: number = 2;
	private _count: number = 0;
	private _curFrame: number = 0;//当前帧

	private _aniType: AniTypes;
	private _config: AnimationConfig;
	private _pause: boolean = false;

	private _callback: Function;
	private _thisObj: any;

	public constructor() {
		super();
	}

	public onDestory(): void {
		this._aniType = null;
		this._config = null;
		this._pause = null;
		this._callback = null;
		this._thisObj = null;
		
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	/**
	 * 播放
	 */
	public play(callback: Function = null, thisObj: any = null, startFrame: number = 0): void {
		this._callback = callback;
		this._thisObj = thisObj;
		this._curFrame = startFrame;

		Time.addFrameCall(this.onEnterFrame, this);
	}

	/**
	 * 停止
	 */
	public stop(): void {
		Time.removeFrameCall(this.onEnterFrame, this);
	}

	/**
	 * 暂停
	 */
	public pause(): void {
		this._pause = true;
	}

	/**
	 * 继续
	 */
	public resume(): void {
		this._pause = false;
	}

	/**
	 * 设置动画数据
	 * @param 动画名称
	 * @param showAtFrame 直接让当前显示在第几帧
	 */
	public setAni(aniType: AniTypes, showFrame: number = 0): void {
		this._aniType = aniType;
		this._config = AnimationData.getConfig(aniType);
		this.isRepeat = this._config.isRepeat;
		this.showAtFrame(showFrame);
	}

	/**
	 * 直接让当前显示在第几帧
	 */
	public showAtFrame(frame: number): void {
		this._curFrame = frame;
		this.setFrame();
	}

	private onEnterFrame(dt: number): void {
		if (this._pause) {
			return;
		}

		this._count++;
		if (this._count >= this.frameRate) {
			this._count = 0;
			this.nextFrame();
		}
	}

	private nextFrame(): void {
		this.setFrame();
		this._curFrame++;
		if (this._curFrame >= this._config.frame) {
			if (this.isRepeat) {
				this._curFrame = 0;
			}
			else {
				if (this._callback && this._thisObj) {
					this._callback.call(this._thisObj);
				}
				this.stop();
				if (this.isPlayOverDestroy) {
					this.onDestory();
				}
			}
		}
	}

	private setFrame(): void {
		let key: string = "%s_%d_png";
		key = Utils.stringFormat(key, this._aniType, this._curFrame);
		this.texture = RES.getRes(key);
	}





}