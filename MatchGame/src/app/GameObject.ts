/**
 * u3d里面的游戏对象
 */
class GameObject extends eui.Group {

	public constructor() {
		super();
	}

	public row: number = 0;
	public col: number = 0;

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