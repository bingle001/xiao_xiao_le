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




}