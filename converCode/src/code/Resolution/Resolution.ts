// 分辨率适配组件 （挂在Payer 游戏对象上）
class Resolution {
	public constructor() {
	}

	public  BASE_WIDTH = 480;
    public  BASE_HEIGHT = 800;

    private m_tranform;//Transform
    private baseRatio:number;
    private percentScale:number;

    private Start():void
    {
        // m_tranform = transform;
        this.setScale();
    }
    private setScale():void
    {
        // this.baseRatio = this.BASE_WIDTH / this.BASE_HEIGHT * Screen.height;
        // this.percentScale = Screen.width / baseRatio;

        // //只针对缩小进行缩小，如果屏幕超过480*800 则不进行放大
        // if (percentScale<1)
        //     m_tranform.localScale = new Vector3(m_tranform.localScale.x * percentScale, m_tranform.localScale.y * percentScale, 1);
    }

}