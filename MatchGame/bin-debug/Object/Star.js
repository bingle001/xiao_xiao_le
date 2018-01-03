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
/**
 * 星星
 */
var Star = (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super.call(this) || this;
        _this.render.source = "Play_star_png";
        _this._ani = new BaseAni();
        _this._ani.setAni(AniTypes.JewelStar);
        _this._ani.isRepeat = true;
        _this.addChildAt(_this._ani, 0);
        return _this;
    }
    Star.prototype.play = function () {
        this._ani.play();
    };
    Star.prototype.stop = function () {
        this._ani.stop();
    };
    Star.prototype.Destroy = function () {
        _super.prototype.Destroy.call(this);
        this.stop();
    };
    return Star;
}(JewelObj));
__reflect(Star.prototype, "Star");
//# sourceMappingURL=Star.js.map