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
	public static get deltaTime(): number{
		return this._deltaTime;
	}

	/**
	 * 平滑间隔时间，为了避免帧时间波动大，取的平均值
	 */
	public static get smoothDeltaTime(): number{
		return this._smoothDeltaTime;	
	}

	private static _deltaTime: number = 0;
	private static _timeStamp: number = 0;
	private static _smoothDeltaTime: number = 0;

	public static Awake(): void{
		egret.startTick(this.ticker, this);
		this._timeStamp = egret.getTimer();
		this._smoothDeltaTime = 1 / 60;	//60帧
	}

	private static ticker(timeStamp: number): boolean{
		let tmp = timeStamp - this._timeStamp;
		this._deltaTime = tmp / 1000;
		this._timeStamp = timeStamp;
		return false;
	}

	



}