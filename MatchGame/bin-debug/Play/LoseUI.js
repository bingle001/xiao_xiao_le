var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoseUI = (function () {
    function LoseUI() {
    }
    LoseUI.prototype.Start = function () {
        if (PlayerInfo.MODE != 1)
            this.playerScore = PlayerInfo.Info.Score + (PlayerInfo.MapPlayer.Level - 1) * 5000;
        else
            this.playerScore = PlayerInfo.Info.Score;
        // display score text
        this.Score.text = this.playerScore.toString();
        // display best score text
        this.Best.text = this.getBestScore(this.playerScore).toString();
    };
    /// compare score with best score
    LoseUI.prototype.getBestScore = function (score) {
        if (PlayerInfo.MODE != 1) {
            if (score > PlayerInfo.MapPlayer.HightScore) {
                PlayerInfo.MapPlayer.HightScore = score;
                PlayerPrefs.SetInt(PlayerInfo.KEY_CLASSIC_HISCORE, PlayerInfo.MapPlayer.HightScore);
            }
        }
        return PlayerInfo.MapPlayer.HightScore;
    };
    return LoseUI;
}());
__reflect(LoseUI.prototype, "LoseUI");
//# sourceMappingURL=LoseUI.js.map