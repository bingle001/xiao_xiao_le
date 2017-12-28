var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 帧动画显示容器
 */
var AnimationSprite = (function (_super) {
    __extends(AnimationSprite, _super);
    function AnimationSprite() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        return _this;
    }
    Object.defineProperty(AnimationSprite.prototype, "scale", {
        get: function () {
            return this.scaleX;
        },
        set: function (scale) {
            this.scaleX = scale;
            this.scaleY = scale;
        },
        enumerable: true,
        configurable: true
    });
    AnimationSprite.prototype.setCenterTexture = function (texture) {
        if (!texture)
            return;
        var anchor = this.anchorOffsetX;
        if (anchor != texture.textureWidth / 2) {
            this.anchorOffsetY = texture.textureHeight / 2;
            this.anchorOffsetX = texture.textureWidth / 2;
        }
        this.texture = texture;
    };
    AnimationSprite.prototype.setFootTexture = function (texture) {
        if (!texture)
            return;
        var anchor = this.anchorOffsetX;
        if (anchor != texture.textureWidth / 2) {
            this.anchorOffsetY = texture.textureHeight;
            this.anchorOffsetX = texture.textureWidth / 2;
        }
        this.texture = texture;
    };
    return AnimationSprite;
}(egret.Bitmap));
__reflect(AnimationSprite.prototype, "AnimationSprite");
/**
 * 动画
 */
var Animation = (function () {
    function Animation() {
    }
    Animation.load = function (eff_type, loader, loaderThis, frameIndex) {
        if (frameIndex === void 0) { frameIndex = 0; }
        var sprite = new AnimationSprite();
        var anim = Animation.loadAni([sprite], eff_type, loader, loaderThis, frameIndex);
        this.m_pAnimMap[sprite.hashCode] = anim;
        sprite.visible = false;
        return sprite;
    };
    Animation.loadAni = function (sprites, eff_type, loader, loaderThis, frameIndex) {
        if (frameIndex === void 0) { frameIndex = 0; }
        var eff_config = AnimationData.loadConfig(eff_type);
        if (!eff_config)
            return;
        var data = this.cheackNpcName(eff_type);
        var anim = new SpriteAnimation(sprites, eff_type, eff_config.fHold, eff_config.fType, frameIndex);
        anim.isRepeat = eff_config.isRepeat;
        var paths = null;
        anim.m_bIsMultiFile = true;
        paths = FrameManager.getLoadCommonFilesUrls(data.newEffType, eff_config.fileNum);
        anim.loadFiles(paths, loader, loaderThis);
        return anim;
    };
    Animation.cheackNpcName = function (eff_type) {
        var arry = eff_type.split("_");
        var data = {};
        var mat = "_(\\d+)_(\\d+)_(\\d+)_";
        var count = arry.length - 1; //得到 _ 的个数
        data.count = count;
        data.newEffType = arry[0] + "_" + arry[1];
        return data;
    };
    Animation.removeActions = function () {
        for (var key in this.m_pAnimMap) {
            var anim = this.m_pAnimMap[key];
            anim.removeAction();
        }
        this.m_pAnimMap = null;
        this.m_pAnimMap = {};
    };
    Animation.removeAction = function (sprite, isClear) {
        if (isClear === void 0) { isClear = true; }
        if (sprite) {
            sprite.eff_config = null;
            var anim = this.m_pAnimMap[sprite.hashCode];
            if (anim) {
                anim.removeAction(isClear);
            }
            anim = null;
            delete this.m_pAnimMap[sprite.hashCode];
            egret.Tween.removeTweens(sprite);
            if (sprite.parent)
                sprite.parent.removeChild(sprite);
            sprite = null;
        }
    };
    Animation.runAction = function (sprite, callback, thisArg, needReset) {
        if (needReset === void 0) { needReset = true; }
        sprite.visible = true;
        var anim = this.m_pAnimMap[sprite.hashCode];
        if (anim && anim.anim) {
            sprite.texture = anim.anim.getFrame();
            var showFunc = function () {
                sprite.visible = false;
                if (callback)
                    callback.call(thisArg);
            };
            anim.runAction(showFunc, this, needReset);
        }
    };
    Animation.stopAction = function (sprite) {
        sprite.visible = true;
        var anim = this.m_pAnimMap[sprite.hashCode];
        if (anim) {
            anim.stopAction();
        }
        else {
            egret.Tween.removeTweens(sprite);
            sprite.visible = false;
        }
    };
    Animation.m_pAnimMap = {};
    return Animation;
}());
__reflect(Animation.prototype, "Animation");
//# sourceMappingURL=Animation.js.map