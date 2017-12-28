var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ButtonActionController = (function () {
    function ButtonActionController() {
    }
    ButtonActionController.Awake = function () {
        if (ButtonActionController.Click == null) {
            // DontDestroyOnLoad(gameObject);	??
            ButtonActionController.Click = new ButtonActionController();
        }
        // else if (Click != this)
        // {
        //     Destroy(gameObject);
        // }
        //??
    };
    // When select classic mode
    ButtonActionController.prototype.ClassicScene = function (level) {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PLayerInfo.MODE = 0;
        PLayerInfo.MapPlayer = new Player();
        PLayerInfo.MapPlayer.Level = level;
        PLayerInfo.MapPlayer.HightScore = level;
        PLayerInfo.MapPlayer.HightScore = PlayerPrefs.GetInt(PLayerInfo.KEY_CLASSIC_HISCORE, 0);
        Application.LoadLevel("PlayScene");
    };
    // When select arcade mode
    ButtonActionController.prototype.ArcadeScene = function (player) {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PLayerInfo.MODE = 1;
        PLayerInfo.MapPlayer = player;
        // this.StartCoroutine(GotoScreen("PlayScene"));
        this.GotoScreen("PlayScene");
    };
    ButtonActionController.prototype.SelectMap = function (mode) {
        SoundController.Sound.Click();
        if (mode == 1)
            Application.LoadLevel("MapScene");
        else
            this.HomeScene();
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
    /// <summary>
    /// Set and change state of sound background
    /// </summary>
    /// <param name="button">Image button</param>
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