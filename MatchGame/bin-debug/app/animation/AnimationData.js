var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 动画配置
 */
var AnimationData = (function () {
    function AnimationData() {
    }
    AnimationData.initConfig = function () {
        this.m_pEffConfig = {};
        this.m_pEffConfig[AniTypes.Arrow] = this.createCfgItem(16, 1, true);
        this.m_pEffConfig[AniTypes.Bash] = this.createCfgItem(12, 1);
        this.m_pEffConfig[AniTypes.Boom] = this.createCfgItem(10, 1);
        this.m_pEffConfig[AniTypes.Fire] = this.createCfgItem(13, 1);
        this.m_pEffConfig[AniTypes.Ice] = this.createCfgItem(6, 1);
        this.m_pEffConfig[AniTypes.Lock] = this.createCfgItem(6, 1);
        this.m_pEffConfig[AniTypes.Magic] = this.createCfgItem(4, 1, true);
        this.m_pEffConfig[AniTypes.JewelStar] = this.createCfgItem(10, 1, true);
    };
    /**
     * @param frame 帧数
     * @param fileNum   资源文件数量
     * @param isRepeat  是否重复播放
     * @param loadType  加载类型
     * @returns {any}
     */
    AnimationData.createCfgItem = function (frame, fileNum, isRepeat, loadType) {
        if (fileNum === void 0) { fileNum = 1; }
        if (isRepeat === void 0) { isRepeat = false; }
        if (loadType === void 0) { loadType = 0; }
        var item = new AnimationConfig();
        item.frame = frame;
        item.fType = FrameAnimNumType.num;
        item.isRepeat = isRepeat;
        item.fileNum = fileNum;
        item.loadType = loadType;
        return item;
    };
    AnimationData.createRoleCfgItem = function (frame, fileNum, isRepeat) {
        if (fileNum === void 0) { fileNum = 1; }
        if (isRepeat === void 0) { isRepeat = false; }
        return this.createCfgItem(frame, fileNum, isRepeat, 1);
    };
    AnimationData.getConfig = function (eff_type) {
        return this.m_pEffConfig[eff_type];
    };
    AnimationData.npcDefaultConfig = function () {
        return this.m_pEffConfig[0];
    };
    return AnimationData;
}());
__reflect(AnimationData.prototype, "AnimationData");
/** 动画文件配置 */
var AnimationConfig = (function () {
    function AnimationConfig() {
        /** 总帧数 */
        this.frame = 0;
        /** 是否重复播放 */
        this.isRepeat = false;
        /** 资源文件数量 */
        this.fileNum = 1;
        /** 加载类型 */
        this.loadType = 0;
        this.fType = FrameAnimNumType.num;
    }
    return AnimationConfig;
}());
__reflect(AnimationConfig.prototype, "AnimationConfig");
//# sourceMappingURL=AnimationData.js.map