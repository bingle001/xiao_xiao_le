class HomeScene extends BaseScene {

	public lbl_start:eui.Label;

	public btn_start:eui.Button;
	public btn_music:eui.Button;
	public btn_sound:eui.Button;
	public btn_home:eui.Button;
	public btn_more:eui.Button;
	public btn_classic:eui.Button;


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

		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStart, this);
		this.btn_classic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClassic, this);

		this.lbl_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTest, this);
	}

	/**
	 * 销毁
	 * 移除舞台时会调用
	 */
	protected onDestroy(): void{
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStart, this);
	}

	private onBtnStart(e: egret.TouchEvent): void{
		let player: Player = PlayerUtils.getPlayer(1);
		ButtonActionController.Click.ArcadeScene(player);
		// Application.changeScene(SceneType.Game);
	}

	private onBtnClassic(e: egret.TouchEvent): void{
		
	}

	private onBtnTest(e: egret.TouchEvent): void{
		Application.changeScene(SceneType.Map);
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