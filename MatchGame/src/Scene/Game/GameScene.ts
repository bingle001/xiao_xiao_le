/**
 * 游戏场景
 */
class GameScene extends BaseScene{

	public img_bg:eui.Image;
	public group_cellParent:eui.Group;
	public group_borderParent: eui.Group;
	public group_cornerParent: eui.Group;


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

		if (PLayerInfo.MODE == 1) {
			GribManager.cell.GribMapCreate(PLayerInfo.MapPlayer.Name, this.group_cellParent, this.group_borderParent, this.group_cornerParent);
		}
		else {
			GribManager.cell.GribMapCreate("classic", this.group_cellParent, this.group_borderParent, this.group_cornerParent);
		}
		// GameController.action.Start();
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