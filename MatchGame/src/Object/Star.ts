/**
 * 星星
 */
class Star extends JewelObj {

	private _ani: BaseAni;

	public constructor() {
		super();

		this.render.source = "Play_star_png";

		this._ani = new BaseAni();
		this._ani.setAni(AniTypes.JewelStar);
		this._ani.isRepeat = true;
		this.addChildAt(this._ani, 0);
	}

	public play(): void{
		this._ani.play();
	}

	public stop(): void{
		this._ani.stop();
	}

	public Destroy(): void{
		super.Destroy();
		this.stop();
	}





}