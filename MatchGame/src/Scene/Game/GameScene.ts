/**
 * 游戏场景
 */
class GameScene extends BaseScene{

	public cellParent: egret.DisplayObjectContainer;
	public jewelParent: egret.DisplayObjectContainer;

	public constructor() {
		super();
		this.name = "GameScene";
	}

	/**
	 * 创建完成时会调用
	 */
	protected onCreated(): void{
		super.onCreated();
		debug("homeScene onCreated");
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