/**
 * 据点
 */
class MapPoint extends BaseCompoment{

	private _txt: eui.Label;

	public constructor() {
		super();
		this.width = 68;
		this.height = 98;
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;


		this._txt = new eui.Label();
		this._txt.border = true;
		this._txt.borderColor = 0x00000;
		this._txt.width = 68;
		this._txt.height = 98;
		this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._txt.textAlign = "center";
		this._txt.text = "000";
		this.addChild(this._txt);
	}

	public setLevel(lv: number): void{
		this._txt.text = lv.toString();
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