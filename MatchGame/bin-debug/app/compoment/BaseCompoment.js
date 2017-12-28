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
 * 皮肤基类
 */
var BaseCompoment = (function (_super) {
    __extends(BaseCompoment, _super);
    function BaseCompoment() {
        return _super.call(this) || this;
    }
    /**
     * 初始化皮肤
     * 相对于 resource/skins/ 下的目录
     */
    BaseCompoment.prototype.initSkin = function (skinUrl) {
        this.skinName = "resource/skins/" + skinUrl;
    };
    BaseCompoment.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.onDestroy();
    };
    BaseCompoment.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onCreated();
    };
    /**
     * 创建完成时会调用
     */
    BaseCompoment.prototype.onCreated = function () {
    };
    /**
     * 销毁
     * 移除舞台时会调用
     */
    BaseCompoment.prototype.onDestroy = function () {
    };
    BaseCompoment.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BaseCompoment;
}(eui.Component));
__reflect(BaseCompoment.prototype, "BaseCompoment");
//# sourceMappingURL=BaseCompoment.js.map