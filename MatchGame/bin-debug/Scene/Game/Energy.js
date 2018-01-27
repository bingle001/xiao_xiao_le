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
 * 能量槽
 */
var Energy = (function (_super) {
    __extends(Energy, _super);
    function Energy() {
        var _this = _super.call(this) || this;
        _this._max = 100; //最大值
        _this._value = 0; //当前值
        return _this;
    }
    /**
     * 创建完成时会调用
     */
    Energy.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        this._showRect = new egret.Rectangle();
        this._showRect.width = this.img_bar.width;
        this._showRect.height = this.img_bar.height;
        this.updateEnergy(0);
    };
    /**
     * 销毁
     * 移除舞台时会调用
     */
    Energy.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    Energy.prototype.setMax = function (max) {
        this._max = max;
    };
    Energy.prototype.updateEnergy = function (value) {
        this._value = value;
        var scale;
        if (this._max <= 0) {
            scale = 0;
        }
        else {
            scale = value / this._max;
            if (scale < 0) {
                scale = 0;
            }
            else if (scale > 1) {
                scale = 1;
            }
        }
        var th = scale * this.img_bar.height;
        this._showRect.height = th;
        this._showRect.y = this.img_bar.height - th;
        this.img_bar.scrollRect = this._showRect;
    };
    return Energy;
}(BaseCompoment));
__reflect(Energy.prototype, "Energy");
//# sourceMappingURL=Energy.js.map