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
var JewelStar = (function (_super) {
    __extends(JewelStar, _super);
    function JewelStar() {
        var _this = _super.call(this) || this;
        _this.render.source = "Play_star_png";
        _this._ani = new BaseAni();
        _this._ani.setAni(AniTypes.JewelStar);
        _this._ani.isRepeat = true;
        _this._ani.frameRate = 5;
        _this._ani.horizontalCenter = 0;
        _this._ani.verticalCenter = 0;
        _this.addChildAt(_this._ani, 0);
        return _this;
    }
    JewelStar.prototype.play = function () {
        this._ani.play();
        // let tx: number = this.x;
        // let ty: number = this.y;
        // egret.Tween.removeTweens(this);
        // egret.Tween.get(this).to()
    };
    JewelStar.prototype.stop = function () {
        this._ani.stop();
    };
    JewelStar.prototype.Destroy = function () {
        _super.prototype.Destroy.call(this);
        this.stop();
    };
    return JewelStar;
}(JewelObj));
__reflect(JewelStar.prototype, "JewelStar");
//# sourceMappingURL=JewelStar.js.map