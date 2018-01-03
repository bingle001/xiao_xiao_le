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
var WinUI = (function (_super) {
    __extends(WinUI, _super);
    function WinUI() {
        return _super.call(this) || this;
    }
    WinUI.prototype.Start = function () {
        this.TimeBonus.text = (Math.abs(Timer.timer.GameTime)).toString();
        this.playerScore = this.getGameScore(PlayerInfo.Info.Score, Timer.timer.GameTime);
        this.Score.text = this.playerScore.toString();
        this.Best.text = this.getBestScore(this.playerScore).toString();
        this.star = this.getGameStar(this.playerScore);
        this.StarAnimation(this.star); //StartCoroutine(StarAnimation(star));
        this.SaveData();
    };
    /// get best score
    WinUI.prototype.getBestScore = function (score) {
        if (score > PlayerInfo.MapPlayer.HightScore) {
            PlayerInfo.MapPlayer.HightScore = score;
        }
        return PlayerInfo.MapPlayer.HightScore;
    };
    /// calculate score
    WinUI.prototype.getGameScore = function (playerscore, gametime) {
        return playerscore + Math.abs(gametime) * 500;
    };
    /// caculate star number by score
    WinUI.prototype.getGameStar = function (score) {
        if (score >= 80000) {
            PlayerInfo.MapPlayer.Stars = 3;
            return 3;
        }
        else if (score >= 60000) {
            if (PlayerInfo.MapPlayer.Stars < 2)
                PlayerInfo.MapPlayer.Stars = 2;
            return 2;
        }
        else {
            PlayerInfo.MapPlayer.Stars = 1;
            return 1;
        }
    };
    /// animation star
    WinUI.prototype.StarAnimation = function (star) {
        for (var i = 0; i < star; i++) {
            this.Stargold[i].visible = true; // SetActive(true);
            // yield return new WaitForSeconds(0.7f);
            //TODO 间隔出现星星
        }
    };
    /// sava data
    WinUI.prototype.SaveData = function () {
        var index = PlayerInfo.MapPlayer.Level - 1;
        DataLoader.MyData[index] = PlayerInfo.MapPlayer;
        if (PlayerInfo.MapPlayer.Level < 297)
            DataLoader.MyData[index + 1].Locked = false;
        PlayerUtils.Save(DataLoader.MyData);
    };
    return WinUI;
}(eui.Component));
__reflect(WinUI.prototype, "WinUI");
//# sourceMappingURL=WinUI.js.map