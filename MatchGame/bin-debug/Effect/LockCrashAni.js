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
 * 锁碎裂动画
 */
var LockCrashAni = (function (_super) {
    __extends(LockCrashAni, _super);
    function LockCrashAni() {
        return _super.call(this) || this;
    }
    return LockCrashAni;
}(BaseAni));
__reflect(LockCrashAni.prototype, "LockCrashAni");
//# sourceMappingURL=LockCrashAni.js.map