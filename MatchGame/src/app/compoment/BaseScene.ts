/**
 * 场景基类
 */
class BaseScene extends BaseCompoment{

	public sceneType: number = 0;

	public constructor() {
		super();

	}

	protected onCreated(): void{
		super.onCreated();

		Time.addFrameCall(this.onEnterFrame, this);
		Time.addSecondCall(this.onEnterSecond, this);
	}

	/**
	 * 销毁
	 */
	protected onDestroy(): void{
		super.onDestroy();

		Time.removeFrameCall(this.onEnterFrame, this);
		Time.removeSecondCall(this.onEnterSecond, this);
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