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
// 游戏背景 组件（挂在Screen/Background 游戏对像下）
var SetBackground = (function (_super) {
    __extends(SetBackground, _super);
    // public Background:string[];//Sprite[]     // array background
    function SetBackground() {
        var _this = _super.call(this) || this;
        _this.img = new eui.Image();
        _this.addChild(_this.img);
        return _this;
    }
    SetBackground.prototype.Start = function () {
        // GetComponent<SpriteRenderer>().sprite = Background[PLayerInfo.BACKGROUND];
        this.img.source = ResUtils.getGameBg(PLayerInfo.BACKGROUND);
    };
    return SetBackground;
}(GameObject));
__reflect(SetBackground.prototype, "SetBackground");
//# sourceMappingURL=SetBackground.js.map