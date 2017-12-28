var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 分辨率适配组件 （挂在Payer 游戏对象上）
var Resolution = (function () {
    function Resolution() {
        this.BASE_WIDTH = 480;
        this.BASE_HEIGHT = 800;
    }
    Resolution.prototype.Start = function () {
        // m_tranform = transform;
        this.setScale();
    };
    Resolution.prototype.setScale = function () {
        // this.baseRatio = this.BASE_WIDTH / this.BASE_HEIGHT * Screen.height;
        // this.percentScale = Screen.width / baseRatio;
        // //只针对缩小进行缩小，如果屏幕超过480*800 则不进行放大
        // if (percentScale<1)
        //     m_tranform.localScale = new Vector3(m_tranform.localScale.x * percentScale, m_tranform.localScale.y * percentScale, 1);
    };
    return Resolution;
}());
__reflect(Resolution.prototype, "Resolution");
//# sourceMappingURL=Resolution.js.map