/**
 * u3d里面的游戏对象
 */
class GameObject extends egret.DisplayObjectContainer{

	//注意，这里的_x,_y是指行列的位置，不是实际位置！！
	private _u3d_x: number = 0;
	private _u3d_y: number = 0;

	public constructor() {
		super();
	}

	public get u3dX(): number{
		return this._u3d_x;
	}
	public set u3dX(value: number) {
		this._u3d_x = value;

		this.x = this._u3d_x * 100;
	}

	public get u3dY(): number{
		return this._u3d_y;
	}
	public set u3dY(value: number) {
		this._u3d_y = value;

		this.y = this._u3d_y * 100;
	}

	/** 位置 */
	public get localPosition(): Vector3 {
		return new Vector3(this._u3d_x, this._u3d_y, 0);
	}
	public set localPosition(value: Vector3) {
		this._u3d_x = value.x;
		this._u3d_y = value.y;

		this.x = this._u3d_x * 100;
		this.y = this._u3d_y * 100;
	}

	/** 全局坐标，暂时直接返回_x,_y */
	public get position(): Vector3{
		// let pos:egret.Point = this.localToGlobal(0, 0);
		// return new Vector3(pos.x, pos.y, 0);
		return new Vector3(this._u3d_x, this._u3d_y);
	}


	public removeFromParent(): void{
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	/**
	 * 激活或取消激活某个显示对象
	 */
	public SetActive(parent: GameObject, obj: egret.DisplayObject, isActive: boolean): void{
		if (parent && obj) {
			if (isActive) {
				obj.visible = true;
				parent.addChild(obj);
			}
			else {
				obj.visible = false;
				if (obj.parent) {
					obj.parent.removeChild(obj);
				}
			}
		}
	}


}