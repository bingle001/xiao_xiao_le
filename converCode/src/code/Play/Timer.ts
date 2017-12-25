enum GameState {
	PLAYING = 0,
	PAUSE = 1,
	WIN = 2,
	LOST = 3,
}
	
// 计时器组件 （挂在GameController游戏对像下）
// 职责，游戏计时器，当此计时器为0时，当前游戏结束。
class Timer {

	public static timer: Timer;

    //thay doi game time => thay doi timerbarprocess
    // 本局游戏剩余时间
    public GameTime:number = 270;

    // 剩余游戏时间条
	public Timebar: eui.Image;
    public timebarTexture:egret.Texture;

    // 计时器更新组件
    public update:TimerUpdate;

    public NoSelect:GameObject;

    public PauseUI:GameObject;

    public  WinUI:GameObject;

    public  LoseUI:GameObject;

    public Nomove:GameObject;

    private _time:number;

    private const ClassicBaseScore:number = 5000;

    private ClassicTargetScore:number;

    public ScoreStack:number = 0;

    private startplus:boolean;

    public isAds:boolean;

    public isreq:boolean;

    public static Awake()
	{
		Timer.timer = new Timer();
	}
	
    public Start()
    {
        this._time = this.GameTime;
		this.Timebar.scaleX = 0; //Timebar.fillAmount = 0;
        this.AdsCd();//StartCoroutine
    }

	public TimeTick(b: boolean): void
    {
        if (b && PLayerInfo.MODE == 1)
        {
            //开始计时
            this.update.enabled = true;
        }
        else
        {
            //结束计时
            this.update.enabled = false;
        }

    }

    // 更新游戏进度条
    private timebarprocess(time:number)
    {
        // //计算时间进度条填充量
        // float fillamount = time / _time;
        // //更新剩余时间条
        // Timebar.fillAmount = fillamount;

		let scale: number = time / this._time;
		this.Timebar.scaleX = scale;
    }

	public ScoreBarProcess(score: number): void
    {
        this.ScoreStack += score;
        if (!this.startplus)
        {
            this.startplus = true;
            this.IEScoreBarProcess();//StartCoroutine
        }


	}
	
    private IEScoreBarProcess():void
	{
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
    }

    // 滴答一下
    public Tick():void
    {
        if (this.GameTime > 0 && GameController.action.GameState == GameState.PLAYING)
        {
            // Time.deltaTime 以秒计算，完成最后一帧的时间（只读）。使用这个函数使和你的游戏帧速率无关。
            this.GameTime -= Time.deltaTime;
            timebarprocess(GameTime);
        }
        else if (GameController.action.GameState == (int)GameState.PLAYING)
        {
            //游戏结束
            GameController.action.GameState = (int)GameState.LOST;
            GameTime = 0;
            Lost();
            //结束计时
            update.enabled = false;
        }
    }

    public void Win()
    {
        GameController.action.GameState = (int)GameState.WIN;
        NoSelect.SetActive(true);
        StartCoroutine(IEWin());
        Debug.Log("WIN");
    }
    public void Lost()
    {
        GameController.action.GameState = (int)GameState.LOST;
        NoSelect.SetActive(true);
        EffectSpawner.effect.SetScore(PLayerInfo.Info.Score);
        StartCoroutine(DisableAll());
        SoundController.Sound.Lose();
        showFullAds();
        Debug.Log("LOSE");
    }
    public void Pause()
    {
        SoundController.Sound.Click();
        if (GameController.action.GameState == (int)GameState.PLAYING)
        {
            GameController.action.GameState = (int)GameState.PAUSE;
            NoSelect.SetActive(true);
            PauseUI.SetActive(true);
            Time.timeScale = 0;
        }

    }
    public void Resume()
    {
        SoundController.Sound.Click();
        if (GameController.action.GameState == (int)GameState.PAUSE)
        {
            GameController.action.GameState = (int)GameState.PLAYING;
            Time.timeScale = 1;
            NoSelect.SetActive(false);
            PauseUI.SetActive(false);
        }
    }
    public void Restart()
    {
        if (PLayerInfo.MODE == 1)
        {
            PLayerInfo.Info.Score = 0;
            ButtonActionController.Click.ArcadeScene(PLayerInfo.MapPlayer);
        }
        else
        {
            ButtonActionController.Click.ClassicScene(1);
        }
    }
    public void Home()
    {
        ButtonActionController.Click.SelectMap(PLayerInfo.MODE);
    }
    public void Next()
    {
        ButtonActionController.Click.SelectMap(1);
        if (PLayerInfo.MapPlayer.Level < 297)
            CameraMovement.StarPointMoveIndex = PLayerInfo.MapPlayer.Level;
        else
            CameraMovement.StarPointMoveIndex = -1;
    }

    public void Music(UnityEngine.UI.Button button)
    {
        ButtonActionController.Click.BMusic(button);
    }
    public void Sound(UnityEngine.UI.Button button)
    {

    }
    public void ClassicLvUp()
    {
        GameController.action.GameState = (int)GameState.WIN;
        NoSelect.SetActive(true);
        StartCoroutine(UpLevel());

    }
    IEnumerator DisableAll()
    {
        DisableJewel(false);
        yield return new WaitForSeconds(0.75f);
        LoseUI.SetActive(true);
    }
    IEnumerator IEWin()
    {
        DisableJewel(true);
        EffectSpawner.effect.StarWinEffect(GameController.action.JewelStar.gameObject.transform.position);
        SoundController.Sound.Win();
        GameController.action.JewelStar.gameObject.transform.GetChild(0).gameObject.SetActive(false);
        yield return new WaitForSeconds(1f);
        WinUI.SetActive(true);
        showFullAds();
    }

    void showFullAds()
    {
        if (isAds)
        {
            GoogleMobileAdsScript.advertise.ShowInterstitial();
            isAds = false;
            isreq = false;
        }
    }

    IEnumerator UpLevel()
    {
        DisableJewel(true);
        showFullAds();
        yield return new WaitForSeconds(1f);
        ButtonActionController.Click.ClassicScene(PLayerInfo.MapPlayer.Level + 1);
    }

    public void DisableJewel(bool b)
    {
        for (int x = 0; x < 7; x++)
        {
            for (int y = 0; y < 9; y++)
            {
                if (!b)
                {
                    if (JewelSpawner.spawn.JewelGribScript[x, y] != null)
                        JewelSpawner.spawn.JewelGribScript[x, y].JewelDisable();
                }
                else
                {
                    if (JewelSpawner.spawn.JewelGribScript[x, y] != null && JewelSpawner.spawn.JewelGribScript[x, y] != GameController.action.JewelStar)
                        JewelSpawner.spawn.JewelGribScript[x, y].JewelDisable();
                }
            }
        }
    }

    public AdsCd():void {
        // while (true)
        // {
        //     yield return new WaitForSeconds(119f);
        //     isAds = true;
        // }
		this.isAds = true;
    }


}