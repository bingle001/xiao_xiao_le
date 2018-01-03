var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ButtonActionController = (function () {
    function ButtonActionController() {
    }
    ButtonActionController.Awake = function () {
        ButtonActionController.Click = new ButtonActionController();
    };
    ButtonActionController.prototype.ClassicScene = function (level) {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PlayerInfo.MODE = 0;
        PlayerInfo.MapPlayer = new Player();
        PlayerInfo.MapPlayer.Level = level;
        PlayerInfo.MapPlayer.HightScore = level;
        PlayerInfo.MapPlayer.HightScore = PlayerPrefs.GetInt(PlayerInfo.KEY_CLASSIC_HISCORE, 0);
        Application.changeScene(SceneType.Game);
    };
    ButtonActionController.prototype.ArcadeScene = function (player) {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PlayerInfo.MODE = 1;
        PlayerInfo.MapPlayer = player;
        Application.changeScene(SceneType.Game);
    };
    ButtonActionController.prototype.SelectMap = function (mode) {
        SoundController.Sound.Click();
        if (mode == 1) {
            Application.changeScene(SceneType.Map);
            // Application.LoadLevel("MapScene");
        }
        else {
            Application.changeScene(SceneType.Home);
            // this.HomeScene();
        }
        CameraMovement.StarPointMoveIndex = -1;
    };
    // Go to a scene with name
    ButtonActionController.prototype.GotoScreen = function (screen) {
        Application.LoadLevel(screen);
    };
    ButtonActionController.prototype.HomeScene = function () {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        Application.LoadLevel("HomeScene");
    };
    // Set and change state of music
    ButtonActionController.prototype.BMusic = function (button) {
        if (PlayerPrefs.GetInt("MUSIC", 0) != 1) {
            PlayerPrefs.SetInt("MUSIC", 1); // music off
        }
        else {
            PlayerPrefs.SetInt("MUSIC", 0); // music on
        }
    };
    /// Set and change state of sound background
    ButtonActionController.prototype.BSound = function (button) {
        if (PlayerPrefs.GetInt("SOUND", 0) != 1) {
            PlayerPrefs.SetInt("SOUND", 1);
            // button.overrideSprite = ButtonSprite[3];
            //TODO 设置按钮皮肤状态
        }
        else {
            PlayerPrefs.SetInt("SOUND", 0);
            // button.overrideSprite = ButtonSprite[2];
            //TODO 设置按钮皮肤状态
        }
    };
    return ButtonActionController;
}());
__reflect(ButtonActionController.prototype, "ButtonActionController");
//# sourceMappingURL=ButtonActionController.js.map