/**
 * 每一页
 */
class MapPage extends BaseCompoment {

	private _txt: eui.Label;

	private _page: number;

	private _maxY: number;
	private _minY: number;

	public constructor() {
		super();
		this.width = 720;
		this.height = 1200;

		this._txt = new eui.Label();
		this._txt.border = true;
		this._txt.borderColor = 0x00000;
		this._txt.width = this.width;
		this._txt.height = this.height;
		this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._txt.textAlign = "center";
		this._txt.text = "000";
		this.addChild(this._txt);
	}

	public setPage(page: number): void{
		this._page = page;

		this._txt.text = page.toString();
	}

	protected onCreated(): void{
		
	}

	protected onDestroy(): void{
		
	}

	public updateTopPage(): void{
		this.height = 420;
		this._txt.height = this.height;
		
	}






}