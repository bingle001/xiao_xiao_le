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




}