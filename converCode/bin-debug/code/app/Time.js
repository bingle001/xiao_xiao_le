var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Time = (function () {
    function Time() {
    }
    Object.defineProperty(Time, "deltaTime", {
        /**
         *  以秒计算，完成最后一帧的时间（只读）
         *  使用这个函数使和你的游戏帧速率无关。
         */
        get: function () {
            return this._deltaTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Time, "smoothDeltaTime", {
        /**
         * 平滑间隔时间，为了避免帧时间波动大，取的平均值
         */
        get: function () {
            return this._smoothDeltaTime;
        },
        enumerable: true,
        configurable: true
    });
    Time.Awake = function () {
        egret.startTick(this.ticker, this);
        this._timeStamp = egret.getTimer();
        this._smoothDeltaTime = 1 / 60; //60帧
    };
    Time.ticker = function (timeStamp) {
        var tmp = timeStamp - this._timeStamp;
        this._deltaTime = tmp / 1000;
        this._timeStamp = timeStamp;
        return false;
    };
    /**
     * 游戏运行速率
     * 0 游戏暂停
     * 1 正常速率
     * 2 2倍速率
     * 3,4,5.....以此类推
     */
    Time.timeScale = 1;
    Time._deltaTime = 0;
    Time._timeStamp = 0;
    Time._smoothDeltaTime = 0;
    return Time;
}());
__reflect(Time.prototype, "Time");
//# sourceMappingURL=Time.js.map