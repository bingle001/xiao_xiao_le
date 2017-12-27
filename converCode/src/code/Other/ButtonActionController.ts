class ButtonActionController {

	public constructor() {
	}

	public static Click:ButtonActionController;     // instance of ButtonActionController
	public ButtonSprite: egret.Sprite[];                   //sprite array of buttons
	
    public static Awake():void{
        if (ButtonActionController.Click == null)
		{
			
            // DontDestroyOnLoad(gameObject);	??
			ButtonActionController.Click = new ButtonActionController();
        }
        // else if (Click != this)
        // {
        //     Destroy(gameObject);
        // }
		//??
	}
	
    // When select classic mode
    public ClassicScene(level:number):void
    {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PLayerInfo.MODE = 0;
        PLayerInfo.MapPlayer = new Player();
        PLayerInfo.MapPlayer.Level = level;
        PLayerInfo.MapPlayer.HightScore = level;
		PLayerInfo.MapPlayer.HightScore = PlayerPrefs.GetInt(PLayerInfo.KEY_CLASSIC_HISCORE, 0);
		
        Application.LoadLevel("PlayScene");
    }


    // When select arcade mode
	public ArcadeScene(player: Player): void{
        SoundController.Sound.Click();
        Time.timeScale = 1;
        PLayerInfo.MODE = 1;
        PLayerInfo.MapPlayer = player;
        // this.StartCoroutine(GotoScreen("PlayScene"));
        this.GotoScreen("PlayScene");
    }


    public SelectMap(mode:number):void
    {
        SoundController.Sound.Click();
        if (mode == 1)
            Application.LoadLevel("MapScene");
        else
            this.HomeScene();

        CameraMovement.StarPointMoveIndex = -1;
    }

    // Go to a scene with name
    public GotoScreen(screen:string):void
    {
        Application.LoadLevel(screen);
    }

    public HomeScene():void
    {
        SoundController.Sound.Click();
        Time.timeScale = 1;
        Application.LoadLevel("HomeScene");
    }

    // Set and change state of music
	public BMusic(button: eui.Button): void
    {
        if (PlayerPrefs.GetInt("MUSIC", 0) != 1)
        {
            PlayerPrefs.SetInt("MUSIC", 1); // music off
        }
        else
        {
            PlayerPrefs.SetInt("MUSIC", 0); // music on
        }

    }
    /// <summary>
    /// Set and change state of sound background
    /// </summary>
    /// <param name="button">Image button</param>
	public BSound(button: eui.Button): void
    {
        if (PlayerPrefs.GetInt("SOUND", 0) != 1)
        {
            PlayerPrefs.SetInt("SOUND", 1);
            // button.overrideSprite = ButtonSprite[3];
			//TODO 设置按钮皮肤状态
        }
        else
        {
            PlayerPrefs.SetInt("SOUND", 0);
            // button.overrideSprite = ButtonSprite[2];
			//TODO 设置按钮皮肤状态
        }
    }



}