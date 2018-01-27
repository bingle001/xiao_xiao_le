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
 * 得分动画
 */
var ScoreAni = (function (_super) {
    __extends(ScoreAni, _super);
    function ScoreAni() {
        var _this = _super.call(this) || this;
        _this.source = "Play_top_star_png";
        _this.width = 35;
        _this.height = 35;
        _this.anchorOffsetX = 17;
        _this.anchorOffsetY = 17;
        return _this;
    }
    ScoreAni.prototype.play = function (ox, oy, tx, ty) {
        this.x = ox;
        this.y = oy;
        egret.Tween.get(this).to({ x: tx, y: ty }, 1000).call(this.playOver, this);
    };
    ScoreAni.prototype.playOver = function () {
        egret.Tween.removeTweens(this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        ScoreAni._pool.push(this);
    };
    ScoreAni.start = function (targetX, targetY, parent) {
        this._targetX = targetX;
        this._targetY = targetY;
        this._parent = parent;
    };
    ScoreAni.getAni = function () {
        var ani;
        if (this._pool.length > 0) {
            ani = this._pool.pop();
        }
        else {
            ani = new ScoreAni();
        }
        return ani;
    };
    /**
     * 播放得分动画
     * @param ox, oy 动画的起始位置xy
     * @param tx, ty 目标位置xy，即能量槽的位置
     */
    ScoreAni.playGetScore = function (startX, startY) {
        var ani = this.getAni();
        ani.play(startX, startY, this._targetX, this._targetY);
        this._parent.addChild(ani);
    };
    ScoreAni._pool = [];
    return ScoreAni;
}(eui.Image));
__reflect(ScoreAni.prototype, "ScoreAni");
//# sourceMappingURL=ScoreAni.js.map