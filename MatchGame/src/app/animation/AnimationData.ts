/**
 * 动画配置
 */
class AnimationData {

	private static m_pEffConfig;

	public static initConfig() {
		this.m_pEffConfig = {};

		this.m_pEffConfig[AniTypes.Arrow] = this.createCfgItem(16, 1, true);
		this.m_pEffConfig[AniTypes.Bash] = this.createCfgItem(12, 1);
		this.m_pEffConfig[AniTypes.Boom] = this.createCfgItem(10, 1);
		this.m_pEffConfig[AniTypes.Fire] = this.createCfgItem(13, 1)
		this.m_pEffConfig[AniTypes.Ice] = this.createCfgItem(6, 1);
		this.m_pEffConfig[AniTypes.Lock] = this.createCfgItem(6, 1);
		this.m_pEffConfig[AniTypes.Magic] = this.createCfgItem(4, 1, true);
		this.m_pEffConfig[AniTypes.JewelStar] = this.createCfgItem(10, 1, true);
		
	}

	/**
     * @param frame 帧数
     * @param fileNum   资源文件数量
     * @param isRepeat  是否重复播放
     * @param loadType  加载类型
     * @returns {any}
     */
	public static createCfgItem(frame, fileNum = 1, isRepeat = false, loadType = 0): AnimationConfig {
		var item: AnimationConfig = new AnimationConfig();
        item.frame = frame;
        item.fType = FrameAnimNumType.num;
        item.isRepeat = isRepeat;
        item.fileNum = fileNum;
        item.loadType = loadType;
        return item;
    }

    public static createRoleCfgItem(frame, fileNum = 1, isRepeat = false) {
        return this.createCfgItem(frame, fileNum, isRepeat, 1);
    }

    public static getConfig(eff_type) {
        return this.m_pEffConfig[eff_type];
    }

    public static npcDefaultConfig(){
        return this.m_pEffConfig[0];
    }
}

/** 动画文件配置 */
class AnimationConfig{
	/** 总帧数 */
	public frame:number = 0;
	/** 是否重复播放 */
	public isRepeat: boolean = false;
	/** 资源文件数量 */
	public fileNum: number = 1;
	/** 加载类型 */
	public loadType: number = 0;

	public fType = FrameAnimNumType.num;
}