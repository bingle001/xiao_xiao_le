var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
    }
    Global.posX = function (x) {
        return x * Global.BaseDistance;
    };
    Global.posY = function (y) {
        return (8 - y) * Global.BaseDistance;
    };
    Global.GameWidth = 720;
    Global.GameHeight = 1280;
    Global.CellWidth = 100;
    Global.cellHeight = 100;
    Global.JewelWidth = 98;
    Global.JewelHeight = 98;
    Global.BaseDistance = 100;
    // 游戏为 7行9列
    Global.GameRow = 7;
    Global.GameCol = 9;
    /** 关卡数量 */
    Global.MapPointCount = 297;
    return Global;
}());
__reflect(Global.prototype, "Global");
var Debug = (function () {
    function Debug() {
    }
    Debug.Log = function (content) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        console.log(content, params);
    };
    Debug.TraceNowJewelObj = function (obj) {
        if (obj === void 0) { obj = null; }
        if (obj != null) {
            this.Log("JewelType:" + obj.jewel.JewelType + " " + obj.jewel.JewelPosition.x + "," + obj.jewel.JewelPosition.y);
        }
    };
    return Debug;
}());
__reflect(Debug.prototype, "Debug");
var Random = (function () {
    function Random() {
    }
    Random.Range = function (min, max) {
        return Utils.random(min, max);
    };
    Object.defineProperty(Random, "value", {
        get: function () {
            return Math.random();
        },
        enumerable: true,
        configurable: true
    });
    return Random;
}());
__reflect(Random.prototype, "Random");
function debug(content) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    if (params && params.length > 0) {
        egret.log.apply(egret, [content].concat(params));
    }
    else {
        egret.log(content);
    }
}
//# sourceMappingURL=Global.js.map