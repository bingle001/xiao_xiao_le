var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoseUI = (function () {
    function LoseUI() {
    }
    LoseUI.prototype.Start = function () {
        if (PLayerInfo.MODE != 1)
            this.playerScore = PLayerInfo.Info.Score + (PLayerInfo.MapPlayer.Level - 1) * 5000;
        else
            this.playerScore = PLayerInfo.Info.Score;
        // display score text
        this.Score.text = this.playerScore.toString();
        // display best score text
        this.Best.text = this.getBestScore(this.playerScore).toString();
    };
    /// compare score with best score
    LoseUI.prototype.getBestScore = function (score) {
        if (PLayerInfo.MODE != 1) {
            if (score > PLayerInfo.MapPlayer.HightScore) {
                PLayerInfo.MapPlayer.HightScore = score;
                PlayerPrefs.SetInt(PLayerInfo.KEY_CLASSIC_HISCORE, PLayerInfo.MapPlayer.HightScore);
            }
        }
        return PLayerInfo.MapPlayer.HightScore;
    };
    return LoseUI;
}());
__reflect(LoseUI.prototype, "LoseUI");
//# sourceMappingURL=LoseUI.js.map