class HomeScene extends BaseScene {

	public lbl_start:eui.Label;

	public constructor() {
		super();
		this.name = "HomeScene";
		this.initSkin("home/HomeSceneSkin.exml");
	}

	/**
	 * 创建完成时会调用
	 */
	protected onCreated(): void{
		super.onCreated();
		debug("homeScene onCreated");

		this.lbl_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStart, this);
	}

	/**
	 * 销毁
	 * 移除舞台时会调用
	 */
	protected onDestroy(): void{
		this.lbl_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStart, this);
	}

	private onBtnStart(e: egret.TouchEvent): void{
		Application.changeScene(SceneType.Game);
	}

	/**
	 * 每帧调用
	 */
	protected onEnterFrame(deltaTime: number): void{
		
	}

	/**
	 * 每秒调用
	 */
	protected onEnterSecond(deltaTime: number): void{
		
	}




}