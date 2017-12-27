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
/** 3维坐标 */
var Vector3 = (function (_super) {
    __extends(Vector3, _super);
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = _super.call(this, x, y) || this;
        // public x: number = 0;
        // public y: number = 0;
        _this.z = 0;
        // this.x = x || 0;
        // this.y = y || 0;
        _this.z = z || 0;
        return _this;
    }
    Object.defineProperty(Vector3, "Zero", {
        get: function () {
            return new Vector3();
        },
        enumerable: true,
        configurable: true
    });
    return Vector3;
}(Vector2));
__reflect(Vector3.prototype, "Vector3");
//# sourceMappingURL=Vector3.js.map