/**
 * 地图场景
 */
class MapScene extends BaseScene{

	public group_map: eui.Group;
	
	private _showRect: egret.Rectangle;
	private _minY: number;
	private _startY: number = 0;
	private _stageY: number = 0;

	public constructor() {
		super();
		this.name = "MapScene";
		this.initSkin("map/MapSceneSkin.exml");
	}

	protected onDestroy(): void{
		super.onDestroy();

	}

	protected onCreated(): void{
		super.onCreated();
		debug("MapScene onCreated");

		this._showRect = new egret.Rectangle();
		this._showRect.width = this.width;
		this._showRect.height = this.height;
		this.group_map.scrollRect = this._showRect;

		let pointX: number = 720 / 2;
		let pointY: number = 0;
		let index: number = 0;
		let len: number = 297;

		let startY: number = 1280;
		for (let i = 0; i < 13; i++){
			let page = new MapPage();
			page.setPage(i);
			if (i == 12) {
				page.updateTopPage();
			}
			startY -= page.height;
			page.y = startY;
			this.group_map.addChild(page);

			//据点
			for (; index < len;){
				let data = DataLoader.Data.mappos[index];
				let tx = data[0];
				let ty = data[1];
				tx = pointX + tx * 200;
				ty = -pointY - ty * 200;
				if (ty < startY) {
					debug("-----------------------------");
					debug("跳出循环%s, ty, startY :", i, ty, startY);
					debug("-----------------------------");
					break;
				}

				let oy = ty - startY;
				let point = new MapPoint();
				point.x = tx;
				point.y = oy;
				point.setLevel(index);
				page.addChild(point);

				debug("据点 %s,计算(%s, %s), 实际(%s, %s)", index, tx, ty, tx, oy);
				index++;
			}
		}
		this._minY = startY;
		debug("minY:", startY);

		this.group_map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}

	private onTouchBegin(e: egret.TouchEvent): void{
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		this._startY = this._showRect.y;
		this._stageY = e.stageY;

	}

	private onTouchMove(e: egret.TouchEvent): void{
		let ty: number = this._startY - (e.stageY - this._stageY);
		if (ty < this._minY) {
			ty = this._minY;
		}
		else if (ty > 0) {
			ty = 0;
		}
		this._showRect.y = ty;
		this.group_map.scrollRect = this._showRect;
	}

	private onTouchEnd(e: egret.TouchEvent): void{
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);


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