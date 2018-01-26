/**
 * 合成特效，爆炸
 */
class EnchantAni extends BaseAni{



	public constructor() {
		super();
		this.source = "enchant_png";
		this.width = 32;
		this.height = 32;
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
	}

	public play(): void{
		this.visible = true;
		this.tweenStart();
	}

	private tweenStart(): void{
		egret.Tween.removeTweens(this);
		this.rotation = 0;
		egret.Tween.get(this).to({ rotation: 360 }, 2000).call(this.tweenStart, this);
	}

	public stop(): void{
		this.visible = false;
		egret.Tween.removeTweens(this);
	}


}