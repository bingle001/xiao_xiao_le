/**
 * 动画配置
 */
class AnimationData {

	private static m_pEffConfig;

	public static initConfig() {
		this.m_pEffConfig = {};

		this.m_pEffConfig[AniTypes.Arrow] = this.createCfgItem(16, 1, true);
		this.m_pEffConfig[AniTypes.Bash] = this.createCfgItem(12, 1, true);
		this.m_pEffConfig[AniTypes.Boom] = this.createCfgItem(10, 1, true);
		this.m_pEffConfig[AniTypes.Fire] = this.createCfgItem(13, 1, true);
		this.m_pEffConfig[AniTypes.Ice] = this.createCfgItem(6, 1, true);
		this.m_pEffConfig[AniTypes.Lock] = this.createCfgItem(6, 1, true);
		this.m_pEffConfig[AniTypes.Magic] = this.createCfgItem(4, 1, true);
		this.m_pEffConfig[AniTypes.JewelStar] = this.createCfgItem(10, 1, true);
		
	}

	/**
     * @param fHao  播放速度 值越大越慢
     * @param fileNum   资源文件数量
     * @param isRepeat  是否重复播放
     * @param loadType  加载类型
     * @returns {any}
     */
	public static createCfgItem(fHao = 3, fileNum = 1, isRepeat = false, loadType = 0): AnimationConfig {
		var item: AnimationConfig = new AnimationConfig();
        item.fHold = fHao;
        item.fType = FrameAnimNumType.num;
        item.isRepeat = isRepeat;
        item.fileNum = fileNum;
        item.loadType = loadType;
        return item;
    }

    public static createRoleCfgItem(fHao = 3, fileNum = 1, isRepeat = false) {
        return this.createCfgItem(fHao, fileNum, isRepeat, 1);
    }

    public static loadConfig(eff_type) {
        return this.m_pEffConfig[eff_type];
    }

    public static npcDefaultConfig(){
        return this.m_pEffConfig[0];
    }
}

/** 动画文件配置 */
class AnimationConfig{
	/** 播放速度 值越大越慢 */
	public fHold:number = 3;
	/** 是否重复播放 */
	public isRepeat: boolean = false;
	/** 资源文件数量 */
	public fileNum: number = 1;
	/** 加载类型 */
	public loadType: number = 0;

	public fType = FrameAnimNumType.num;
}