var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//脚本基类
var MonoBehaviour = (function () {
    function MonoBehaviour() {
    }
    MonoBehaviour.prototype.Start = function () {
    };
    MonoBehaviour.prototype.Update = function () {
    };
    MonoBehaviour.prototype.FixedUpdate = function () {
    };
    MonoBehaviour.prototype.LateUpdate = function () {
    };
    MonoBehaviour.prototype.OnGUI = function () {
    };
    MonoBehaviour.prototype.OnDisable = function () {
    };
    MonoBehaviour.prototype.OnEnable = function () {
    };
    MonoBehaviour.prototype.Invoke = function () {
    };
    MonoBehaviour.Awake = function () {
    };
    return MonoBehaviour;
}());
__reflect(MonoBehaviour.prototype, "MonoBehaviour");
//# sourceMappingURL=MonoBehaviour.js.map