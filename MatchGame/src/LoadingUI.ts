class LoadingUI extends eui.Component {

    public img_bar: eui.Image;
    
    private m_pBarWidth: number = 0;
    private m_pRect: egret.Rectangle;

    public constructor() {
        super();
        this.skinName = "LoadingUISkin";
    }

    protected createChildren(): void{
        super.createChildren();

        this.m_pRect = new egret.Rectangle(0, 0, this.img_bar.width, this.img_bar.height);

    }

    public setProgress(current: number, total: number): void {
           
    }
}
