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
 * 地图场景
 */
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super.call(this) || this;
        _this._startY = 0;
        _this._stageY = 0;
        _this.name = "MapScene";
        _this.initSkin("map/MapSceneSkin.exml");
        return _this;
    }
    MapScene.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    MapScene.prototype.onCreated = function () {
        _super.prototype.onCreated.call(this);
        debug("MapScene onCreated");
        this._showRect = new egret.Rectangle();
        this._showRect.width = this.width;
        this._showRect.height = this.height;
        this.group_map.scrollRect = this._showRect;
        var pointX = 720 / 2;
        var pointY = 0;
        var index = 0;
        var len = 297;
        var startY = 1280;
        for (var i = 0; i < 13; i++) {
            var page = new MapPage();
            page.setPage(i);
            if (i == 12) {
                page.updateTopPage();
            }
            startY -= page.height;
            page.y = startY;
            this.group_map.addChild(page);
            //据点
            for (; index < len;) {
                var data = DataLoader.Data.mappos[index];
                var tx = data[0];
                var ty = data[1];
                tx = pointX + tx * 200;
                ty = -pointY - ty * 200;
                if (ty < startY) {
                    debug("-----------------------------");
                    debug("跳出循环%s, ty, startY :", i, ty, startY);
                    debug("-----------------------------");
                    break;
                }
                var oy = ty - startY;
                var point = new MapPoint();
                point.x = tx;
                point.y = oy;
                point.setLevel(index);
                page.addChild(point);
                debug("据点 %s,计算(%s, %s), 实际(%s, %s)", index, tx, ty, tx, oy);
                index++;
            }
        }
        this._minY = startY;
        debug("minY:", startY);
        this.group_map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    MapScene.prototype.onTouchBegin = function (e) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._startY = this._showRect.y;
        this._stageY = e.stageY;
    };
    MapScene.prototype.onTouchMove = function (e) {
        var ty = this._startY - (e.stageY - this._stageY);
        if (ty < this._minY) {
            ty = this._minY;
        }
        else if (ty > 0) {
            ty = 0;
        }
        this._showRect.y = ty;
        this.group_map.scrollRect = this._showRect;
    };
    MapScene.prototype.onTouchEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    /**
     * 每帧调用
     */
    MapScene.prototype.onEnterFrame = function (deltaTime) {
    };
    /**
     * 每秒调用
     */
    MapScene.prototype.onEnterSecond = function (deltaTime) {
    };
    return MapScene;
}(BaseScene));
__reflect(MapScene.prototype, "MapScene");
//# sourceMappingURL=MapScene.js.map