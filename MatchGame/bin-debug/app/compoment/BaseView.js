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
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        return _super.call(this) || this;
    }
    BaseView.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.onDestroy();
    };
    BaseView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onCreated();
    };
    /**
     * 创建完成时会调用
     */
    BaseView.prototype.onCreated = function () {
    };
    /**
     * 销毁
     * 移除舞台时会调用
     */
    BaseView.prototype.onDestroy = function () {
    };
    return BaseView;
}(BaseCompoment));
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map