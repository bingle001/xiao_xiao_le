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
 * 合成特效，爆炸
 */
var EnchantAni = (function (_super) {
    __extends(EnchantAni, _super);
    function EnchantAni() {
        var _this = _super.call(this) || this;
        _this.source = "enchant_png";
        _this.width = 32;
        _this.height = 32;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        return _this;
    }
    EnchantAni.prototype.play = function () {
        this.visible = true;
        this.tweenStart();
    };
    EnchantAni.prototype.tweenStart = function () {
        egret.Tween.removeTweens(this);
        this.rotation = 0;
        egret.Tween.get(this).to({ rotation: 360 }, 2000).call(this.tweenStart, this);
    };
    EnchantAni.prototype.stop = function () {
        this.visible = false;
        egret.Tween.removeTweens(this);
    };
    return EnchantAni;
}(BaseAni));
__reflect(EnchantAni.prototype, "EnchantAni");
//# sourceMappingURL=EnchantAni.js.map