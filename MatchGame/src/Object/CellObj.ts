// 格子游戏对象 组件
class CellObj extends GameObject {

    public CellCode: number;
    public cell: Cell;

    private icon: eui.Image;
    private ani: BaseAni;

    public constructor() {
        super();

        this.width = Global.CellWidth;
        this.height = Global.cellHeight;

        this.icon = new eui.Image();
        this.icon.horizontalCenter = 0;
        this.icon.verticalCenter = 0;
        // this.addChild(this.icon);

        this.ani = new BaseAni();
        this.ani.horizontalCenter = 0;
        this.ani.verticalCenter = 0;

        this.cell = new Cell();
        this.CellCode = 0;
    }

    // change to sprite by index
    public SetSpriteEvent(): void {
        this.SetSprite(this.cell.CellType - 1);
    }

    // set sprite for cell when change index
    public SetSprite(type: number): void {
        let res: string;
        if (type < 0) {
            res = "cell_tranf_png";
        }
        else if (type > 3) {
            res = GribManager.cell.CellSprite[3];
        }
        else {
            res = GribManager.cell.CellSprite[type];
        }
        this.icon.source = res;
        this.icon.scaleX = 1;
        this.SetActive(this, this.icon, type >= 0);
        this.setChilEffectSprite(this.cell.CellEffect);
    }

    private setChilEffectSprite(celleffect: number): void {
        if (celleffect == 4) {
            this.ani.setAni(AniTypes.Ice);
            this.SetActive(this, this.ani, true);
        }
        else if (celleffect == 5) {
            this.ani.setAni(AniTypes.Lock);
            this.SetActive(this, this.ani, true);
        }
        else {
            this.SetActive(this, this.ani, false);
        }

    }

    // remove effect of cell
    public RemoveEffect(): void {
        if (this.cell.CellEffect > 0) {
            if (this.cell.CellEffect == 5) {
                this.ani.play();
                SoundController.Sound.IceCrash();
            }
            else if (this.cell.CellEffect == 4) {
                this.ani.play();
                SoundController.Sound.LockCrash();
            }

            this.cell.CellEffect = 0;
            if (JewelSpawner.spawn.JewelGrib[this.cell.CellPosition.x][this.cell.CellPosition.y] != null) {
                JewelSpawner.spawn.JewelGrib[this.cell.CellPosition.x][this.cell.CellPosition.y].RuleChecker();
            }
        }
    }

    private aniPlayOver(): void{
        
    }

    public CelltypeProcess(): void {
        if (this.cell.CellType > 1) {
            this.cell.CellType--;
            this.runAnim();
            if (this.cell.CellType == 1) {
                GameController.action.CellNotEmpty--;
                if (GameController.action.CellNotEmpty == 0) {
                    GameController.action.isShowStar = true;
                }
            }
        }
    }

    private runAnim(): void {
        // Animation anim = GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("CellChangeSprite");
        //TODO
        debug("播放动画：CellChangeSprite");
        egret.Tween.removeTweens(this.icon);
        egret.Tween.get(this.icon).to({ scaleX: 0 }, 200).call(this.appearNewCell, this);
    }

    private appearNewCell(): void{
        this.SetSpriteEvent();
        if (this.icon.parent) {
            this.icon.scaleX = 0;
            egret.Tween.removeTweens(this.icon);
            egret.Tween.get(this.icon).to({ scaleX: 1 }, 200);
        }
    }

    private m_pLbl: egret.TextField;
    public debug(x, y): void{
        if (!this.m_pLbl) {
            this.m_pLbl = new egret.TextField();
            this.m_pLbl.size = 20;
            this.m_pLbl.x = 20;
            this.m_pLbl.y = 20;
            this.m_pLbl.textColor = 0xffffff;
            this.addChild(this.m_pLbl);
        }
        this.m_pLbl.text = "(" + x + "," + y + ")";
        this.name = x + "_" + y;
    }





}