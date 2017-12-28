/**
 * 地图场景
 */
class MapScene extends BaseScene{

	public constructor() {
		super();
		this.name = "MapScene";
		this.initSkin("map/MapSceneSkin.exml");
	}

	/**
	 * 创建完成时会调用
	 */
	protected onCreated(): void{
		super.onCreated();
		debug("MapScene onCreated");
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