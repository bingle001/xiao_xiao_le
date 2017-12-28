var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 多分辨率适配 组件(挂在 背景图上)
// 职责:用于对背景图根据实际屏幕大小进行缩放
var MultiResolution = (function () {
    function MultiResolution() {
    }
    MultiResolution.prototype.Start = function () {
        // m_tranform = transform;
        // this.setScale();
    };
    MultiResolution.BASE_WIDTH = 480;
    MultiResolution.BASE_HEIGHT = 800;
    return MultiResolution;
}());
__reflect(MultiResolution.prototype, "MultiResolution");
//# sourceMappingURL=MultiResolution.js.map