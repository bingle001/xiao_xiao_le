var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Animate = (function () {
    function Animate() {
        this.isLife = true;
        this.updateTime = 0;
        AnimateTimer.Instance.push(this);
    }
    Animate.prototype.onCreate = function () {
    };
    Animate.prototype.onDestroy = function () {
        this.isLife = false;
        AnimateTimer.Instance.remove(this);
    };
    Animate.prototype.onEnterFrame = function (delta) {
    };
    Animate.prototype.onTimer = function (delta) {
        var frameTime = Animate.FRAME_TIME_UPDATE;
        this.updateTime += delta;
        if (this.updateTime > 5000) {
            this.updateTime = frameTime;
        }
        while (this.updateTime >= frameTime) {
            if (!this.isLife) {
                break;
            }
            this.onEnterFrame(frameTime);
            this.updateTime -= frameTime;
        }
    };
    Animate.FRAME_TIME_UPDATE = 16;
    return Animate;
}());
__reflect(Animate.prototype, "Animate");
var AnimateTimer = (function () {
    function AnimateTimer() {
        this.m_pList = [];
        this.m_pTimeStamp = 0;
    }
    AnimateTimer.prototype.onEnterFrame = function (timeStamp) {
        var list = this.m_pList.concat();
        var delta = (timeStamp - this.m_pTimeStamp);
        for (var i = 0, length = list.length; i < length; i++) {
            var action = list[i];
            if (action.isLife)
                action.onTimer(delta);
        }
        this.m_pTimeStamp = timeStamp;
        return false;
    };
    AnimateTimer.prototype.push = function (action) {
        var isAction = this.m_pList.length == 0;
        this.m_pList.push(action);
        if (isAction) {
            this.m_pTimeStamp = egret.getTimer();
            egret.startTick(this.onEnterFrame, this);
        }
        return action;
    };
    AnimateTimer.prototype.remove = function (action) {
        var index = this.m_pList.indexOf(action);
        if (index != -1) {
            this.m_pList.splice(index, 1);
        }
        if (this.m_pList.length == 0) {
            egret.stopTick(this.onEnterFrame, this);
        }
    };
    Object.defineProperty(AnimateTimer, "Instance", {
        get: function () {
            if (AnimateTimer._instance == null) {
                AnimateTimer._instance = new AnimateTimer();
            }
            return AnimateTimer._instance;
        },
        enumerable: true,
        configurable: true
    });
    return AnimateTimer;
}());
__reflect(AnimateTimer.prototype, "AnimateTimer");
//# sourceMappingURL=AnimateTimer.js.map