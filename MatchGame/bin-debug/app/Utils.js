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
     * 初始化指定长度的一维数组
     */
    Utils.initVector = function (len, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        var list = [];
        for (var i = 0; i < len; i++) {
            list.push(defaultValue);
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
    /// 将两个List合并
    /// 触发消除的方块
    Utils.ListPlus = function (l1, l2, bonus) {
        var tmp = [];
        for (var i = l1.length - 1; i >= 0; i--) {
            tmp.push(l1[i]);
        }
        if (bonus != null)
            tmp.push(bonus);
        for (var i = 0; i < l2.length; i++) {
            tmp.push(l2[i]);
        }
        return tmp;
    };
    /// 移动显示对象
    Utils.MoveTo = function (obj, NewPos, duration) {
        var tx = Global.posX(NewPos.x);
        var ty = Global.posY(NewPos.y);
        var time = duration * 1000;
        egret.Tween.removeTweens(obj);
        egret.Tween.get(obj).to({ x: tx, y: ty }, time);
        debug("移动显示对象:", obj, NewPos, duration);
    };
    Utils.MoveTo2 = function (obj, startpos, NewPos, duration) {
        var sx = Global.posX(startpos.x);
        var sy = Global.posY(startpos.y);
        debug("移动位置2:");
        obj.x = sx;
        obj.y = sy;
        this.MoveTo(obj, NewPos, duration);
    };
    // 使用协程播放下落动画
    Utils.IEDrop = function (obj, NewPos, speed) {
        var dy = Global.posY(NewPos.y);
        var ty = dy - obj.y;
        var time = (ty / Global.BaseDistance) * (1000 / speed);
        egret.Tween.removeTweens(obj);
        egret.Tween.get(obj).to({ y: dy }, time).call(function () {
            obj.Bounce();
        }, this);
        GameController.action.drop.setLastDelay(time / 1000);
        // debug("IEDrop : 物体下落 ((%s,%s)→(%s,%s)), 时间：%sms", NewPos.x, Math.floor(obj.y/100), NewPos.x, NewPos.y, time);
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map