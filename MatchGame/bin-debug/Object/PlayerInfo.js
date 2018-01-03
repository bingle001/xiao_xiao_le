var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 玩家信息 显示对象脚本
var PlayerInfo = (function () {
    function PlayerInfo() {
    }
    PlayerInfo.Awake = function () {
        PlayerInfo.Info = new PlayerInfo();
    };
    PlayerInfo.prototype.Start = function () {
        this.Score = 0;
        EffectSpawner.effect.SetLevel(PlayerInfo.MapPlayer.Level);
        EffectSpawner.effect.SetBest(PlayerInfo.MapPlayer.HightScore);
        EffectSpawner.effect.SetScore(this.Score);
        // this.textlv.text = PlayerInfo.MapPlayer.Level.toString();
    };
    PlayerInfo.MODE = 1; // mode : Arcade or Classic 
    PlayerInfo.BACKGROUND = 0; // background of mode
    PlayerInfo.KEY_CLASSIC_HISCORE = "classichightscore";
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map