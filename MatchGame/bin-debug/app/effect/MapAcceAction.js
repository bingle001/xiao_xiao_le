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
var MapAcceAction = (function (_super) {
    __extends(MapAcceAction, _super);
    function MapAcceAction() {
        var _this = _super.call(this) || this;
        _this.m_pMoveNeedTime = 0; //0.01666 * 1.5;
        _this.m_pAcceleration = 0;
        _this.m_pActionTime = 0;
        _this.m_pMoveSpeed = 500;
        _this.m_pMaxSpeed = 3000;
        _this.m_pCosAcce = 0;
        _this.m_pSinAcce = 0;
        _this.m_pIsMove = false;
        _this.lastActionTime = 0;
        _this.lastPosition = new egret.Point(0, 0);
        _this.m_pActionPosition = new egret.Point(0, 0);
        _this.isLife = false;
        return _this;
    }
    MapAcceAction.prototype.onDestroy = function () {
        this.isLife = false;
        _super.prototype.onDestroy.call(this);
        this.m_pTarget = null;
        egret.Point.release(this.lastPosition);
        this.lastPosition = null;
        egret.Point.release(this.m_pActionPosition);
        this.m_pActionPosition = null;
    };
    MapAcceAction.prototype.onAccelerMove = function (target, props) {
        this.m_pTarget = target;
        this.m_pActionPosition = props;
        var subPoint = props.subtract(this.lastPosition);
        var distance = egret.Point.distance(props, this.lastPosition);
        this.onCalc(distance, subPoint);
    };
    MapAcceAction.prototype.onMoveTo = function (target, curProps, toProps) {
        this.m_pTarget = target;
        this.m_pActionPosition = curProps;
        var subPoint = toProps.subtract(curProps);
        var distance = egret.Point.distance(toProps, curProps);
        this.m_pIsMove = true;
        this.onCalc(distance, subPoint, 0);
    };
    MapAcceAction.prototype.onCalc = function (distance, subPoint, acce) {
        if (acce === void 0) { acce = 3.8; }
        var radian = Math.atan2(subPoint.y, subPoint.x);
        if (distance > 0) {
            var detalTime = (egret.getTimer() - this.lastActionTime) / 1000;
            this.m_pMoveSpeed = acce == 0 ? distance / 0.01666 : distance / detalTime;
            this.m_pActionTime = 0;
            this.m_pCosAcce = Math.cos(radian);
            this.m_pSinAcce = Math.sin(radian);
            this.m_pMoveSpeed = this.m_pMoveSpeed > this.m_pMaxSpeed ? this.m_pMaxSpeed : this.m_pMoveSpeed;
            this.m_pAcceleration = -(this.m_pMoveSpeed * acce);
            this.m_pMoveNeedTime = distance / this.m_pMoveSpeed;
            this.isLife = true;
        }
    };
    MapAcceAction.prototype.onEnterFrame = function (advancedTime) {
        this.m_pActionTime += advancedTime / 1000;
        var speed = this.m_pMoveSpeed + this.m_pAcceleration * this.m_pActionTime;
        var sx = this.m_pMoveSpeed * this.m_pActionTime + this.m_pAcceleration * this.m_pActionTime * this.m_pActionTime / 2;
        var x = sx * this.m_pCosAcce;
        var y = sx * this.m_pSinAcce;
        var position = this.m_pActionPosition.add(egret.Point.create(x, y));
        if (speed <= 0) {
            this.isLife = false;
        }
        if (this.m_pIsMove && this.m_pActionTime >= this.m_pMoveNeedTime) {
            this.m_pIsMove = false;
            this.isLife = false;
        }
        this.m_pTarget.onMoveTo(position);
        if (!this.isLife) {
            this.m_pTarget.onMoveEnd(position);
        }
    };
    return MapAcceAction;
}(Animate));
__reflect(MapAcceAction.prototype, "MapAcceAction");
//# sourceMappingURL=MapAcceAction.js.map