class ArrowAni extends BaseAni{



	public constructor() {
		super();
		this.setAni(AniTypes.Arrow);
	}

	public play(): void{
		super.play();
		this.visible = true;
	}

	public stop(): void{
		super.stop();
		this.visible = false;
	}



}