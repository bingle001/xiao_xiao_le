class BaseView extends BaseCompoment{


	public constructor() {
		super();
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


}