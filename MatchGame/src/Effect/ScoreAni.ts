/**
 * 得分动画
 */
class ScoreAni extends eui.Image{

	public constructor() {
		super();
		this.source = "Play_top_star_png";
		this.width = 35;
		this.height = 35;
		this.anchorOffsetX = 17;
		this.anchorOffsetY = 17;
	}

	public play(ox, oy, tx, ty): void{
		this.x = ox;
		this.y = oy;
	
		egret.Tween.get(this).to({ x: tx, y: ty }, 1000).call(this.playOver, this);
	}


	private playOver(): void{
		egret.Tween.removeTweens(this);
		if (this.parent) {
			this.parent.removeChild(this);
		}

		ScoreAni._pool.push(this);
	}




	public static start(targetX: number, targetY: number, parent: eui.Group): void{
		this._targetX = targetX;
		this._targetY = targetY;
		this._parent = parent;
	}

	private static _pool: ScoreAni[] = [];
	private static _targetX: number;
	private static _targetY: number;
	private static _parent: eui.Group;

	public static getAni(): ScoreAni{
		let ani: ScoreAni;
		if (this._pool.length > 0) {
			ani = this._pool.pop();
		}
		else {
			ani = new ScoreAni();
		}
		return ani;
	}

	/**
	 * 播放得分动画
	 * @param ox, oy 动画的起始位置xy
	 * @param tx, ty 目标位置xy，即能量槽的位置
	 */
	public static playGetScore(startX, startY): void{
		let ani = this.getAni();
		ani.play(startX, startY, this._targetX, this._targetY);
		this._parent.addChild(ani);
	}





}