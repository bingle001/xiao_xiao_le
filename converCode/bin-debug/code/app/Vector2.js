var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vector2 = (function (_super) {
    __extends(Vector2, _super);
    // public x: number = 0;
    // public y: number = 0;
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return _super.call(this, x, y) || this;
        // this.x = x || 0;
        // this.y = y || 0;
    }
    /**
     * 两坐标的距离
     */
    Vector2.Distance = function (v1, v2) {
        var dis = egret.Point.distance(v1, v2);
        return dis;
    };
    return Vector2;
}(egret.Point));
__reflect(Vector2.prototype, "Vector2");
//# sourceMappingURL=Vector2.js.map