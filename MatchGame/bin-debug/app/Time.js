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
        this._timeStamp = egret.getTimer();
        this._secondStamp = this._timeStamp;
        this._smoothDeltaTime = 1 / 30; //暂时30帧	//60帧
        this._frameFuncMaps = [];
        this._secondFuncMaps = [];
        egret.startTick(this.ticker, this);
    };
    Time.ticker = function (timeStamp) {
        var tmp = timeStamp - this._timeStamp;
        this._deltaTime = tmp / 1000;
        this._timeStamp = timeStamp;
        this.onEnterFrame(tmp);
        var sec = timeStamp - this._secondStamp;
        if (sec > 1000) {
            this.onEnterSecond(sec);
            this._secondStamp = timeStamp;
        }
        return false;
    };
    /**
     * 每帧调用
     * @param deltaTime 每帧的增量时间，毫秒
     */
    Time.onEnterFrame = function (deltaTime) {
        this.callBackMaps(this._frameFuncMaps, deltaTime);
    };
    /**
     * 每秒调用
     *
     */
    Time.onEnterSecond = function (deltaTime) {
        this.callBackMaps(this._secondFuncMaps, deltaTime);
    };
    Time.callBackMaps = function (maps, deltaTime) {
        for (var i in maps) {
            var obj = maps[i];
            if (obj && obj.callback && obj.thisObj) {
                if (obj.params && obj.params.length > 0) {
                    obj.callback.call(obj.thisObj, deltaTime, obj.params);
                }
                else {
                    obj.callback.call(obj.thisObj, deltaTime);
                }
            }
        }
    };
    /**
     * 添加每帧回调
     * @param callback 回调函数，例：onEnterFrame(deltaTime:number)，注意：参数deltaTime是增量时间
     */
    Time.addFrameCall = function (callback, thisObj) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (callback && thisObj) {
            var index = this.checkIndex(callback, thisObj, this._frameFuncMaps);
            if (index == -1) {
                var obj = {
                    callback: callback,
                    thisObj: thisObj,
                    params: params,
                };
                this._frameFuncMaps.push(obj);
            }
        }
    };
    /**
     * 添加每秒回调
     * @param callback 回调函数，例：onEnterSecond(deltaTime:number)，注意：参数deltaTime是增量时间
     */
    Time.addSecondCall = function (callback, thisObj) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (callback && thisObj) {
            var index = this.checkIndex(callback, thisObj, this._secondFuncMaps);
            if (index == -1) {
                var obj = {
                    callback: callback,
                    thisObj: thisObj,
                    params: params,
                };
                this._frameFuncMaps.push(obj);
            }
        }
    };
    /**
     * 移除每帧回调
     */
    Time.removeFrameCall = function (callback, thisObj) {
        if (callback && thisObj) {
            var index = this.checkIndex(callback, thisObj, this._frameFuncMaps);
            if (index >= 0) {
                this._frameFuncMaps.splice(index, 1);
            }
        }
    };
    /**
     * 移除每秒回调
     */
    Time.removeSecondCall = function (callback, thisObj) {
        if (callback && thisObj) {
            var index = this.checkIndex(callback, thisObj, this._secondFuncMaps);
            if (index >= 0) {
                this._secondFuncMaps.splice(index, 1);
            }
        }
    };
    /**
     * 判断在列表中的第几项
     */
    Time.checkIndex = function (callback, thisObj, maps) {
        for (var i = 0; i < maps.length; i++) {
            var obj = maps[i];
            if (obj.callback == callback && obj.thisObj == thisObj) {
                return i;
            }
        }
        return -1;
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
    Time._secondStamp = 0;
    Time._smoothDeltaTime = 0;
    return Time;
}());
__reflect(Time.prototype, "Time");
//# sourceMappingURL=Time.js.map