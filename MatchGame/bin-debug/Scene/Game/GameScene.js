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
 * 游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.name = "GameScene";
        _this.initSkin("game/GameSceneSkin.exml");
        return _this;
    }
    /**
     * 创建完成时会调用
     */
    GameScene.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        debug("GameScene onCreated");
        if (PLayerInfo.MODE == 1) {
            GribManager.cell.GribMapCreate(PLayerInfo.MapPlayer.Name, this.group_cellParent, this.group_borderParent, this.group_cornerParent);
        }
        else {
            GribManager.cell.GribMapCreate("classic", this.group_cellParent, this.group_borderParent, this.group_cornerParent);
        }
        // GameController.action.Start();
    };
    /**
     * 销毁
     * 移除舞台时会调用
     */
    GameScene.prototype.onDestroy = function () {
    };
    /**
     * 每帧调用
     */
    GameScene.prototype.onEnterFrame = function (deltaTime) {
    };
    /**
     * 每秒调用
     */
    GameScene.prototype.onEnterSecond = function (deltaTime) {
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map