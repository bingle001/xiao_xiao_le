var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 动画名称枚举 */
var AniTypes = (function () {
    function AniTypes() {
    }
    //宝石特效
    AniTypes.Arrow = "arrow";
    AniTypes.Bash = "bash";
    AniTypes.Boom = "boom";
    AniTypes.Fire = "fire";
    AniTypes.Ice = "ice";
    AniTypes.Lock = "lock";
    AniTypes.Magic = "magic";
    AniTypes.JewelStar = "JewelStar";
    return AniTypes;
}());
__reflect(AniTypes.prototype, "AniTypes");
//# sourceMappingURL=AniTypes.js.map