var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimerUtils = (function () {
    function TimerUtils() {
    }
    TimerUtils.setTimeOut = function (delay, callback, thisObj) {
        var timer = new egret.Timer(delay, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, callback, thisObj);
        timer.start();
    };
    return TimerUtils;
}());
__reflect(TimerUtils.prototype, "TimerUtils");
//# sourceMappingURL=TimerUtils.js.map