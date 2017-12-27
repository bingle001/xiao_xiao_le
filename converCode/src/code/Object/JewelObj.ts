// 宝石游戏对象 组件 (挂在 Jewel游戏对象下)
// 职责:自身提供多种方法，用于宝石生命周期的自管理
class JewelObj extends GameObject{

	public jewel:Jewel;

    public render:eui.Image;

    private DELAY = 0.2;

    public Checked:boolean;

	public isMove:boolean;
	
	public constructor() {
        super();
        
        this.render = new eui.Image();
        this.addChild(this.render);
	}

    //delete jewel
    public Destroy():void
    {
        //从宝石数组中移除自身
        this.RemoveFromList(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
		this._Destroy(); //this.StartCoroutine(this._Destroy());
    }

    // 技能释放 power of jewel
	private PowerProcess(power: number): void
    {
        switch (power)
        {
            case 1:
                GameController.action.PBoom(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
				EffectSpawner.effect.boom(new Vector2(this.x, this.y));	// this.gameObject.transform.position
                break;
            case 2:
				EffectSpawner.effect.FireArrow(new Vector2(this.x, this.y), false);// transform.position, false);
                GameController.action.PDestroyRow(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
                break;
            case 3:
                EffectSpawner.effect.FireArrow(new Vector2(this.x, this.y), true);	// transform.position,
                GameController.action.PDestroyCollumn(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
                break;
            case 4:
                GameController.action.PBonusTime();
                break;
        }
    }

    //move jewel and destroy
    public ReGroup(pos:Vector2):void
    {
        this._ReGroup(pos);//StartCoroutine(this._ReGroup(pos));
    }

	private _ReGroup(pos:Vector2):void{	// IEnumerator
        this.RemoveFromList(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
        // yield return new WaitForSeconds(DELAY - 0.015f);
        Ulti.MoveTo(this, pos, this.DELAY);

		this._Destroy();//this.StartCoroutine(this._Destroy());
    }

    // 销毁自身
    private _Destroy():void{	// IEnumerator
        GribManager.cell.GribCellObj[this.jewel.JewelPosition.x][this.jewel.JewelPosition.y].CelltypeProcess();
        GameController.action.CellRemoveEffect(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);

        // yield return new WaitForSeconds(DELAY);
        if (this.jewel.JewelPower > 0)
        {
            this.PowerProcess(this.jewel.JewelPower);
        }
        GameController.action.drop.DELAY = GameController.DROP_DELAY;
        this.JewelCrash();

        // yield return new WaitForEndOfFrame();
		EffectSpawner.effect.ScoreInc(new Vector2(this.x, this.y));// this.gameObject.transform.position);

        // yield return new WaitForEndOfFrame();
        EffectSpawner.effect.ContinueCombo();

        // yield return new WaitForEndOfFrame();
        Supporter.sp.RefreshTime();

        // this.StopAllCoroutines();    //停止所有协程
        //死循环！！！  // this.Destroy(gameObject);
    }

    // 根据当前宝石显示对象，播放销毁动画
    private JewelCrash():void
    {
        let x:number = this.jewel.JewelPosition.x;
        let y:number = this.jewel.JewelPosition.y;

		//TODO
		// EffectSpawner.effect.JewelCrashArray[x][y].transform.position = new Vector3(transform.position.x, transform.position.y, -0.2f);
		// EffectSpawner.effect.JewelCrashArray[x][y].SetActive(false);
		// EffectSpawner.effect.JewelCrashArray[x][y].SetActive(true);
    }

    /// 重新调整JewelPosition的位置，并播放下落动画
    /// 此方法有点类似于排序，主要是处理当Map中有消除的方块后产生空位，此时需要将空位上方的方块移动到空位。
    /// （说白了就是冒泡排序，地图中消失的方块移动到后面）
    /// 将数组中Y轴的往下移动。全部移动完后，所有地图中空的位置均为后面的值，例如6、7、8这几个位置是空的）
    public getNewPosition():void
    {
        let newpos = this.jewel.JewelPosition.y;
        let x:number = this.jewel.JewelPosition.x;
        let oldpos = this.jewel.JewelPosition.y;

        for (let y = newpos - 1; y >= 0; y--)
        {
			if (GribManager.cell.Map[x][y] != 0 && GribManager.cell.GribCellObj[x][y].cell.CellEffect != 4 && JewelSpawner.spawn.JewelGribScript[x][y] == null)
                newpos = y;
			else if (GribManager.cell.Map[x][y] != 0 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4)
            {
                break;
            }
        }
		JewelSpawner.spawn.JewelGribScript[x][this.jewel.JewelPosition.y] = null;
		JewelSpawner.spawn.JewelGrib[x][this.jewel.JewelPosition.y] = null;

        this.jewel.JewelPosition = new Vector2(x, newpos);
		JewelSpawner.spawn.JewelGribScript[x][newpos] = this;
		JewelSpawner.spawn.JewelGrib[x][newpos] = this;// this.gameObject;
		if (oldpos != newpos) {
            Ulti.IEDrop(this, this.jewel.JewelPosition, GameController.DROP_SPEED);//StartCoroutine(Ulti.IEDrop(this.gameObject, this.jewel.JewelPosition, GameController.DROP_SPEED));
		}
    }

    /// 获取行消除List
    public GetRow(Pos:Vector2, type:number, bonus:JewelObj):JewelObj[]
    {
		let tmp1:JewelObj[] = this.GetLeft(Pos, type);
        let tmp2:JewelObj[] = this.GetRight(Pos, type);
		if (tmp1.length + tmp2.length > 1) {
			return Ulti.ListPlus(tmp1, tmp2, bonus);
		}

		else
			return new Array<JewelObj>();// new List<JewelObj>();
    }

    /// 获取列消除List
    public GetCollumn(Pos:Vector2, type:number, bonus:JewelObj):JewelObj[]
    {
        let tmp1:JewelObj[] = this.GetTop(Pos, type);
        let tmp2:JewelObj[] = this.GetBot(Pos, type);
		if (tmp1.length + tmp2.length > 1) {
			return Ulti.ListPlus(tmp1, tmp2, bonus);
		}
		else
			return new Array<JewelObj>();// new List<JewelObj>();
    }

    /// 播放移动无效的动画
    public SetBackAnimation(Obj:GameObject):void
    {
        if (!Supporter.sp.isNomove)
		{
			//TODO 
			debug("播放移动无效动画")
			let ObjPos: Vector2 = (Obj as JewelObj).jewel.JewelPosition;// Obj.GetComponent<JewelObj>().jewel.JewelPosition;
            // Animation anim = transform.GetChild(0).GetComponent<Animation>();
            // anim.enabled = true;

            // if (ObjPos.x == jewel.JewelPosition.x)
            // {
            //     if (ObjPos.y > jewel.JewelPosition.y)
            //     {
            //         anim.Play("MoveBack_Up");
            //     }
            //     else
            //     {
            //         anim.Play("MoveBack_Down");
            //     }
            // }
            // else
            // {
            //     if (ObjPos.x > jewel.JewelPosition.x)
            //     {
            //         anim.Play("MoveBack_Right");
            //     }
            //     else
            //     {
            //         anim.Play("MoveBack_Left");
            //     }
            // }
        }
    }

    private GetLeft(Pos:Vector2, type:number):JewelObj[]
    {
		let tmp: JewelObj[] = [];// new List<JewelObj>();
        for (let x = Pos.x - 1; x >= 0; x--)
        {

			if (x != this.jewel.JewelPosition.x && JewelSpawner.spawn.JewelGribScript[x][Pos.y] != null && JewelSpawner.spawn.JewelGribScript[x][Pos.y].jewel.JewelType == type && GribManager.cell.GribCellObj[x][Pos.y].cell.CellEffect == 0)
                // tmp.Add(JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y]);
				tmp.push(JewelSpawner.spawn.JewelGribScript[x][Pos.y]);
            else
                return tmp;
        }
        return tmp;
    }
    private GetRight(Pos:Vector2,type:number):JewelObj[]
    {
        let tmp:JewelObj[] = [];// new List<JewelObj>();
        for (let x = Pos.x + 1; x < 7; x++)
        {
			if (x != this.jewel.JewelPosition.x && JewelSpawner.spawn.JewelGribScript[x][Pos.y] != null && JewelSpawner.spawn.JewelGribScript[x][Pos.y].jewel.JewelType == type && GribManager.cell.GribCellObj[x][Pos.y].cell.CellEffect == 0)
				tmp.push(JewelSpawner.spawn.JewelGribScript[x][Pos.y]);
            else
                return tmp;
        }
        return tmp;
    }

    /// 检测上方是否有相同的方块
    private GetTop(Pos:Vector2, type:number):JewelObj[]
    {
		let tmp: JewelObj[] = [];// new List<JewelObj>();
        for (let y = Pos.y + 1; y < 9; y++)
        {
            if (y != this.jewel.JewelPosition.y && 
				JewelSpawner.spawn.JewelGribScript[Pos.x][y] != null && 
				JewelSpawner.spawn.JewelGribScript[Pos.x][y].jewel.JewelType == type && 
				GribManager.cell.GribCellObj[Pos.x][y].cell.CellEffect == 0)
				tmp.push(JewelSpawner.spawn.JewelGribScript[Pos.x][y]);
            else
                return tmp;
        }

        return tmp;
    }
    
    /// 检测下方是否有相同的方块
    private GetBot(Pos:Vector2, type:number):JewelObj[]
    {
		let tmp: JewelObj[] = [];// new List<JewelObj>();
        for (let y = Pos.y - 1; y >= 0; y--)
        {
			if (y != this.jewel.JewelPosition.y && JewelSpawner.spawn.JewelGribScript[Pos.x][y] != null && JewelSpawner.spawn.JewelGribScript[Pos.x][y].jewel.JewelType == type && GribManager.cell.GribCellObj[Pos.x][y].cell.CellEffect == 0)
				tmp.push(JewelSpawner.spawn.JewelGribScript[Pos.x][y]);
            else
                return tmp;
        }
		return tmp;
    }

    // 从宝石数组中移除自身
    private RemoveFromList(x:number, y:number):void
    {
        //移除脚本
		JewelSpawner.spawn.JewelGribScript[x][y] = null;
        //移除显示对象
		JewelSpawner.spawn.JewelGrib[x][y] = null;

        //碰撞器
        // this.GetComponent<Collider2D>().enabled = false;
		this.visible = false;
    }

    public getListcount():number
    {
        let list:JewelObj[] = Ulti.ListPlus(this.GetRow(this.jewel.JewelPosition, this.jewel.JewelType, null),
                                            this.GetCollumn(this.jewel.JewelPosition, this.jewel.JewelType, null),
                                            this);
		return list.length;
    }
    public getList():JewelObj[]
    {
        let list:JewelObj[] = Ulti.ListPlus(this.GetRow(this.jewel.JewelPosition, this.jewel.JewelType, null),
                                            this.GetCollumn(this.jewel.JewelPosition, this.jewel.JewelType, null),
                                            this);
        return list;
    }

    public RuleChecker():void
    {

        if (this.jewel.JewelType != 99)
        {
            let list:JewelObj[] = Ulti.ListPlus(this.GetRow(this.jewel.JewelPosition, this.jewel.JewelType, null),
                                                      this.GetCollumn(this.jewel.JewelPosition, this.jewel.JewelType, null),
                                                      this);

            if (list.length >= 3)
            {
                this.listProcess(list);
                this.Checked = true;
            }
        }
        else
        {
            GameController.action.WinChecker();
        }
    }

    private listProcess(list:JewelObj[]):void
    {
		let _listint: number[] = [];// new List<int>();
        for (let i = 0; i < list.length; i++)
        {
            if (!list[i].Checked)
                _listint.push(list[i].getListcount());
            else
                _listint.push(list.length);
        }
		let max: number = Utils.arrayMax(_listint);// Mathf.Max(_listint.ToArray());
		let idx = _listint.indexOf(max);
        GameController.action.JewelProcess2(list[idx].getList(), this);
    }

    // 播放宝石的抖动动画,即宝石移动完毕后停止时会抖动一下.
    public Bounce():void
    {
        if (GameController.action.GameState == GameState.PLAYING && !Supporter.sp.isNomove)
        {
            // Animation anim = render.GetComponent<Animation>();
            // anim.enabled = true;
            // anim.Play("bounce");
			//TODO
			debug("JewelObj.Bounce()");
        }
    }

    public JewelDisable():void
    {
        // Animation anim = render.GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("Disable");
		debug("JewelObj.JewelDisable()");
    }

    public JewelEnable():void
    {
        // Animation anim = render.GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("Enable");
		debug("JewelObj.JewelEnable()");
    }

    // 播放左右摇晃动画,用于提示玩家此方块可以消除
    public JewelSuggesttion():void
    {
        // Animation anim = render.GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("Suggesttion");
		debug("JewelObj.JewelSuggesttion");
    }

    // 停止左右摇晃动画
    public JewelStopSuggesttion():void
    {
        // Animation anim = render.GetComponent<Animation>();
        // if (anim.IsPlaying("Suggesttion"))
        // {
        //     anim.Stop("Suggesttion");
        //     anim.enabled = false;
        //     transform.GetChild(0).transform.localEulerAngles = new Vector3(0, 0, 0);
        // }
		debug("JewelObj.JewelStopSuggesttion");
    }

	


}