/**
 * 游戏场景
 */
class GameScene extends BaseScene{

	public img_bg:eui.Image;
	public group_cellParent:eui.Group;
	public group_borderParent: eui.Group;
	public group_cornerParent: eui.Group;
	public group_jewelParent: eui.Group;
	public group_effectParent:eui.Group;

	public group_otherParent:eui.Group;
	public group_selector:eui.Group;
	public group_noSelector:eui.Group;





	public constructor() {
		super();
		this.name = "GameScene";
		this.initSkin("game/GameSceneSkin.exml");
	}

	/**
	 * 创建完成时会调用
	 */
	protected onCreated(): void {
		super.onCreated();
		debug("GameScene onCreated");

		this.group_jewelParent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

		JewelSpawner.spawn.initJewelParent(this.group_jewelParent);
		if (PlayerInfo.MODE == 1) {
			GribManager.cell.GribMapCreate(PlayerInfo.MapPlayer.Name, this.group_cellParent, this.group_borderParent, this.group_cornerParent);
		}
		else {
			GribManager.cell.GribMapCreate("classic", this.group_cellParent, this.group_borderParent, this.group_cornerParent);
		}

		PlayerInfo.Info.Start();
		GameController.action.Start(this.group_selector, this.group_noSelector);
		EffectSpawner.effect.start(this.group_effectParent);
	}

	private onTouchBegin(e: egret.TouchEvent): void{
		this.group_jewelParent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		Input._isMouseDown = true;
		Input._localX = e.localX;
		Input._localY = e.localY;
		// debug("onTouchBegin:(%s, %s)", Input._localX, Input._localY);
	}

	private onTouchMove(e: egret.TouchEvent): void{
		if (e.target == this.group_jewelParent) {
			Input._localX = e.localX;
			Input._localY = e.localY;
			// debug("onTouchMove:(%s, %s)", Input._localX, Input._localY);
		}
	}

	private onTouchEnd(e: egret.TouchEvent): void {
		this.group_jewelParent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		Input._isMouseDown = false;
		// debug("onTouchEnd");
	}

	/**
	 * 销毁
	 * 移除舞台时会调用
	 */
	protected onDestroy(): void{
		
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