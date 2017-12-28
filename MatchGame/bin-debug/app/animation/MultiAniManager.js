var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MultiAniManager = (function () {
    function MultiAniManager() {
    }
    MultiAniManager.getAni = function (ietype, sprites, ani_type, isPlay, isReset) {
        if (sprites === void 0) { sprites = []; }
        if (isPlay === void 0) { isPlay = true; }
        if (isReset === void 0) { isReset = true; }
        this.isStartPlay = isPlay;
        var ani_map = this.m_pAnis[ani_type];
        if (!ani_map) {
            ani_map = {};
            this.m_pAnis[ani_type] = ani_map;
        }
        var ani = ani_map[ietype];
        if (!ani) {
            ani = Animation.loadAni(sprites, ietype, this.loadAni, this);
            ani_map[ietype] = ani;
        }
        else {
            if (isReset)
                ani.sprites = sprites;
        }
        ani.setFrames();
        return ani;
    };
    MultiAniManager.getCommonAni = function (ietype, sprites) {
        if (sprites === void 0) { sprites = []; }
        return this.getAni(ietype, sprites, "common");
    };
    MultiAniManager.getMapBuildingAni = function (ietype, sprites) {
        if (sprites === void 0) { sprites = []; }
        return this.getAni(ietype, sprites, "building");
    };
    MultiAniManager.removeSprite = function (ani_type, ietype, imgSprite) {
        var ani_map = this.m_pAnis[ani_type];
        if (!ani_map)
            return;
        var ani = ani_map[ietype];
        ani && ani.removeOneImageSprite(imgSprite);
    };
    MultiAniManager.pushSprite = function (ani_type, ietype, imgSprite) {
        var ani = this.getAni(ietype, [], ani_type, true, false);
        ani && ani.sprites.push(imgSprite);
    };
    MultiAniManager.clearAni = function (ani_type) {
        var ani_maps = this.m_pAnis[ani_type];
        if (!ani_maps)
            return;
        for (var key in ani_maps) {
            var ani = ani_maps[key];
            ani.sprites = [];
        }
    };
    MultiAniManager.removeAllAni = function () {
        for (var key in this.m_pAnis) {
            var ani_maps = this.m_pAnis[key];
            for (var key_1 in ani_maps) {
                var ani = ani_maps[key_1];
                ani.removeAction();
                FrameManager.removeFrames(key_1);
            }
        }
        this.m_pAnis = {};
    };
    MultiAniManager.loadAni = function (textureMap, ietype, ani) {
        if (ani && this.isStartPlay)
            ani.runAction();
    };
    MultiAniManager.m_pAnis = {};
    MultiAniManager.isStartPlay = true;
    return MultiAniManager;
}());
__reflect(MultiAniManager.prototype, "MultiAniManager");
//# sourceMappingURL=MultiAniManager.js.map