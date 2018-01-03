// 游戏背景 组件（挂在Screen/Background 游戏对像下）
class SetBackground extends GameObject {

	private img: eui.Image;
	// public Background:string[];//Sprite[]     // array background

	public constructor() {
		super();

		this.img = new eui.Image();
		this.addChild(this.img);
	}


	private Start() {
		// GetComponent<SpriteRenderer>().sprite = Background[PLayerInfo.BACKGROUND];
		this.img.source = ResUtils.getGameBg(PlayerInfo.BACKGROUND);
	}
}