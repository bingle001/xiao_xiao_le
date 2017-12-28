var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 宝石
var Jewel = (function () {
    function Jewel() {
        this.JewelType = 0; // type of jewel
        // 宝石拥有技能
        this.JewelPower = 0; // type of effect 
    }
    return Jewel;
}());
__reflect(Jewel.prototype, "Jewel");
//# sourceMappingURL=Jewel.js.map