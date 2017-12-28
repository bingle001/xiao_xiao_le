//镜头移动？？
class CameraMovement extends egret.DisplayObjectContainer{
    public constructor() {
        super();
	}

	public static mcamera: CameraMovement;       // camera movement

    public static StarPointMoveIndex:number;       // position index

	public container: egret.DisplayObjectContainer;//RectTransform;             // container of scroll view

    /// <summary>
    /// PopUp 游戏对象 来自Canvas下的 PopUp,游戏弹出面板对象
    /// 注意这个PopUp是挂在Canvas下的也就是镜头无论如何移动，Canvas面板下的东西则不需要移动。
    /// </summary>
	public PopUp:GameObject;                    // popup show when click to item button level

    /// <summary>
    /// StartPoint 游戏对象 来自Screen下的StartPoint
    /// </summary>
	public StarPoint:GameObject;                // position start

    /// <summary>
    /// 星星Sprite状态数组 
    /// </summary>
    public star:egret.Sprite//Sprite;                       // arrays star of item level

    /// <summary>
    /// 切换场景时的渐变动画
    /// </summary>
    public fade:GameObject;                     // fade animation

    private distance: number = 90.8 / 8680;

    public static movement:boolean;

    public static setstate:boolean;

    public isPopup:boolean;


    private map:Player;


    public static Awake()
    {
        // mcamera = this;
        CameraMovement.mcamera = new CameraMovement();
    }

    public Start(): void {
        this.setLastpos();
        this.SetPoint();
        // GoogleMobileAdsScript.advertise.HideBanner();
    }

    public Update(): void {
        // if (Input.GetKeyDown(KeyCode.Escape) && isPopup)
        // {
        //     UnfreezeMap();
        // }
        // else if (Input.GetKeyDown(KeyCode.Escape))
        // {
        //     ButtonActionController.Click.HomeScene();
        // }
    }

    // set last position of container
    private setLastpos():void {
        let lastp = PlayerPrefs.GetFloat("LASTPOS", 0);
        if (lastp < 0) lastp = 0;
        else if (lastp > 90.8000) lastp = 90.8;
        // transform.position += new Vector3(0, lastp);
        // container.anchoredPosition = new Vector2(container.anchoredPosition.x, -lastp / distance + 4740f);
        //TODO
        this.x = 0;
        this.y = lastp;
        // this.anchorOffsetX = 0;
        // this.anchorOffsetY = -lastp / distance + 4740f
    }

    private SetPoint():void{
        let x = PlayerPrefs.GetFloat("LASTPOSX", -0.0045);
        let y = PlayerPrefs.GetFloat("LASTPOS", -3.587);
        // StarPoint.transform.position = new Vector3(x, y, StarPoint.transform.position.z);
        this.StarPoint.x = x;
        this.StarPoint.y = y;
    }

    // Update positio camera when scroller
    public CameraPosUpdate():void
    {
        // transform.position = new Vector3(transform.position.x, -(container.anchoredPosition.y - 4740f) * distance, transform.position.z);
        // if (setstate)
        //     movement = true;
    }


    // show infomation of level player
    public PopUpShow(_map: Player): void {
        this.isPopup = true;
        CameraMovement.mcamera.FreezeMap();
        this.map = _map;

        let stars: eui.Image[] = [];// new Image[3];

        //TODO 星星素材
        //直接访问PopUp中的三个星星组件
        // stars[0] = PopUp.transform.GetChild(1).GetComponent<Image>();
        // stars[1] = PopUp.transform.GetChild(2).GetComponent<Image>();
        // stars[2] = PopUp.transform.GetChild(3).GetComponent<Image>();

        //设置星星状态
        // for (let i = 0; i < 3; i++)
        // {
        //     if (i < _map.Stars)
        //         stars[i].sprite = star[0];
        //     else
        //         stars[i].sprite = star[1];
        // }


        // PopUp.transform.GetChild(4).GetComponent<Text>().text = _map.HightScore.ToString();
        // PopUp.transform.GetChild(6).GetComponent<Text>().text = _map.Level.ToString("00");
        // Animation am = PopUp.GetComponent<Animation>();
        // am.enabled = true;
        // PopUp.SetActive(true);
    }

    public ArcadeScene():void
    {
        ButtonActionController.Click.ArcadeScene(this.map);
    }

    public FreezeMap():void
    {
        // DataLoader.enableclick = false;
        // fade.GetComponent<CanvasGroup>().blocksRaycasts = true;
        //TODO
    }

    public UnfreezeMap():void
    {
        //TODO
        SoundController.Sound.Click();
        // this.PopUp.SetActive(false);
        this.isPopup = false;
        // DataLoader.enableclick = true;
        // fade.GetComponent<CanvasGroup>().blocksRaycasts = false;

    }


}