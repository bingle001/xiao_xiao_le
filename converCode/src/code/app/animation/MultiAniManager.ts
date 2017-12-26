class MultiAniManager {
    private static m_pAnis = {};
    private static isStartPlay = true;

    public static getAni(ietype: string, sprites = [], ani_type: string, isPlay = true, isReset = true) {
        this.isStartPlay = isPlay;
        let ani_map = this.m_pAnis[ani_type];
        if (!ani_map) {
            ani_map = {};
            this.m_pAnis[ani_type] = ani_map;
        }

        let ani = ani_map[ietype];
        if (!ani) {
            ani = Animation.loadAni(sprites, ietype, this.loadAni, this);
            ani_map[ietype] = ani;
        } else {
            if (isReset) ani.sprites = sprites;
        }
        ani.setFrames();
        return ani;
    }

    public static getCommonAni(ietype: string, sprites = []) {
        return this.getAni(ietype, sprites, "common");
    }

    public static getMapBuildingAni(ietype: string, sprites = []) {
        return this.getAni(ietype, sprites, "building");
    }

    public static removeSprite(ani_type: string, ietype: string, imgSprite: egret.Bitmap) {
        let ani_map = this.m_pAnis[ani_type];
        if (!ani_map) return;
        let ani = <SpriteAnimation>ani_map[ietype];
        ani && ani.removeOneImageSprite(imgSprite);
    }

    public static pushSprite(ani_type: string, ietype: string, imgSprite) {
        let ani = this.getAni(ietype, [], ani_type, true, false);
        ani && ani.sprites.push(imgSprite);
    }


    public static clearAni(ani_type: string) {
        let ani_maps = this.m_pAnis[ani_type];
        if (!ani_maps) return;
        for (let key in ani_maps) {
            var ani = ani_maps[key];
            ani.sprites = [];
        }
    }

    public static removeAllAni() {
        for (var key in this.m_pAnis) {
            let ani_maps = this.m_pAnis[key];
            for (let key in ani_maps) {
                var ani = ani_maps[key];
                ani.removeAction();
                FrameManager.removeFrames(key);
            }
        }
        this.m_pAnis = {};
    }

    private static loadAni(textureMap, ietype, ani) {
        if (ani && this.isStartPlay) ani.runAction();
    }
}