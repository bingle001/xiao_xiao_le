class Utils{

	/**
     * 格式化字符串
     */
    public static stringFormat(str: string, ...args: any[]): string {
        //过滤掉所有
        str = str.replace(/%%/g, "%");
        return Utils.stringFormatArr(str, args);
    }

	public static stringFormatArr(str: string, args: Array<any>): string {
        var new_str = str;
        for (var i in args) {
            var arg = args[i];
            if (new RegExp("(%s|%d)").test(new_str)) {
                new_str = new_str.replace(RegExp.$1, arg);
            }
        }
        return new_str;
	}
	
	/**
     * 获取对象长度
     */
    public static objectLenght(elem: Object): number {
        var keys: any[] = Object.keys(elem);
        return keys.length;
    }

    /**
     * 初始化二维数组
     */
    public static initVector2(cls: any, row: number, col: number): any{
        let list = [];
        for (let i = 0; i < row; i++){
            let arr = [];
            for (let j = 0; j < col; j++){
                let obj = new cls();
                arr.push(obj);
            }
            list.push(arr);
        }
        return list;
    }

    /**
     * 初始化指定长度的一维数组
     */
    public static initVector(len: number, defaultValue: any = 0): any{
        let list = [];
        for (let i = 0; i < len; i++){
            list.push(defaultValue);
        }
        return list;
    }

    /**
     * 随机
     * @param min
     * @param max
     * @returns {any}
     */
    public static random(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    }

    /**
     * 设置灰化
     * node : 显示对象
     * isGray : 默认灰化，false清除灰化
     */
    public static setGray(node: egret.DisplayObject, isGray = true) {
        if (isGray) {
            // //颜色矩阵数组
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            node.filters = [colorFlilter];
        } else {
            node.filters = [];
        }
    }

    /** 获取数组里的最大值 */
    public static arrayMax(arr: number[]): number{
        let max: number;
        if (arr && arr.length > 0) {
            max = arr[0];
            for (let i = 1; i < arr.length; i++){
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
        }
        return max;
    }





    /// 将两个List合并
	/// 触发消除的方块
	public static ListPlus(l1: JewelObj[], l2: JewelObj[], bonus: JewelObj): JewelObj[] {
		let tmp = [];
		for (let i = l1.length - 1; i >= 0; i--) {
			tmp.push(l1[i]);
		}
		if (bonus != null)
			tmp.push(bonus);

		for (let i = 0; i < l2.length; i++) {
			tmp.push(l2[i]);
		}

		return tmp;
	}

	/// 移动显示对象
	public static MoveTo(obj: GameObject, NewPos: Vector2, duration: number): void {

		let tx: number = Global.posX(NewPos.x);
		let ty: number = Global.posY(NewPos.y);
		let time: number = duration * 1000;

		egret.Tween.removeTweens(obj);
		egret.Tween.get(obj).to({ x: tx, y: ty }, time);
		debug("移动显示对象:", obj, NewPos, duration);
	}

    public static MoveTo2(obj: GameObject, startpos: Vector2, NewPos: Vector2, duration: number): void {

        let sx = Global.posX(startpos.x);
        let sy = Global.posY(startpos.y);

        debug("移动位置2:");
        obj.x = sx;
        obj.y = sy;
		this.MoveTo(obj, NewPos, duration);
	}

	// 使用协程播放下落动画
    public static IEDrop(obj: JewelObj, NewPos: Vector2, speed: number): void {
        let dy = Global.posY(NewPos.y);
        let ty = dy - obj.y;
        let time: number = (ty / Global.BaseDistance) * (1000 / speed);

        egret.Tween.removeTweens(obj);
        egret.Tween.get(obj).to({ y: dy }, time).call(function () {
            obj.Bounce();
        }, this);

        GameController.action.drop.setLastDelay(time / 1000);
        // debug("IEDrop : 物体下落 ((%s,%s)→(%s,%s)), 时间：%sms", NewPos.x, Math.floor(obj.y/100), NewPos.x, NewPos.y, time);
    }
    



}