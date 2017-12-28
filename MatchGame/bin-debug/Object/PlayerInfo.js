var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 玩家信息 显示对象脚本
var PLayerInfo = (function () {
    function PLayerInfo() {
    }
    PLayerInfo.Awake = function () {
        PLayerInfo.Info = new PLayerInfo();
        PLayerInfo.BACKGROUND = PLayerInfo.MapPlayer.Background;
    };
    PLayerInfo.prototype.Start = function () {
        this.Score = 0;
        EffectSpawner.effect.SetLevel(PLayerInfo.MapPlayer.Level);
        EffectSpawner.effect.SetBest(PLayerInfo.MapPlayer.HightScore);
        EffectSpawner.effect.SetScore(this.Score);
        this.textlv.text = PLayerInfo.MapPlayer.Level.toString();
    };
    PLayerInfo.KEY_CLASSIC_HISCORE = "classichightscore";
    return PLayerInfo;
}());
__reflect(PLayerInfo.prototype, "PLayerInfo");
//# sourceMappingURL=PlayerInfo.js.map