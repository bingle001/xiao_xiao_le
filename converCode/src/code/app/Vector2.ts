class Vector2 extends egret.Point{

	// public x: number = 0;
	// public y: number = 0;

	public constructor(x: number = 0, y: number = 0) {
		super(x, y);
		// this.x = x || 0;
		// this.y = y || 0;
	}

	/**
	 * 两坐标的距离
	 */
	public static Distance(v1: Vector2, v2: Vector2): number{
		let dis: number = egret.Point.distance(v1, v2);
		return dis;
	}
}