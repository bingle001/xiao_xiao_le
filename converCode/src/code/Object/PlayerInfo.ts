// 玩家信息 显示对象脚本
class PLayerInfo {
	public constructor() {
	}

	public static Info:PLayerInfo;      // infomations of player

    public static MapPlayer:Player;     // player object

    public static MODE:number;            // mode : Arcade or Classic 

    public static BACKGROUND:number;       // background of mode

    public Score:number;

	public KEY_CLASSIC_HISCORE: string = "classichightscore";

	public textlv: eui.BitmapLabel;

	public static Awake(): void{
		PLayerInfo.Info = new PLayerInfo()
        PLayerInfo.BACKGROUND = PLayerInfo.MapPlayer.Background;
    }

    public Start():void{
        this.Score = 0;
        EffectSpawner.effect.SetLevel(this.MapPlayer.Level);
        EffectSpawner.effect.SetBest(this.MapPlayer.HightScore);
        EffectSpawner.effect.SetScore(this.Score);
        this.textlv.text = PLayerInfo.MapPlayer.Level.ToString();
	}
	

}