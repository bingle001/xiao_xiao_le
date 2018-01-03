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
        this.group_jewelParent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        JewelSpawner.spawn.initJewelParent(this.group_jewelParent);
        if (PlayerInfo.MODE == 1) {
            GribManager.cell.GribMapCreate(PlayerInfo.MapPlayer.Name, this.group_cellParent, this.group_borderParent, this.group_cornerParent);
        }
        else {
            GribManager.cell.GribMapCreate("classic", this.group_cellParent, this.group_borderParent, this.group_cornerParent);
        }
        PlayerInfo.Info.Start();
        GameController.action.Start(this.group_selector, this.group_noSelector);
        EffectSpawner.effect.start(this.group_effectParent);
    };
    GameScene.prototype.onTouchBegin = function (e) {
        this.group_jewelParent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        Input._isMouseDown = true;
        Input._localX = e.localX;
        Input._localY = e.localY;
        // debug("onTouchBegin:(%s, %s)", Input._localX, Input._localY);
    };
    GameScene.prototype.onTouchMove = function (e) {
        if (e.target == this.group_jewelParent) {
            Input._localX = e.localX;
            Input._localY = e.localY;
            // debug("onTouchMove:(%s, %s)", Input._localX, Input._localY);
        }
    };
    GameScene.prototype.onTouchEnd = function (e) {
        this.group_jewelParent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        Input._isMouseDown = false;
        // debug("onTouchEnd");
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