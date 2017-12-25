class TimerUtils {
	public constructor() {
	}

	public static setTimeOut(delay: number, callback: Function, thisObj: any): void{
		let timer: egret.Timer = new egret.Timer(delay, 1);
		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, callback, thisObj);
		timer.start();
	}



}