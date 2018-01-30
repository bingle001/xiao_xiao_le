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
 * 每一页
 */
var MapPage = (function (_super) {
    __extends(MapPage, _super);
    function MapPage() {
        var _this = _super.call(this) || this;
        _this.width = 720;
        _this.height = 1200;
        _this._txt = new eui.Label();
        _this._txt.border = true;
        _this._txt.borderColor = 0x00000;
        _this._txt.width = _this.width;
        _this._txt.height = _this.height;
        _this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._txt.textAlign = "center";
        _this._txt.text = "000";
        _this.addChild(_this._txt);
        return _this;
    }
    MapPage.prototype.setPage = function (page) {
        this._page = page;
        this._txt.text = page.toString();
    };
    MapPage.prototype.onCreated = function () {
    };
    MapPage.prototype.onDestroy = function () {
    };
    MapPage.prototype.updateTopPage = function () {
        this.height = 420;
        this._txt.height = this.height;
    };
    return MapPage;
}(BaseCompoment));
__reflect(MapPage.prototype, "MapPage");
//# sourceMappingURL=MapPage.js.map