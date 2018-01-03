// 玩家信息 显示对象脚本
class PlayerInfo {
	public constructor() {
	}

    public static Info: PlayerInfo;      // infomations of player
    
    public static MapPlayer:Player;     // player object
    public static MODE:number = 1;            // mode : Arcade or Classic 
    public static BACKGROUND:number = 0;       // background of mode

	public static KEY_CLASSIC_HISCORE: string = "classichightscore";
    public Score:number;

	public static Awake(): void{
        PlayerInfo.Info = new PlayerInfo();
    }

    public Start(): void {
        this.Score = 0;
        EffectSpawner.effect.SetLevel(PlayerInfo.MapPlayer.Level);
        EffectSpawner.effect.SetBest(PlayerInfo.MapPlayer.HightScore);
        EffectSpawner.effect.SetScore(this.Score);

        // this.textlv.text = PlayerInfo.MapPlayer.Level.toString();
	}
	

}