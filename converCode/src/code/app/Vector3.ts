/** 3维坐标 */
class Vector3 extends Vector2{

	// public x: number = 0;
	// public y: number = 0;
	public z: number = 0;


	public constructor(x: number = 0, y: number = 0, z: number = 0) {
		super(x, y);
		// this.x = x || 0;
		// this.y = y || 0;
		this.z = z || 0;
	}

	public static get Zero(): Vector3{
		return new Vector3();
	}


}