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
 * u3d里面的游戏对象
 */
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.row = 0;
        _this.col = 0;
        return _this;
    }
    GameObject.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 激活或取消激活某个显示对象
     */
    GameObject.prototype.SetActive = function (parent, obj, isActive) {
        if (parent && obj) {
            if (isActive) {
                obj.visible = true;
                parent.addChild(obj);
            }
            else {
                obj.visible = false;
                if (obj.parent) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    };
    return GameObject;
}(eui.Group));
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map