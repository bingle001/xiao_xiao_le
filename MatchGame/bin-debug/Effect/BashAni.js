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
var BashAni = (function (_super) {
    __extends(BashAni, _super);
    function BashAni() {
        var _this = _super.call(this) || this;
        _this.width = Global.BaseDistance;
        _this.height = Global.BaseDistance;
        _this._ani = new BaseAni();
        _this._ani.horizontalCenter = 0;
        _this._ani.verticalCenter = 0;
        _this.addChild(_this._ani);
        _this._ani.setAni(AniTypes.Bash);
        _this.visible = false;
        return _this;
    }
    BashAni.prototype.play = function () {
        this.visible = true;
        this._ani.play(this.stop, this);
    };
    BashAni.prototype.stop = function () {
        this._ani.stop();
        this.visible = false;
    };
    return BashAni;
}(eui.Group));
__reflect(BashAni.prototype, "BashAni");
//# sourceMappingURL=BashAni.js.map