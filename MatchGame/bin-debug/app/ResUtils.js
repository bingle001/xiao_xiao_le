var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 素材工具 */
var ResUtils = (function () {
    function ResUtils() {
    }
    ResUtils.getRes = function (resName) {
        if (resName && resName.indexOf("_png") == -1) {
            resName = resName + "_png";
        }
        return resName;
    };
    ResUtils.getJewel = function (type) {
        var str = "jewel_%d_png";
        return Utils.stringFormat(str, type);
    };
    ResUtils.getGameBg = function (num) {
        var str = "bg_%d_png";
        return Utils.stringFormat(str, num);
    };
    ResUtils.getMap = function (index) {
        var str = "map_%d_png";
        return Utils.stringFormat(str, index);
    };
    ResUtils.getHome = function (resName) {
        return "home_" + resName + "_png";
    };
    ResUtils.getLoad = function (resName) {
        return "Load_" + resName + "_png";
    };
    ResUtils.getMapPopUp = function (resName) {
        return "map_" + resName + "_png";
    };
    ResUtils.getPlay = function (resName) {
        return "Play_" + resName + "_png";
    };
    ResUtils.getPlayPopUp = function (resName) {
        return "Play_" + resName + "_png";
    };
    ResUtils.getPlayTop = function (resName) {
        return "Play_top_" + resName + "_png";
    };
    ResUtils.getSelectMap = function (resName) {
        return "SelectMap_" + resName + "_png";
    };
    return ResUtils;
}());
__reflect(ResUtils.prototype, "ResUtils");
//# sourceMappingURL=ResUtils.js.map