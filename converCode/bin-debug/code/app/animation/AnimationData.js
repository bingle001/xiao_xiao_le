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
        this.m_pEffConfig[AniTypes.Bash] = this.createCfgItem(12, 1, true);
        this.m_pEffConfig[AniTypes.Boom] = this.createCfgItem(10, 1, true);
        this.m_pEffConfig[AniTypes.Fire] = this.createCfgItem(13, 1, true);
        this.m_pEffConfig[AniTypes.Ice] = this.createCfgItem(6, 1, true);
        this.m_pEffConfig[AniTypes.Lock] = this.createCfgItem(6, 1, true);
        this.m_pEffConfig[AniTypes.Magic] = this.createCfgItem(4, 1, true);
        this.m_pEffConfig[AniTypes.JewelStar] = this.createCfgItem(10, 1, true);
    };
    /**
     * @param fHao  播放速度 值越大越慢
     * @param fileNum   资源文件数量
     * @param isRepeat  是否重复播放
     * @param loadType  加载类型
     * @returns {any}
     */
    AnimationData.createCfgItem = function (fHao, fileNum, isRepeat, loadType) {
        if (fHao === void 0) { fHao = 3; }
        if (fileNum === void 0) { fileNum = 1; }
        if (isRepeat === void 0) { isRepeat = false; }
        if (loadType === void 0) { loadType = 0; }
        var item = new AnimationConfig();
        item.fHold = fHao;
        item.fType = FrameAnimNumType.num;
        item.isRepeat = isRepeat;
        item.fileNum = fileNum;
        item.loadType = loadType;
        return item;
    };
    AnimationData.createRoleCfgItem = function (fHao, fileNum, isRepeat) {
        if (fHao === void 0) { fHao = 3; }
        if (fileNum === void 0) { fileNum = 1; }
        if (isRepeat === void 0) { isRepeat = false; }
        return this.createCfgItem(fHao, fileNum, isRepeat, 1);
    };
    AnimationData.loadConfig = function (eff_type) {
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
        /** 播放速度 值越大越慢 */
        this.fHold = 3;
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