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
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.name = "HomeScene";
        _this.initSkin("home/HomeSceneSkin.exml");
        return _this;
    }
    /**
     * 创建完成时会调用
     */
    HomeScene.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        debug("homeScene onCreated");
    };
    /**
     * 销毁
     * 移除舞台时会调用
     */
    HomeScene.prototype.onDestroy = function () {
    };
    /**
     * 每帧调用
     */
    HomeScene.prototype.onEnterFrame = function (deltaTime) {
    };
    /**
     * 每秒调用
     */
    HomeScene.prototype.onEnterSecond = function (deltaTime) {
    };
    return HomeScene;
}(BaseScene));
__reflect(HomeScene.prototype, "HomeScene");
//# sourceMappingURL=HomeScene.js.map