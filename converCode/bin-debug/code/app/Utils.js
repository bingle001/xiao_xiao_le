var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    /**
     * 格式化字符串
     */
    Utils.stringFormat = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //过滤掉所有
        str = str.replace(/%%/g, "%");
        return Utils.stringFormatArr(str, args);
    };
    Utils.stringFormatArr = function (str, args) {
        var new_str = str;
        for (var i in args) {
            var arg = args[i];
            if (new RegExp("(%s|%d)").test(new_str)) {
                new_str = new_str.replace(RegExp.$1, arg);
            }
        }
        return new_str;
    };
    /**
     * 获取对象长度
     */
    Utils.objectLenght = function (elem) {
        var keys = Object.keys(elem);
        return keys.length;
    };
    /**
     * 初始化二维数组
     */
    Utils.initVector2 = function (cls, row, col) {
        var list = [];
        for (var i = 0; i < row; i++) {
            var arr = [];
            for (var j = 0; j < col; j++) {
                var obj = new cls();
                arr.push(obj);
            }
            list.push(arr);
        }
        return list;
    };
    /**
     * 随机
     * @param min
     * @param max
     * @returns {any}
     */
    Utils.random = function (min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    };
    /**
     * 设置灰化
     * node : 显示对象
     * isGray : 默认灰化，false清除灰化
     */
    Utils.setGray = function (node, isGray) {
        if (isGray === void 0) { isGray = true; }
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
        }
        else {
            node.filters = [];
        }
    };
    /** 获取数组里的最大值 */
    Utils.arrayMax = function (arr) {
        var max;
        if (arr && arr.length > 0) {
            max = arr[0];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
        }
        return max;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map