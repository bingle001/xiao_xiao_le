class Time {

	/**
	 * 游戏运行速率
	 * 0 游戏暂停
	 * 1 正常速率
	 * 2 2倍速率
	 * 3,4,5.....以此类推
	 */
	public static timeScale: number = 1;

	/**
	 *  以秒计算，完成最后一帧的时间（只读）
	 *  使用这个函数使和你的游戏帧速率无关。
	 */
	public static get deltaTime(): number {
		return this._deltaTime;
	}

	/**
	 * 平滑间隔时间，为了避免帧时间波动大，取的平均值
	 */
	public static get smoothDeltaTime(): number {
		return this._smoothDeltaTime;
	}

	private static _deltaTime: number = 0;
	private static _timeStamp: number = 0;
	private static _secondStamp: number = 0;
	private static _smoothDeltaTime: number = 0;

	private static _frameFuncMaps: any[];//每帧回调列表
	private static _secondFuncMaps: any[];

	public static Awake(): void {
		this._timeStamp = egret.getTimer();
		this._secondStamp = this._timeStamp;
		this._smoothDeltaTime = 1 / 30; //暂时30帧	//60帧

		this._frameFuncMaps = [];
		this._secondFuncMaps = [];

		egret.startTick(this.ticker, this);
	}

	private static ticker(timeStamp: number): boolean {
		let tmp = timeStamp - this._timeStamp;
		this._deltaTime = tmp / 1000;
		this._timeStamp = timeStamp;

		this.onEnterFrame(tmp);

		let sec = timeStamp - this._secondStamp;
		if (sec > 1000) {
			this.onEnterSecond(sec);
			this._secondStamp = timeStamp;
		}

		return false;
	}

	/**
	 * 每帧调用
	 * @param deltaTime 每帧的增量时间，毫秒
	 */
	private static onEnterFrame(deltaTime: number): void {
		this.callBackMaps(this._frameFuncMaps, deltaTime);
	}

	/**
	 * 每秒调用
	 * 
	 */
	private static onEnterSecond(deltaTime: number): void {
		this.callBackMaps(this._secondFuncMaps, deltaTime);
	}

	private static callBackMaps(maps, deltaTime: number): void {
		for (let i in maps) {
			let obj = maps[i];
			if (obj && obj.callback && obj.thisObj) {
				if (obj.params && obj.params.length > 0) {
					obj.callback.call(obj.thisObj, deltaTime, obj.params);
				}
				else {
					obj.callback.call(obj.thisObj, deltaTime);
				}
			}
		}
	}

	/**
	 * 添加每帧回调
	 * @param callback 回调函数，例：onEnterFrame(deltaTime:number)，注意：参数deltaTime是增量时间
	 */
	public static addFrameCall(callback: Function, thisObj: any, ...params: any[]): void {
		if (callback && thisObj) {
			let index: number = this.checkIndex(callback, thisObj, this._frameFuncMaps);
			if (index == -1) {
				let obj = {
					callback,
					thisObj,
					params,
				}
				this._frameFuncMaps.push(obj);
			}
		}
	}

	/**
	 * 添加每秒回调
	 * @param callback 回调函数，例：onEnterSecond(deltaTime:number)，注意：参数deltaTime是增量时间
	 */
	public static addSecondCall(callback: Function, thisObj: any, ...params: any[]): void {
		if (callback && thisObj) {
			let index: number = this.checkIndex(callback, thisObj, this._secondFuncMaps);
			if (index == -1) {
				let obj = {
					callback,
					thisObj,
					params,
				}
				this._frameFuncMaps.push(obj);
			}
		}
	}

	/**
	 * 移除每帧回调
	 */
	public static removeFrameCall(callback: Function, thisObj: any): void {
		if (callback && thisObj) {
			let index: number = this.checkIndex(callback, thisObj, this._frameFuncMaps);
			if (index >= 0) {
				this._frameFuncMaps.splice(index, 1);
			}
		}
	}

	/**
	 * 移除每秒回调
	 */
	public static removeSecondCall(callback: Function, thisObj: any): void {
		if (callback && thisObj) {
			let index: number = this.checkIndex(callback, thisObj, this._secondFuncMaps);
			if (index >= 0) {
				this._secondFuncMaps.splice(index, 1);
			}
		}
	}

	/**
	 * 判断在列表中的第几项
	 */
	private static checkIndex(callback: Function, thisObj: any, maps: any[]): number{
		for (let i = 0; i < maps.length; i++){
			let obj = maps[i];
			if (obj.callback == callback && obj.thisObj == thisObj) {
				return i;
			}
		}
		return -1;
	}







}