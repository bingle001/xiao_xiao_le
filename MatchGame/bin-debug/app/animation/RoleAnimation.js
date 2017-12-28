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
var RoleAnimation = (function (_super) {
    __extends(RoleAnimation, _super);
    function RoleAnimation(targets, actionName, framesToHold, frameNumType) {
        if (framesToHold === void 0) { framesToHold = 3; }
        if (frameNumType === void 0) { frameNumType = 0; }
        var _this = _super.call(this) || this;
        _this.isRepeat = false;
        _this.m_pLoaderComplete = null;
        _this.m_pLoaderCompleteThis = null;
        _this.isLife = false;
        _this.m_pActionBitmaps = targets;
        _this.m_pFrameAnim = FrameAnim.createAnim(framesToHold, actionName, frameNumType);
        return _this;
    }
    RoleAnimation.prototype.loadFiles = function (files, callback, callbackThis) {
        this.m_pNumComplete = 0;
        this.m_pLoaderNum = files.length;
        this.m_pLoaderComplete = callback;
        this.m_pLoaderCompleteThis = callbackThis;
    };
    return RoleAnimation;
}(Animate));
__reflect(RoleAnimation.prototype, "RoleAnimation");
//# sourceMappingURL=RoleAnimation.js.map