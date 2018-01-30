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
 * 据点
 */
var MapPoint = (function (_super) {
    __extends(MapPoint, _super);
    function MapPoint() {
        var _this = _super.call(this) || this;
        _this.width = 68;
        _this.height = 98;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this._txt = new eui.Label();
        _this._txt.border = true;
        _this._txt.borderColor = 0x00000;
        _this._txt.width = 68;
        _this._txt.height = 98;
        _this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._txt.textAlign = "center";
        _this._txt.text = "000";
        _this.addChild(_this._txt);
        return _this;
    }
    MapPoint.prototype.setLevel = function (lv) {
        this._txt.text = lv.toString();
    };
    /**
     * 创建完成时会调用
     */
    MapPoint.prototype.onCreated = function () {
    };
    /**
     * 销毁
     * 移除舞台时会调用
     */
    MapPoint.prototype.onDestroy = function () {
    };
    return MapPoint;
}(BaseCompoment));
__reflect(MapPoint.prototype, "MapPoint");
//# sourceMappingURL=MapPoint.js.map