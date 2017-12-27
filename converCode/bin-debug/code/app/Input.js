var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 输入，按键输入、屏幕点击，都是属于Input
 * 这里可以统一处理，只用舞台上来全局监听一个就够了
 */
var Input = (function () {
    function Input() {
    }
    Input.Awake = function () {
    };
    /**
     * 检测鼠标按键是否按下
     * @param type 0对应左键 ， 1对应右键 ， 2对应中键
     */
    Input.GetMouseButtonDown = function (type) {
        return false;
    };
    Input.GetMouseButton = function (type) {
        return false;
    };
    Input.GetMouseButtonUp = function (type) {
        return false;
    };
    return Input;
}());
__reflect(Input.prototype, "Input");
//# sourceMappingURL=Input.js.map