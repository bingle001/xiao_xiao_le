// 格子游戏对象 组件
class CellObj extends GameObject {

	public CellCode: number;
	public cell: Cell;

	private icon: eui.Image;

	public constructor() {
		super();

		this.icon = new eui.Image();
		this.addChild(this.icon);
	}



    // change to sprite by index
    public SetSpriteEvent():void    {
		this.SetSprite(this.cell.CellType - 1);
    }

    // set sprite for cell when change index
	public SetSprite(type: number): void {
		//TODO
        // this.GetComponent<SpriteRenderer>().sprite = GribManager.cell.CellSprite[type];
        this.setChilEffectSprite(this.cell.CellEffect);
    }

    // remove effect of cell
    public RemoveEffect():void {
        if (this.cell.CellEffect > 0)
		{
			//TODO
        //     transform.GetChild(0).gameObject.SetActive(false);
        //     if (cell.CellEffect == 5)
        //     {
        //         EffectSpawner.effect.IceCrash(cell.CellPosition);
        //         SoundController.Sound.IceCrash();
        //     }
        //     else if (cell.CellEffect == 4)
        //     {
        //         EffectSpawner.effect.LockCrash(cell.CellPosition);
        //         SoundController.Sound.LockCrash();
        //     }
        //     cell.CellEffect = 0;
        //     if (JewelSpawner.spawn.JewelGribScript[(int)cell.CellPosition.x, (int)cell.CellPosition.y] != null)
        //         JewelSpawner.spawn.JewelGribScript[(int)cell.CellPosition.x, (int)cell.CellPosition.y].RuleChecker();
        }
    }

	private setChilEffectSprite(celleffect: number): void {
        if (celleffect > 0){
            // transform.GetChild(0).GetComponent<SpriteRenderer>().sprite = GribManager.cell.CellSprite[celleffect];
            let res: string = GribManager.cell.CellSprite[celleffect];
            this.icon.source = res;
        }
        else
        {
            // transform.GetChild(0).gameObject.SetActive(false);
            this.icon.visible = false;
        }

    }

    public CelltypeProcess():void
    {
        if (this.cell.CellType > 1)
        {
            this.cell.CellType--;
            this.runAnim();
            if (this.cell.CellType == 1)
            {
                GameController.action.CellNotEmpty--;
                if (GameController.action.CellNotEmpty == 0)
                    GameController.action.isShowStar = true;
            }

        }
    }
    private runAnim():void
    {
        // Animation anim = GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("CellChangeSprite");
        //TODO
        debug("播放动画：CellChangeSprite");
    }



}