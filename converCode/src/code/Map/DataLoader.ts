// 数据加载类
class DataLoader {
	public constructor() {
	}

	public static Data: DataLoader;                              // instance of  this class

    // 玩家已经通关的数据
	public static MyData: Player[] = [];     // list of Player object

    private  KEY_DATA:string = "DATA";                             // key PlayerPrefs

    private  KEY_FRISTTIME:string = "one";                         // key check first app to play 

	public static enableclick: boolean;

    public KEY_MAPPOS:string = "mappos";

    public map:GameObject;

    private tmp:GameObject;

    public mapParent:GameObject;

	public listmap1:GameObject[];

	public listmap: GameObject[];

	public mappos = []

    /// <summary>
    /// 数据加载进度条
    /// </summary>
	public processbar: eui.Image;

    public fade:GameObject;

	public MapSprite: egret.Sprite[];//Sprite[];

	private hold: boolean;

    private holdobj:GameObject;

	private STARMOVE_TIME: number = 1;                             // time of movement icon select level

    public static Awake()
    {
		DataLoader.Data = new DataLoader();
    }
    public Start()
	{
		//指播放速率, 1正常，2原来的2倍，以此类推
		//Time.timeScale = 1;
		
		this.listmap = [];// new GameObject[297];
        //PlayerPrefs.DeleteKey(KEY_FRISTTIME);
        if (PlayerPrefs.GetInt(this.KEY_FRISTTIME, 0) == 0)
        {
			PlayerPrefs.SetString(this.KEY_DATA, this.datadefautStr);
            PlayerPrefs.SetInt(this.KEY_FRISTTIME, 1);
        }

		this.MapButtonDrawer(); //StartCoroutine(MapButtonDrawer());
    }

    private moveobj(mouseposition):GameObject	//mouseposition Vector3
    {
        // Vector3 wp = Camera.main.ScreenToWorldPoint(mouseposition);
		// Vector2 touchPos = [wp.x, wp.y];
        // if (Physics2D.OverlapPoint(touchPos))
        // {
        //     GameObject tmp = Physics2D.OverlapPoint(touchPos).gameObject;
        //     if (tmp != null && tmp.tag == "map")
        //     {
        //         return tmp;
        //     }
        // }
		//TODO 应该是检测当前移动哪个物品

        return null;
    }

    // Draw buttons level on scene
    private MapButtonDrawer() {
        DataLoader.enableclick = false;
        this.MapPosD();
		this.processbar.scaleX = 0.3;// processbar.fillAmount = 0.3f;       //更新进度条

        Debug.Log("1");
        let pu:PlayerUtils = new PlayerUtils();

        DataLoader.MyData = pu.Load();                 //加载玩家已经通关的数据
		this.processbar.scaleX = 0.5;// processbar.fillAmount = 0.5f;       //更新进度条
        Debug.Log("2");

        for (let i = 0; i < 99; i++)
        {
            //更新进度条
			// processbar.fillAmount += 0.0016835016835017f * 3;
            // //一次初始化3个Map 游戏对象
            // this.insmap(this.mappos[i], i);
            // this.insmap(this.mappos[i + 99], i + 99);
            // this.insmap(this.mappos[i + 198], i + 198);

            //下一帧在执行.(分帧执行,这样才会产生更新进度度的动画,不像神曲有些加载的时候显示的时直接卡死，因为没有分帧执行)
            // yield return null;
			//TODO 分帧执行

			//这里暂时全部一起初始化掉
            this.insmap(this.mappos[i], i);
            this.insmap(this.mappos[i + 99], i + 99);
            this.insmap(this.mappos[i + 198], i + 198);
		}
		this.processbar.scaleX += 0.0016835016835017 * 3 * 99;
        Debug.Log("3");

        //设置进度条消失
        // processbar.transform.parent.gameObject.SetActive(false);
		this.processbar.visible = false;
        DataLoader.enableclick = true;

        //如果不是首次加载并且不是最后一关的话，就展示下一个点的位置。
        if (CameraMovement.StarPointMoveIndex != -1 && CameraMovement.StarPointMoveIndex != 297)
        {
            this.StarPointMove();
            // yield return new WaitForSeconds(this.STARMOVE_TIME);

			//TODO 
            CameraMovement.mcamera.PopUpShow(DataLoader.MyData[CameraMovement.StarPointMoveIndex]);
            PlayerPrefs.SetFloat("LASTPOS", this.listmap[CameraMovement.StarPointMoveIndex].y);
            PlayerPrefs.SetFloat("LASTPOSX", this.listmap[CameraMovement.StarPointMoveIndex].x);
        }
        else
        {
            //如果是首次展示则直接播放StartPoint
            // fade.GetComponent<CanvasGroup>().blocksRaycasts = false;
            // CameraMovement.mcamera.StarPoint.transform.GetChild(0).GetComponent<Animation>().Play("StarPoint");
			//TODO
        }
    }

	private StringToVector3(s: string): any
	{
		debug("StringToVector3");
		let p: string[] = s.split(',');
		let vt = new Vector3(Number(p[0]), Number(p[1]));
        return vt;
    }

    // 初始化Map游戏对象
	private insmap(pos: Vector3, index: number): void
    {
        // tmp = (GameObject)Instantiate(map);
        // tmp.transform.position = new Vector3(pos.x, pos.y);
        // tmp.transform.SetParent(mapParent.transform, false);
        // listmap[index] = tmp;
        // tmp.transform.GetChild(1).GetComponent<TextMesh>().text = (index + 1).ToString();
        // tmp.name = (index + 1).ToString();
        // Map m = tmp.GetComponent<Map>();
        // m.map = MyData[index];
        // m.SetMapInfo();

		let tmp = new GameObject();
		tmp.x = pos.x;
		tmp.y = pos.y;
		this.mapParent.addChild(tmp);
		this.listmap[index] = tmp;
		//TODO 初始化地图据点，应该有个显示对象
    }

    // 显示当前玩家进度点
    private StarPointMove():void
    {
        DataLoader.enableclick = false;
        // Vector3 newpos = listmap[CameraMovement.StarPointMoveIndex].transform.position + new Vector3(0, 0, -0.3];
		let oldX: number = this.listmap[CameraMovement.StarPointMoveIndex].x;
		let oldY: number = this.listmap[CameraMovement.StarPointMoveIndex].y;
		let oldZ: number = this.listmap[CameraMovement.StarPointMoveIndex].z;
		let newpos: Vector3 = new Vector3(oldX, oldY, oldZ - 0.3);
        Ulti.MoveTo(CameraMovement.mcamera.StarPoint, newpos, this.STARMOVE_TIME, newpos.z);
		TimerUtils.setTimeOut(this.STARMOVE_TIME, this.stopanimation, this);// StartCoroutine(stopanimation());
    }

    // 播放StartPoint动画
	private stopanimation(): void{
		//TODO DataLoader.stopanimation();
        // CameraMovement.mcamera.StarPoint.transform.GetChild(0).transform.localPosition = new Vector3(0, 0.619,0);
        // CameraMovement.mcamera.StarPoint.transform.GetChild(0).GetComponent<Animation>().Play("StarPoint");
    }

    //通关情况，保存的数据也是这种格式
    private datadefautStr:string = "False,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,1,True,0,0,1,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,3,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,1,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,0,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,True,0,0,2,";


    // 初始化地图点
    private MapPosD():void {
		let mappos = [];

        mappos[0] = [-0.004228723,-3.587];
        mappos[1] = [0.695,-3.232];
        mappos[2] = [-0.09021276,-3.03];
        mappos[3] = [-0.925,-2.859967];
        mappos[4] = [-0.188883,-2.489];
        mappos[5] = [0.6173936,-2.367];
        mappos[6] = [1.342,-2];
        mappos[7] = [0.5240414,-1.590361];
        mappos[8] = [-0.2140727,-1.613735];
        mappos[9] = [-1.06,-1.636];
        mappos[10] = [-1.579,-1.265327];
        mappos[11] = [-1.274,-0.7695142];
        mappos[12] = [-0.8071734,0.4705882];
        mappos[13] = [-0.9679077,1];
        mappos[14] = [-1.731092,1.497479];
        mappos[15] = [-0.9021276,1.77];
        mappos[16] = [-0.05638298,1.736];
        mappos[17] = [0.7893617,1.752];
        mappos[18] = [1.557,1.98];
        mappos[19] = [1.307,2.653];
        mappos[20] = [0.439,2.86];
        mappos[21] = [-0.271578,2.98];
        mappos[22] = [-0.9669681,3.106];
        mappos[23] = [-1.39,3.66];
        mappos[24] = [-0.8239896,4.221];
        mappos[25] = [-1,4.758];
        mappos[26] = [-1.562,5.279];
        mappos[27] = [-0.996,5.581];
        mappos[28] = [-0.2349291,5.59];
        mappos[29] = [0.4792553,5.6];
        mappos[30] = [1.184042,5.72];
        mappos[31] = [1.631163,6.270145];
        mappos[32] = [1.090071,6.87];
        mappos[33] = [0.3523936,7.128];
        mappos[34] = [-0.3636702,7.196];
        mappos[35] = [-1.067,7.494];
        mappos[36] = [-0.963,8.204];
        mappos[37] = [-0.601,8.72];
        mappos[38] = [0.017,9.103];
        mappos[39] = [0.5887378,9.264387];
        mappos[40] = [1.207,9.45];
        mappos[41] = [1.583,9.921];
        mappos[42] = [0.9122202,10.28887];
        mappos[43] = [0.3170127,10.39903];
        mappos[44] = [-0.3274053,10.45336];
        mappos[45] = [-0.9444384,10.69456];
        mappos[46] = [-1.259,11.225];
        mappos[47] = [-1.013,11.708];
        mappos[48] = [-0.62,12.499];
        mappos[49] = [-0.173,12.927];
        mappos[50] = [0.2264377,13.25734];
        mappos[51] = [0.6922522,13.51896];
        mappos[52] = [1.184,13.786];
        mappos[53] = [1.528,14.277];
        mappos[54] = [1.381,14.842];
        mappos[55] = [0.818,15.127];
        mappos[56] = [0.2264377,15.20605];
        mappos[57] = [-0.329952,15.26113];
        mappos[58] = [-0.9251596,15.40536];
        mappos[59] = [-1.41,15.694];
        mappos[60] = [-1.674,16.34];
        mappos[61] = [-1.663,16.935];
        mappos[62] = [-1.254,17.392];
        mappos[63] = [-0.615,17.391];
        mappos[64] = [0.03234824,17.3409];
        mappos[65] = [0.7051916,17.40975];
        mappos[66] = [1.337,17.79];
        mappos[67] = [1.428,18.401];
        mappos[68] = [1.139,18.952];
        mappos[69] = [0.698,19.339];
        mappos[70] = [0.218,19.65];
        mappos[71] = [-0.3040734,19.95054];
        mappos[72] = [-0.595,20.795];
        mappos[73] = [-1.171,21.165];
        mappos[74] = [-1.759,21.565];
        mappos[75] = [-0.848,21.87];
        mappos[76] = [-0.1488019,21.88109];
        mappos[77] = [0.6146165,21.9224];
        mappos[78] = [1.257,22.087];
        mappos[79] = [1.636,22.677];
        mappos[80] = [1.002796,23.1341];
        mappos[81] = [0.2911341,23.24426];
        mappos[82] = [-0.4205271,23.28556];
        mappos[83] = [-1.067491,23.36818];
        mappos[84] = [-1.568,23.924];
        mappos[85] = [-0.769888,24.30333];
        mappos[86] = [0.006469648,24.34464];
        mappos[87] = [0.848,24.354];
        mappos[88] = [1.634,24.472];
        mappos[89] = [2.097,25.069];
        mappos[90] = [1.583,25.679];
        mappos[91] = [0.796,25.85];
        mappos[92] = [-0.05822683,25.80419];
        mappos[93] = [-0.8345845,25.68026];
        mappos[94] = [-1.657,25.697];
        mappos[95] = [-1.737,26.462];
        mappos[96] = [-1.155,27.123];
        mappos[97] = [-0.213,27.34];
        mappos[98] = [0.429,27.742];
        mappos[99] = [0.892,28.338];
        mappos[100] = [0.986,29.143];
        mappos[101] = [0.455,29.713];
        mappos[102] = [-0.1876198,30.10146];
        mappos[103] = [-0.8863418,30.37684];
        mappos[104] = [-1.542,30.722];
        mappos[105] = [-1.79,31.43];
        mappos[106] = [-1.293,31.832];
        mappos[107] = [-0.537,31.743];
        mappos[108] = [0.493,31.705];
        mappos[109] = [1.339217,31.8842];
        mappos[110] = [2.045,32.401];
        mappos[111] = [1.5,33.043];
        mappos[112] = [0.7569487,33.12344];
        mappos[113] = [-0.03234824,33.09591];
        mappos[114] = [-0.7569487,33.09591];
        mappos[115] = [-1.442731,33.26114];
        mappos[116] = [-1.326278,34.01845];
        mappos[117] = [-0.5887378,34.21122];
        mappos[118] = [0.09704469,34.23876];
        mappos[119] = [0.8216451,34.32138];
        mappos[120] = [1.563,34.803];
        mappos[121] = [1.054552,35.4792];
        mappos[122] = [0.2523163,35.56182];
        mappos[123] = [-0.55,35.563];
        mappos[124] = [-1.371,35.665];
        mappos[125] = [-1.954,36.421];
        mappos[126] = [-1.927,37.132];
        mappos[127] = [-1.365096,37.64099];
        mappos[128] = [-0.5757986,37.66853];
        mappos[129] = [0.2264377,37.29676];
        mappos[130] = [1.05,37.046];
        mappos[131] = [1.589,37.553];
        mappos[132] = [1.451,38.275];
        mappos[133] = [0.705,38.834];
        mappos[134] = [0.03234824,39.11264];
        mappos[135] = [-0.375,39.774];
        mappos[136] = [0.2134984,40.287];
        mappos[137] = [0.95,40.561];
        mappos[138] = [1.352,41.178];
        mappos[139] = [0.7957666,41.69];
        mappos[140] = [-0.07116612,41.865];
        mappos[141] = [-0.8345845,42.07];
        mappos[142] = [-1.391,42.64414];
        mappos[143] = [-0.8475238,43.2008];
        mappos[144] = [0.05822683,43.40195];
        mappos[145] = [0.874,43.678];
        mappos[146] = [1.15,44.36];
        mappos[147] = [0.54992,44.88013];
        mappos[148] = [-0.2134984,44.918];
        mappos[149] = [-0.9251596,45.02];
        mappos[150] = [-1.631,45.40336];
        mappos[151] = [-1.69,46.1];
        mappos[152] = [-1.132188,46.68477];
        mappos[153] = [-0.4205271,46.89131];
        mappos[154] = [0.2781948,47.08408];
        mappos[155] = [0.982,47.572];
        mappos[156] = [1.212,48.299];
        mappos[157] = [0.7828273,48.911];
        mappos[158] = [0.109984,49.03011];
        mappos[159] = [-0.6275558,49.04388];
        mappos[160] = [-1.379,49.142];
        mappos[161] = [-1.592,49.856];
        mappos[162] = [-0.8863418,50.31066];
        mappos[163] = [-0.1876198,50.442];
        mappos[164] = [0.6146165,50.44];
        mappos[165] = [1.264,50.744];
        mappos[166] = [0.866,51.208];
        mappos[167] = [0.2393769,51.482];
        mappos[168] = [-0.382,52.011];
        mappos[169] = [0.1229233,52.654];
        mappos[170] = [0.848,52.865];
        mappos[171] = [1.449,53.399];
        mappos[172] = [0.9122202,53.93117];
        mappos[173] = [0.1746805,54.11017];
        mappos[174] = [-0.6016772,54.31671];
        mappos[175] = [-1.346,54.684];
        mappos[176] = [-1.632,55.268];
        mappos[177] = [-0.731,55.509];
        mappos[178] = [0.05822683,55.50087];
        mappos[179] = [0.860463,55.45956];
        mappos[180] = [1.39,56.074];
        mappos[181] = [0.8345845,56.79091];
        mappos[182] = [0.1229233,57.0663];
        mappos[183] = [-0.6016772,57.159];
        mappos[184] = [-1.291,57.354];
        mappos[185] = [-1.478,57.954];
        mappos[186] = [-1.041613,58.51208];
        mappos[187] = [-0.3428913,58.7737];
        mappos[188] = [0.4334664,58.7737];
        mappos[189] = [1.095,58.771];
        mappos[190] = [1.654,59.268];
        mappos[191] = [1.698,60.006];
        mappos[192] = [0.2523163,61.01823];
        mappos[193] = [-0.4981629,61.01926];
        mappos[194] = [-1.18,61.044];
        mappos[195] = [-1.764,61.535];
        mappos[196] = [-1.27452,61.99689];
        mappos[197] = [-0.64,62.125];
        mappos[198] = [0.07116612,62.09327];
        mappos[199] = [0.8216451,62.07951];
        mappos[200] = [1.577,62.14];
        mappos[201] = [1.507428,62.802];
        mappos[202] = [0.860463,63.042];
        mappos[203] = [0.1876198,63.20859];
        mappos[204] = [-0.554,63.559];
        mappos[205] = [-0.679313,64.07061];
        mappos[206] = [-0.006469648,64.26888];
        mappos[207] = [0.679313,64.3515];
        mappos[208] = [1.331,64.598];
        mappos[209] = [1.733,65.177];
        mappos[210] = [1.416,65.765];
        mappos[211] = [0.7957666,66.01759];
        mappos[212] = [0.1617411,66.18282];
        mappos[213] = [-0.4852235,66.34806];
        mappos[214] = [-1.118,66.678];
        mappos[215] = [-1.479,67.221];
        mappos[216] = [-1.387,67.987];
        mappos[217] = [-1.241,68.757];
        mappos[218] = [-0.8345845,69.316];
        mappos[219] = [-0.1617411,69.34177];
        mappos[220] = [0.4722843,69.35554];
        mappos[221] = [1.09337,69.45193];
        mappos[222] = [1.652,69.92];
        mappos[223] = [1.46861,70.59];
        mappos[224] = [0.8345845,70.81509];
        mappos[225] = [0.1488019,70.98032];
        mappos[226] = [-0.534,71.172];
        mappos[227] = [-1.156,71.48979];
        mappos[228] = [-1.551,72.155];
        mappos[229] = [-1.028674,72.745];
        mappos[230] = [-0.2781948,72.78366];
        mappos[231] = [0.4464056,72.639];
        mappos[232] = [1.113,72.598];
        mappos[233] = [1.525,73.121];
        mappos[234] = [1.506,73.837];
        mappos[235] = [1.011,74.29829];
        mappos[236] = [0.3946485,74.577];
        mappos[237] = [-0.2264377,74.80776];
        mappos[238] = [-0.861,75.08315];
        mappos[239] = [-1.428,75.544];
        mappos[240] = [-1.464,76.365];
        mappos[241] = [-0.7569487,76.68608];
        mappos[242] = [-0.07116612,76.72739];
        mappos[243] = [0.6404951,76.762];
        mappos[244] = [1.371,76.925];
        mappos[245] = [1.544,77.566];
        mappos[246] = [0.951038,78.024];
        mappos[247] = [0.2781948,78.231];
        mappos[248] = [-0.446,78.376];
        mappos[249] = [-1.101,78.629];
        mappos[250] = [-1.63,79.149];
        mappos[251] = [-1.609,79.814];
        mappos[252] = [-1.025,80.375];
        mappos[253] = [-0.2393769,80.52411];
        mappos[254] = [0.3817092,80.60673];
        mappos[255] = [0.936,80.96473];
        mappos[256] = [1.248642,81.57059];
        mappos[257] = [1.171006,82.25905];
        mappos[258] = [0.5369807,82.43806];
        mappos[259] = [-0.1358626,82.43806];
        mappos[260] = [-0.7569487,82.45182];
        mappos[261] = [-1.329,82.676];
        mappos[262] = [-1.651,83.315];
        mappos[263] = [-1.723,83.929];
        mappos[264] = [-1.331,84.601];
        mappos[265] = [-0.7181308,84.98347];
        mappos[266] = [-0.07116612,84.88708];
        mappos[267] = [0.6146165,84.74938];
        mappos[268] = [1.261581,84.74938];
        mappos[269] = [1.38,85.375];
        mappos[270] = [0.941,85.829];
        mappos[271] = [0.2781948,86.16763];
        mappos[272] = [-0.4075879,86.27779];
        mappos[273] = [-1.052,86.4];
        mappos[274] = [-1.624,86.823];
        mappos[275] = [-1.746,87.543];
        mappos[276] = [-1.217,87.962];
        mappos[277] = [-0.413,87.571];
        mappos[278] = [0.3170127,87.69275];
        mappos[279] = [0.8087059,88.20222];
        mappos[280] = [1.653,88.344];
        mappos[281] = [1.891,88.914];
        mappos[282] = [1.64976,89.57915];
        mappos[283] = [1.080431,89.84077];
        mappos[284] = [0.3946485,89.68931];
        mappos[285] = [-0.200559,89.40015];
        mappos[286] = [-0.8216451,89.20738];
        mappos[287] = [-1.503,89.506];
        mappos[288] = [-1.736,90.223];
        mappos[289] = [-1.506,91.0685];
        mappos[290] = [-0.7440094,91.38519];
        mappos[291] = [0.122,91.242];
        mappos[292] = [0.93,91.686];
        mappos[293] = [1.492,92.37659];
        mappos[294] = [0.769888,92.56936];
        mappos[295] = [-0.03234824,92.5969];
		mappos[296] = [-0.956, 92.74];
		
		this.mappos = mappos;
    }


}