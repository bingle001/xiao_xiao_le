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
 * 动画基类
 */
var BaseAni = (function (_super) {
    __extends(BaseAni, _super);
    function BaseAni() {
        var _this = _super.call(this) || this;
        /** 是否循环播放 */
        _this.isRepeat = false;
        /** 播放完成后是否销毁 */
        _this.isPlayOverDestroy = false;
        /** 帧率，表示多少帧动一次，数值越大越慢 */
        _this.frameRate = 2;
        _this._count = 0;
        _this._curFrame = 0; //当前帧
        _this._pause = false;
        return _this;
    }
    BaseAni.prototype.onDestory = function () {
        this._aniType = null;
        this._config = null;
        this._pause = null;
        this._callback = null;
        this._thisObj = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 播放
     */
    BaseAni.prototype.play = function (callback, thisObj, startFrame) {
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (startFrame === void 0) { startFrame = 0; }
        this._callback = callback;
        this._thisObj = thisObj;
        this._curFrame = startFrame;
        Time.addFrameCall(this.onEnterFrame, this);
    };
    /**
     * 停止
     */
    BaseAni.prototype.stop = function () {
        Time.removeFrameCall(this.onEnterFrame, this);
    };
    /**
     * 暂停
     */
    BaseAni.prototype.pause = function () {
        this._pause = true;
    };
    /**
     * 继续
     */
    BaseAni.prototype.resume = function () {
        this._pause = false;
    };
    /**
     * 设置动画数据
     * @param 动画名称
     * @param showAtFrame 直接让当前显示在第几帧
     */
    BaseAni.prototype.setAni = function (aniType, showFrame) {
        if (showFrame === void 0) { showFrame = 0; }
        this._aniType = aniType;
        this._config = AnimationData.getConfig(aniType);
        this.isRepeat = this._config.isRepeat;
        this.showAtFrame(showFrame);
    };
    /**
     * 直接让当前显示在第几帧
     */
    BaseAni.prototype.showAtFrame = function (frame) {
        this._curFrame = frame;
        this.setFrame();
    };
    BaseAni.prototype.onEnterFrame = function (dt) {
        if (this._pause) {
            return;
        }
        this._count++;
        if (this._count >= this.frameRate) {
            this._count = 0;
            this.nextFrame();
        }
    };
    BaseAni.prototype.nextFrame = function () {
        this.setFrame();
        this._curFrame++;
        if (this._curFrame >= this._config.frame) {
            if (this.isRepeat) {
                this._curFrame = 0;
            }
            else {
                if (this._callback && this._thisObj) {
                    this._callback.call(this._thisObj);
                }
                this.stop();
                if (this.isPlayOverDestroy) {
                    this.onDestory();
                }
            }
        }
    };
    BaseAni.prototype.setFrame = function () {
        var key = "%s_%d_png";
        key = Utils.stringFormat(key, this._aniType, this._curFrame);
        this.texture = RES.getRes(key);
    };
    return BaseAni;
}(eui.Image));
__reflect(BaseAni.prototype, "BaseAni");
//# sourceMappingURL=BaseAni.js.map