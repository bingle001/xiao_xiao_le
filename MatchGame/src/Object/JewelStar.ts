/**
 * 星星
 */
class JewelStar extends JewelObj {

	private _ani: BaseAni;

	public constructor() {
		super();

		this.render.source = "Play_star_png";

		this._ani = new BaseAni();
		this._ani.setAni(AniTypes.JewelStar);
		this._ani.isRepeat = true;
		this._ani.frameRate = 5;
		this._ani.horizontalCenter = 0;
		this._ani.verticalCenter = 0;
		this.addChildAt(this._ani, 0);
	}

	public play(): void{
		this._ani.play();

		// let tx: number = this.x;
		// let ty: number = this.y;

		// egret.Tween.removeTweens(this);
		// egret.Tween.get(this).to()
	}

	public stop(): void{
		this._ani.stop();
	}

	public Destroy(): void{
		super.Destroy();
		this.stop();
	}





}