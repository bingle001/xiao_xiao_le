class BashAni extends eui.Group{

	private _ani: BaseAni;

	public constructor() {
		super();
		this.width = Global.BaseDistance;
		this.height = Global.BaseDistance;

		this._ani = new BaseAni();
		this._ani.horizontalCenter = 0;
		this._ani.verticalCenter = 0;
		this.addChild(this._ani);

		this._ani.setAni(AniTypes.Bash);
		this.visible = false;
	}

	public play(): void{
		this.visible = true;
		this._ani.play(this.stop, this);
	}

	public stop(): void{
		this._ani.stop();
		this.visible = false;
	}




}