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
 * 场景基类
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.sceneType = 0;
        return _this;
    }
    BaseScene.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        Time.addFrameCall(this.onEnterFrame, this);
        Time.addSecondCall(this.onEnterSecond, this);
    };
    /**
     * 销毁
     */
    BaseScene.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        Time.removeFrameCall(this);
        Time.removeSecondCall(this);
    };
    /**
     * 每帧调用
     */
    BaseScene.prototype.onEnterFrame = function (deltaTime) {
    };
    /**
     * 每秒调用
     */
    BaseScene.prototype.onEnterSecond = function (deltaTime) {
    };
    return BaseScene;
}(BaseCompoment));
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map