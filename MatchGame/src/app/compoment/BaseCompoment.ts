/**
 * 皮肤基类
 */
class BaseCompoment extends eui.Component{



	public constructor() {
		super();
	}

	/**
	 * 初始化皮肤
	 * 相对于 resource/skins/ 下的目录
	 */
	public initSkin(skinUrl: string): void{
		this.skinName = "resource/skins/" + skinUrl;
	}

	$onRemoveFromStage(): void {
		super.$onRemoveFromStage();
		this.onDestroy();
	}

	protected childrenCreated(): void{
		super.childrenCreated();
		this.onCreated();

		
	}

	/**
	 * 创建完成时会调用
	 */
	protected onCreated(): void{
		
	}

	/**
	 * 销毁
	 * 移除舞台时会调用
	 */
	protected onDestroy(): void{
		
	}

	public removeFromParent(): void{
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}






}