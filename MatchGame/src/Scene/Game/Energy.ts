/**
 * 能量槽
 */
class Energy extends BaseCompoment {

	public img_bar: eui.Image;
	public img_eff: eui.Image;

	private _showRect: egret.Rectangle;

	private _max: number = 100;//最大值
	private _value: number = 0;//当前值


	public constructor() {
		super();
	}

	/**
	 * 创建完成时会调用
	 */
	protected onCreated(): void{
		super.onCreated();
		
		this._showRect = new egret.Rectangle();
		this._showRect.width = this.img_bar.width;
		this._showRect.height = this.img_bar.height;

		this.updateEnergy(0);
	}

	/**
	 * 销毁
	 * 移除舞台时会调用
	 */
	protected onDestroy(): void{
		super.onDestroy();



	}

	public setMax(max: number): void{
		this._max = max;
	}

	public updateEnergy(value: number): void{
		this._value = value;

		let scale: number;
		if (this._max <= 0) {
			scale = 0;
		}
		else {
			scale = value / this._max;
			if (scale < 0) {
				scale = 0;
			}
			else if (scale > 1) {
				scale = 1;
			}
		}

		let th = scale * this.img_bar.height;
		this._showRect.height = th;
		this._showRect.y = this.img_bar.height - th;
		this.img_bar.scrollRect = this._showRect;
	}




}