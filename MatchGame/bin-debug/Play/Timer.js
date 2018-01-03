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
var GameState;
(function (GameState) {
    GameState[GameState["PLAYING"] = 0] = "PLAYING";
    GameState[GameState["PAUSE"] = 1] = "PAUSE";
    GameState[GameState["WIN"] = 2] = "WIN";
    GameState[GameState["LOST"] = 3] = "LOST";
})(GameState || (GameState = {}));
// 计时器组件 （挂在GameController游戏对像下）
// 职责，游戏计时器，当此计时器为0时，当前游戏结束。
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super.call(this) || this;
        //thay doi game time => thay doi timerbarprocess
        // 本局游戏剩余时间
        _this.GameTime = 270;
        _this.ScoreStack = 0;
        _this.m_pIsUpdate = false; //是否每帧更新
        return _this;
    }
    Timer.Awake = function () {
        Timer.timer = new Timer();
    };
    Timer.prototype.Start = function () {
        this._time = this.GameTime;
        this.Timebar.scaleX = 0; //Timebar.fillAmount = 0;
        this.AdsCd(); //StartCoroutine
    };
    Timer.prototype.TimeTick = function (b) {
        if (b && PlayerInfo.MODE == 1) {
            //开始计时
            this.m_pIsUpdate = true; // this.update.enabled = true;
        }
        else {
            //结束计时
            this.m_pIsUpdate = false; // this.update.enabled = false;
        }
    };
    // 更新游戏进度条
    Timer.prototype.timebarprocess = function (time) {
        // //计算时间进度条填充量
        // float fillamount = time / _time;
        // //更新剩余时间条
        // Timebar.fillAmount = fillamount;
        var scale = time / this._time;
        this.Timebar.scaleX = scale;
    };
    Timer.prototype.ScoreBarProcess = function (score) {
        this.ScoreStack += score;
        if (!this.startplus) {
            this.startplus = true;
            this.IEScoreBarProcess(); //StartCoroutine
        }
    };
    Timer.prototype.IEScoreBarProcess = function () {
        //应该是滚动分数进度条的特效来的
        // while (ScoreStack > 0 && GameController.action.GameState == (int)GameState.PLAYING)
        // {
        //     ScoreStack -= 10;
        //     if (PLayerInfo.Info.Score + 10 < 5000 * PLayerInfo.MapPlayer.Level)
        //     { PLayerInfo.Info.Score += 10; }
        //     else
        //     {
        //         PLayerInfo.Info.Score = 5000 * PLayerInfo.MapPlayer.Level;
        //         break;
        //     }
        //     float fillamount = PLayerInfo.Info.Score / (5000f * PLayerInfo.MapPlayer.Level);
        //     Timebar.fillAmount = fillamount;
        //     yield return null;
        // }
        this.startplus = false;
    };
    // 滴答一下
    Timer.prototype.Tick = function () {
        if (this.GameTime > 0 && GameController.action.GameState == GameState.PLAYING) {
            // Time.deltaTime 以秒计算，完成最后一帧的时间（只读）。使用这个函数使和你的游戏帧速率无关。
            this.GameTime -= Time.deltaTime;
            this.timebarprocess(this.GameTime);
        }
        else if (GameController.action.GameState == GameState.PLAYING) {
            //游戏结束
            GameController.action.GameState = GameState.LOST;
            this.GameTime = 0;
            this.Lost();
            //结束计时
            // update.enabled = false;
        }
    };
    Timer.prototype.Win = function () {
        GameController.action.GameState = GameState.WIN;
        this.NoSelect.visible = false; // NoSelect.SetActive(true);
        this.IEWin(); // StartCoroutine(IEWin());
        Debug.Log("WIN");
    };
    Timer.prototype.Lost = function () {
        GameController.action.GameState = GameState.LOST;
        this.NoSelect.visible = true; // NoSelect.SetActive(true);
        EffectSpawner.effect.SetScore(PlayerInfo.Info.Score);
        this.DisableAll(); // StartCoroutine(DisableAll());
        SoundController.Sound.Lose();
        this.showFullAds();
        Debug.Log("LOSE");
    };
    Timer.prototype.Pause = function () {
        SoundController.Sound.Click();
        if (GameController.action.GameState == GameState.PLAYING) {
            GameController.action.GameState = GameState.PAUSE;
            this.NoSelect.visible = true; // NoSelect.SetActive(true);
            this.PauseUI.visible = true; // PauseUI.SetActive(true);
            Time.timeScale = 0;
        }
    };
    Timer.prototype.Resume = function () {
        SoundController.Sound.Click();
        if (GameController.action.GameState == GameState.PAUSE) {
            GameController.action.GameState = GameState.PLAYING;
            Time.timeScale = 1;
            this.NoSelect.visible = false; // NoSelect.SetActive(false);
            this.PauseUI.visible = false; // PauseUI.SetActive(false);
        }
    };
    Timer.prototype.Restart = function () {
        if (PlayerInfo.MODE == 1) {
            PlayerInfo.Info.Score = 0;
            ButtonActionController.Click.ArcadeScene(PlayerInfo.MapPlayer);
        }
        else {
            ButtonActionController.Click.ClassicScene(1);
        }
    };
    Timer.prototype.Home = function () {
        ButtonActionController.Click.SelectMap(PlayerInfo.MODE);
    };
    Timer.prototype.Next = function () {
        ButtonActionController.Click.SelectMap(1);
        if (PlayerInfo.MapPlayer.Level < 297)
            CameraMovement.StarPointMoveIndex = PlayerInfo.MapPlayer.Level;
        else
            CameraMovement.StarPointMoveIndex = -1;
    };
    Timer.prototype.Music = function (button) {
        ButtonActionController.Click.BMusic(button);
    };
    Timer.prototype.Sound = function (button) {
    };
    Timer.prototype.ClassicLvUp = function () {
        GameController.action.GameState = GameState.WIN;
        this.NoSelect.visible = true; // NoSelect.SetActive(true);
        this.UpLevel(); // StartCoroutine(UpLevel());
    };
    Timer.prototype.DisableAll = function () {
        this.DisableJewel(false);
        // yield return new WaitForSeconds(0.75f);
        this.LoseUI.visible = true; // LoseUI.SetActive(true);
    };
    Timer.prototype.IEWin = function () {
        this.DisableJewel(true);
        EffectSpawner.effect.StarWinEffect(GameController.action.JewelStar.jewel.JewelPosition);
        SoundController.Sound.Win();
        // ?? //GameController.action.JewelStar.gameObject.transform.GetChild(0).gameObject.SetActive(false);
        // yield return new WaitForSeconds(1f);
        this.WinUI.visible = true; // WinUI.SetActive(true);
        this.showFullAds();
    };
    Timer.prototype.showFullAds = function () {
        if (this.isAds) {
            // GoogleMobileAdsScript.advertise.ShowInterstitial();
            this.isAds = false;
            this.isreq = false;
        }
    };
    Timer.prototype.UpLevel = function () {
        this.DisableJewel(true);
        this.showFullAds();
        // yield return new WaitForSeconds(1f);
        ButtonActionController.Click.ClassicScene(PlayerInfo.MapPlayer.Level + 1);
    };
    Timer.prototype.DisableJewel = function (b) {
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (!b) {
                    if (JewelSpawner.spawn.JewelGrib[x][y] != null)
                        JewelSpawner.spawn.JewelGrib[x][y].JewelDisable();
                }
                else {
                    if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y] != GameController.action.JewelStar)
                        JewelSpawner.spawn.JewelGrib[x][y].JewelDisable();
                }
            }
        }
    };
    Timer.prototype.AdsCd = function () {
        // while (true)
        // {
        //     yield return new WaitForSeconds(119f);
        //     isAds = true;
        // }
        this.isAds = true;
    };
    Timer.ClassicBaseScore = 5000;
    return Timer;
}(MonoBehaviour));
__reflect(Timer.prototype, "Timer");
//# sourceMappingURL=Timer.js.map