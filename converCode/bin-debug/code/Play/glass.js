var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var glass = (function () {
    function glass() {
    }
    // disable animator
    glass.prototype.DisableAnimator = function () {
        // amin.enabled = false;
    };
    return glass;
}());
__reflect(glass.prototype, "glass");
//# sourceMappingURL=glass.js.map