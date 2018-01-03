class ButtonActionController {

    public constructor() {
    }

    public static Click: ButtonActionController;

    public static Awake(): void {
        ButtonActionController.Click = new ButtonActionController();
    }

    public ClassicScene(level: number): void {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PlayerInfo.MODE = 0;
        PlayerInfo.MapPlayer = new Player();
        PlayerInfo.MapPlayer.Level = level;
        PlayerInfo.MapPlayer.HightScore = level;
        PlayerInfo.MapPlayer.HightScore = PlayerPrefs.GetInt(PlayerInfo.KEY_CLASSIC_HISCORE, 0);

        Application.changeScene(SceneType.Game);
    }


    public ArcadeScene(player: Player): void {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PlayerInfo.MODE = 1;
        PlayerInfo.MapPlayer = player;

        Application.changeScene(SceneType.Game);
    }


    public SelectMap(mode: number): void {
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
    }

    // Go to a scene with name
    public GotoScreen(screen: string): void {
        Application.LoadLevel(screen);
    }

    public HomeScene(): void {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        Application.LoadLevel("HomeScene");
    }

    // Set and change state of music
    public BMusic(button: eui.Button): void {
        if (PlayerPrefs.GetInt("MUSIC", 0) != 1) {
            PlayerPrefs.SetInt("MUSIC", 1); // music off
        }
        else {
            PlayerPrefs.SetInt("MUSIC", 0); // music on
        }

    }

    /// Set and change state of sound background
    public BSound(button: eui.Button): void {
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
    }



}