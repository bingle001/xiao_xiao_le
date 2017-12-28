/**
 * 帧动画显示容器
 */
class AnimationSprite extends egret.Bitmap {

	public eff_config;
	public EFF_NAME;
	public res_loaded;

	public constructor() {
		super();
		this.touchEnabled = false;
	}

	public set scale(scale) {
		this.scaleX = scale;
		this.scaleY = scale;
	}

	public get scale() {
		return this.scaleX;
	}

	public setCenterTexture(texture: egret.Texture) {
		if (!texture) return;
		let anchor = this.anchorOffsetX;
		if (anchor != texture.textureWidth / 2) {
			this.anchorOffsetY = texture.textureHeight / 2;
			this.anchorOffsetX = texture.textureWidth / 2;
		}
		this.texture = texture;
	}

	public setFootTexture(texture: egret.Texture) {
		if (!texture) return;
		let anchor = this.anchorOffsetX;
		if (anchor != texture.textureWidth / 2) {
			this.anchorOffsetY = texture.textureHeight;
			this.anchorOffsetX = texture.textureWidth / 2;
		}
		this.texture = texture;
	}

}

/**
 * 动画
 */
class Animation {

	private static m_pAnimMap = {};

	public static load(eff_type: string, loader?: Function, loaderThis?: any, frameIndex: number = 0) {
		var sprite = new AnimationSprite();
		var anim = Animation.loadAni([sprite], eff_type, loader, loaderThis, frameIndex);

		this.m_pAnimMap[sprite.hashCode] = anim;
		sprite.visible = false;
		return sprite;
	}

	public static loadAni(sprites, eff_type: string, loader?: Function, loaderThis?: any, frameIndex: number = 0) {
		var eff_config = AnimationData.getConfig(eff_type);
		if (!eff_config) return;
		var data = this.cheackNpcName(eff_type);
		var anim = new SpriteAnimation(sprites, eff_type, eff_config.fHold, eff_config.fType, frameIndex);
		anim.isRepeat = eff_config.isRepeat;
		var paths = null;
		anim.m_bIsMultiFile = true;
		paths = FrameManager.getLoadCommonFilesUrls(data.newEffType, eff_config.fileNum);
		anim.loadFiles(paths, loader, loaderThis);
		return anim;
	}

	public static cheackNpcName(eff_type) {
		var arry = eff_type.split("_");
		var data: any = {};
		var mat = "_(\\d+)_(\\d+)_(\\d+)_";
		var count = arry.length - 1;    //得到 _ 的个数
		data.count = count;
		data.newEffType = arry[0] + "_" + arry[1];
		return data;
	}

	public static removeActions() {
		for (var key in this.m_pAnimMap) {
			var anim = <SpriteAnimation>this.m_pAnimMap[key];
			anim.removeAction();
		}
		this.m_pAnimMap = null;
		this.m_pAnimMap = {};
	}

	public static removeAction(sprite: AnimationSprite, isClear = true) {
		if (sprite) {
			sprite.eff_config = null;
			var anim = <SpriteAnimation>this.m_pAnimMap[sprite.hashCode];
			if (anim) {
				anim.removeAction(isClear);
			}
			anim = null;
			delete this.m_pAnimMap[sprite.hashCode];
			egret.Tween.removeTweens(sprite);
			if (sprite.parent) sprite.parent.removeChild(sprite);
			sprite = null;
		}

	}

	public static runAction(sprite: AnimationSprite, callback?: Function, thisArg?: any, needReset: boolean = true) {
		sprite.visible = true;
		var anim = this.m_pAnimMap[sprite.hashCode];
		if (anim && anim.anim) {
			sprite.texture = anim.anim.getFrame();
			var showFunc = function () {
				sprite.visible = false;
				if (callback) callback.call(thisArg);
			}
			anim.runAction(showFunc, this, needReset);
		}
	}

	public static stopAction(sprite: AnimationSprite) {
		sprite.visible = true;
		var anim = <SpriteAnimation>this.m_pAnimMap[sprite.hashCode];
		if (anim) {
			anim.stopAction();
		} else {
			egret.Tween.removeTweens(sprite);
			sprite.visible = false;
		}
	}


}