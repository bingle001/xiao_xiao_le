enum GameState {
    PLAYING = 0,
    PAUSE = 1,
    WIN = 2,
    LOST = 3,
}

// 计时器组件 （挂在GameController游戏对像下）
// 职责，游戏计时器，当此计时器为0时，当前游戏结束。
class Timer extends MonoBehaviour{

    public static timer: Timer;

    //thay doi game time => thay doi timerbarprocess
    // 本局游戏剩余时间
    public GameTime: number = 270;

    // 剩余游戏时间条
    public Timebar: eui.Image;
    public timebarTexture: egret.Texture;

    // 计时器更新组件
    public update: TimerUpdate;

    public NoSelect: GameObject;

    public PauseUI: GameObject;

    public WinUI: GameObject;

    public LoseUI: GameObject;

    public Nomove: GameObject;

    private _time: number;

    private static ClassicBaseScore: number = 5000;

    private ClassicTargetScore: number;

    public ScoreStack: number = 0;

    private startplus: boolean;

    public isAds: boolean;

    public isreq: boolean;

    private m_pIsUpdate: boolean = false;   //是否每帧更新

    public constructor() {
		super();
	}

    public static Awake() {
        Timer.timer = new Timer();
    }

    public Start() {
        this._time = this.GameTime;
        this.Timebar.scaleX = 0; //Timebar.fillAmount = 0;
        this.AdsCd();//StartCoroutine
    }

    public TimeTick(b: boolean): void {
        if (b && PLayerInfo.MODE == 1) {
            //开始计时
            this.m_pIsUpdate = true;// this.update.enabled = true;
        }
        else {
            //结束计时
            this.m_pIsUpdate = false;// this.update.enabled = false;
        }

    }

    // 更新游戏进度条
    private timebarprocess(time: number) {
        // //计算时间进度条填充量
        // float fillamount = time / _time;
        // //更新剩余时间条
        // Timebar.fillAmount = fillamount;

        let scale: number = time / this._time;
        this.Timebar.scaleX = scale;
    }

    public ScoreBarProcess(score: number): void {
        this.ScoreStack += score;
        if (!this.startplus) {
            this.startplus = true;
            this.IEScoreBarProcess();//StartCoroutine
        }


    }

    private IEScoreBarProcess(): void {
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
    public Tick(): void {
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
    }

    public Win(): void {
        GameController.action.GameState = GameState.WIN;
        this.NoSelect.visible = false;// NoSelect.SetActive(true);
        this.IEWin();// StartCoroutine(IEWin());
        Debug.Log("WIN");
    }
    public Lost(): void {
        GameController.action.GameState = GameState.LOST;
        this.NoSelect.visible = true;// NoSelect.SetActive(true);
        EffectSpawner.effect.SetScore(PLayerInfo.Info.Score);
        this.DisableAll();// StartCoroutine(DisableAll());
        SoundController.Sound.Lose();
        this.showFullAds();
        Debug.Log("LOSE");
    }
    public Pause(): void {
        SoundController.Sound.Click();
        if (GameController.action.GameState == GameState.PLAYING) {
            GameController.action.GameState = GameState.PAUSE;
            this.NoSelect.visible = true;// NoSelect.SetActive(true);
            this.PauseUI.visible = true;// PauseUI.SetActive(true);
            Time.timeScale = 0;
        }

    }
    public Resume(): void {
        SoundController.Sound.Click();
        if (GameController.action.GameState == GameState.PAUSE) {
            GameController.action.GameState = GameState.PLAYING;
            Time.timeScale = 1;
            this.NoSelect.visible = false;// NoSelect.SetActive(false);
            this.PauseUI.visible = false;// PauseUI.SetActive(false);
        }
    }
    public Restart(): void {
        if (PLayerInfo.MODE == 1) {
            PLayerInfo.Info.Score = 0;
            ButtonActionController.Click.ArcadeScene(PLayerInfo.MapPlayer);
        }
        else {
            ButtonActionController.Click.ClassicScene(1);
        }
    }
    public Home(): void {
        ButtonActionController.Click.SelectMap(PLayerInfo.MODE);
    }
    public Next(): void {
        ButtonActionController.Click.SelectMap(1);
        if (PLayerInfo.MapPlayer.Level < 297)
            CameraMovement.StarPointMoveIndex = PLayerInfo.MapPlayer.Level;
        else
            CameraMovement.StarPointMoveIndex = -1;
    }

    public Music(button: eui.Button): void {
        ButtonActionController.Click.BMusic(button);
    }
    public Sound(button: eui.Button): void {

    }
    public ClassicLvUp(): void {
        GameController.action.GameState = GameState.WIN;
        this.NoSelect.visible = true;// NoSelect.SetActive(true);
        this.UpLevel();// StartCoroutine(UpLevel());

    }
    private DisableAll(): void   //IEnumerator
    {
        this.DisableJewel(false);
        // yield return new WaitForSeconds(0.75f);
        this.LoseUI.visible = true;// LoseUI.SetActive(true);
    }
    private IEWin(): void    //IEnumerator
    {
        this.DisableJewel(true);
        EffectSpawner.effect.StarWinEffect(GameController.action.JewelStar.position);
        SoundController.Sound.Win();
        // ?? //GameController.action.JewelStar.gameObject.transform.GetChild(0).gameObject.SetActive(false);
        // yield return new WaitForSeconds(1f);
        this.WinUI.visible = true;// WinUI.SetActive(true);
        this.showFullAds();
    }

    private showFullAds(): void {
        if (this.isAds) {
            // GoogleMobileAdsScript.advertise.ShowInterstitial();
            this.isAds = false;
            this.isreq = false;
        }
    }

    private UpLevel(): void  //IEnumerator
    {
        this.DisableJewel(true);
        this.showFullAds();
        // yield return new WaitForSeconds(1f);
        ButtonActionController.Click.ClassicScene(PLayerInfo.MapPlayer.Level + 1);
    }

    public DisableJewel(b: boolean): void {
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                if (!b) {
                    if (JewelSpawner.spawn.JewelGribScript[x][y] != null)
                        JewelSpawner.spawn.JewelGribScript[x][y].JewelDisable();
                }
                else {
                    if (JewelSpawner.spawn.JewelGribScript[x][y] != null && JewelSpawner.spawn.JewelGribScript[x][y] != GameController.action.JewelStar)
                        JewelSpawner.spawn.JewelGribScript[x][y].JewelDisable();
                }
            }
        }
    }

    public AdsCd(): void {
        // while (true)
        // {
        //     yield return new WaitForSeconds(119f);
        //     isAds = true;
        // }
        this.isAds = true;
    }


}