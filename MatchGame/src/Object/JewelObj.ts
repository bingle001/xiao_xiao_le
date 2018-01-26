// 宝石游戏对象
// 职责:自身提供多种方法，用于宝石生命周期的自管理
class JewelObj extends GameObject {

    public render: eui.Image;
    private DELAY = 0.2;

    private rowArrowAni: BaseAni;
    private colArrowAni: BaseAni;
    private enchantAni: EnchantAni;

    public jewel: Jewel;
    public Checked: boolean;
    public isMove: boolean;

    public constructor() {
        super();

        this.width = Global.CellWidth;
        this.height = Global.cellHeight;

        this.jewel = new Jewel();
        this.Checked = false;
        this.isMove = false;

        this.rowArrowAni = new BaseAni();
        this.rowArrowAni.setAni(AniTypes.Arrow);
        this.rowArrowAni.horizontalCenter = 0;
        this.rowArrowAni.verticalCenter = 0;
        this.rowArrowAni.visible = false;
        this.addChild(this.rowArrowAni);

        this.colArrowAni = new BaseAni();
        this.colArrowAni.setAni(AniTypes.Arrow);
        this.colArrowAni.rotation = 90;
        this.colArrowAni.horizontalCenter = 0;
        this.colArrowAni.verticalCenter = 0;
        this.colArrowAni.visible = false;
        this.addChild(this.colArrowAni);

        this.render = new eui.Image();
        this.render.horizontalCenter = 0;
        this.render.verticalCenter = 0;
        this.addChild(this.render);

        this.enchantAni = new EnchantAni();
        this.enchantAni.visible = false;
        this.enchantAni.x = 70;
        this.enchantAni.y = 30;
        this.addChild(this.enchantAni);
    }

    /**
     * 初始化宝石显示
     */
    public initJewel(x, y, type: number, power: number): void{
        this.jewel.JewelPosition = new Vector2(x, y);
        this.jewel.JewelType = type;
        this.jewel.JewelPower = power;

        this.x = Global.posX(x);
        this.y = Global.posY(y);

        this.render.source = JewelSpawner.spawn.JewelSprite[type];

        this.colArrowAni.stop();
        this.colArrowAni.visible = false;
        this.rowArrowAni.stop();
        this.rowArrowAni.visible = false;
        this.enchantAni.stop();
        this.enchantAni.visible = false;
        egret.Tween.removeTweens(this);

        if (power > 0) {
            if (power == Power.BOOM) {
                this.enchantAni.visible = true;
                this.enchantAni.play();
            }
            else if (power == Power.ROW_LIGHTING) {
                this.rowArrowAni.visible = true;
                this.rowArrowAni.play();
            }
            else if (power == Power.COLLUMN_LIGHTING) {
                this.colArrowAni.visible = true;
                this.colArrowAni.play();
            }
            else if (power == Power.MAGIC) {
                this.startMagicEffect();
            }
            else if (power == Power.TIME) {
                this.startTimerEffect();        
            }
        }

    }

    private startMagicEffect(): void{
        egret.Tween.removeTweens(this.render);
        this.rotation = 0;
        egret.Tween.get(this.render).to({ rotation: 360 }, 2000).call(this.startMagicEffect, this);
    }

    private startTimerEffect(): void{
        debug("追加时间特殊宝石！");
    }

    //delete jewel
    public Destroy(): void {
        if (this.jewel.JewelPosition == null) {
            return;
        }

        //从宝石数组中移除自身
        this.RemoveFromList(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
        this._Destroy(); //this.StartCoroutine(this._Destroy());
    }

    // 技能释放 power of jewel
    private PowerProcess(power: number): void {
        switch (power) {
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
    public ReGroup(pos: Vector2): void {
        this._ReGroup(pos);//StartCoroutine(this._ReGroup(pos));
    }

    private _ReGroup(pos: Vector2): void {	// IEnumerator
        this.RemoveFromList(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);
        // yield return new WaitForSeconds(DELAY - 0.015f);
        Utils.MoveTo(this, pos, this.DELAY);

        egret.setTimeout(this._Destroy, this, this.DELAY);//this._Destroy();//this.StartCoroutine(this._Destroy());
    }

    // 销毁自身
    private _Destroy(): void {	// IEnumerator
        GribManager.cell.GribCellObj[this.jewel.JewelPosition.x][this.jewel.JewelPosition.y].CelltypeProcess();
        GameController.action.CellRemoveEffect(this.jewel.JewelPosition.x, this.jewel.JewelPosition.y);

        // yield return new WaitForSeconds(DELAY);
        this.PowerProcess(this.jewel.JewelPower);
        GameController.action.drop.setLastDelay(GameController.DROP_DELAY);
        this.JewelCrash();
        EffectSpawner.effect.ContinueCombo();
        Supporter.sp.RefreshTime();

        egret.setTimeout(this._Destroy1, this, this.DELAY * 1000);
    }

    private _Destroy1(): void{
        EffectSpawner.effect.ScoreInc(new Vector2(this.x, this.y));// this.gameObject.transform.position);
    }

    // 根据当前宝石显示对象，播放销毁动画
    private JewelCrash(): void {
        let x: number = this.jewel.JewelPosition.x;
        let y: number = this.jewel.JewelPosition.y;
        EffectSpawner.effect.JewelCrashArray[x][y].play();
    }

    // 重新调整JewelPosition的位置，并播放下落动画
    // 此方法有点类似于排序，主要是处理当Map中有消除的方块后产生空位，此时需要将空位上方的方块移动到空位。
    // （说白了就是冒泡排序，地图中消失的方块移动到后面）
    // 将数组中Y轴的往下移动。全部移动完后，所有地图中空的位置均为后面的值，例如6、7、8这几个位置是空的）
    public getNewPosition(): void {
        let x: number = this.jewel.JewelPosition.x;
        let oldpos = this.jewel.JewelPosition.y;
        let newpos = this.jewel.JewelPosition.y;

        for (let y = newpos - 1; y >= 0; y--) {
            if (GribManager.cell.mapData[x][y] != 0 && GribManager.cell.GribCellObj[x][y].cell.CellEffect != 4 && JewelSpawner.spawn.JewelGrib[x][y] == null) {
                newpos = y;
            }
            else if (GribManager.cell.mapData[x][y] != 0 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4) {
                break;
            }
        }

        if (oldpos != newpos) {
            JewelSpawner.spawn.JewelGrib[x][this.jewel.JewelPosition.y] = null;
            this.jewel.JewelPosition = new Vector2(x, newpos);
            JewelSpawner.spawn.JewelGrib[x][newpos] = this;

            Utils.IEDrop(this, this.jewel.JewelPosition, GameController.DROP_SPEED);
        }
    }

    // 获取行消除List
    public GetRow(Pos: Vector2, type: number, bonus: JewelObj): JewelObj[] {
        let tmp1: JewelObj[] = this.GetLeft(Pos, type);
        let tmp2: JewelObj[] = this.GetRight(Pos, type);
        if (tmp1.length + tmp2.length > 1) {
            return Utils.ListPlus(tmp1, tmp2, bonus);
        }

        else
            return [];
    }

    // 获取列消除List
    public GetCollumn(Pos: Vector2, type: number, bonus: JewelObj): JewelObj[] {
        let tmp1: JewelObj[] = this.GetTop(Pos, type);
        let tmp2: JewelObj[] = this.GetBot(Pos, type);
        if (tmp1.length + tmp2.length > 1) {
            return Utils.ListPlus(tmp1, tmp2, bonus);
        }
        else
            return [];
    }

    // 播放移动无效的动画
    public SetBackAnimation(obj: JewelObj): void {
        if (!Supporter.sp.isNomove) {
            debug("播放移动无效动画");
            this.setActiveFalse();

            let self = this;
            let cx: number = this.x;
            let cy: number = this.y;
            let tx: number = obj.x;
            let ty: number = obj.y;
            egret.Tween.removeTweens(self);
            egret.Tween.get(self).to({ x: tx, y: ty }, 200).call(function () {
                egret.Tween.removeTweens(self);
                egret.Tween.get(self).to({ x: cx, y: cy }, 200).call(self.setActiveTrue, self);
            });
        }
    }

    private setActiveTrue(): void{
        this.touchEnabled = true;
    }

    private setActiveFalse(): void{
        this.touchEnabled = false;
    }


    private GetLeft(Pos: Vector2, type: number): JewelObj[] {
        let tmp: JewelObj[] = [];
        for (let x = Pos.x - 1; x >= 0; x--) {
            if (x != this.jewel.JewelPosition.x
                && JewelSpawner.spawn.JewelGrib[x][Pos.y] != null
                && JewelSpawner.spawn.JewelGrib[x][Pos.y].jewel.JewelType == type
                && GribManager.cell.GribCellObj[x][Pos.y].cell.CellEffect == 0) {
                    tmp.push(JewelSpawner.spawn.JewelGrib[x][Pos.y]);
                }
            else
                return tmp;
        }
        return tmp;
    }
    private GetRight(Pos: Vector2, type: number): JewelObj[] {
        let tmp: JewelObj[] = [];
        for (let x = Pos.x + 1; x < 7; x++) {
            if (x != this.jewel.JewelPosition.x
                && JewelSpawner.spawn.JewelGrib[x][Pos.y] != null
                && JewelSpawner.spawn.JewelGrib[x][Pos.y].jewel.JewelType == type
                && GribManager.cell.GribCellObj[x][Pos.y].cell.CellEffect == 0) {
                    tmp.push(JewelSpawner.spawn.JewelGrib[x][Pos.y]);
                }
            else
                return tmp;
        }
        return tmp;
    }

    // 检测上方是否有相同的方块
    private GetTop(Pos: Vector2, type: number): JewelObj[] {
        let tmp: JewelObj[] = [];
        for (let y = Pos.y + 1; y < 9; y++) {
            if (y != this.jewel.JewelPosition.y
                && JewelSpawner.spawn.JewelGrib[Pos.x][y] != null
                && JewelSpawner.spawn.JewelGrib[Pos.x][y].jewel.JewelType == type
                && GribManager.cell.GribCellObj[Pos.x][y].cell.CellEffect == 0) {
                    tmp.push(JewelSpawner.spawn.JewelGrib[Pos.x][y]);
                }
            else
                return tmp;
        }
        return tmp;
    }

    // 检测下方是否有相同的方块
    private GetBot(Pos: Vector2, type: number): JewelObj[] {
        let tmp: JewelObj[] = [];
        for (let y = Pos.y - 1; y >= 0; y--) {
            if (y != this.jewel.JewelPosition.y
                && JewelSpawner.spawn.JewelGrib[Pos.x][y] != null
                && JewelSpawner.spawn.JewelGrib[Pos.x][y].jewel.JewelType == type
                && GribManager.cell.GribCellObj[Pos.x][y].cell.CellEffect == 0) {
                    tmp.push(JewelSpawner.spawn.JewelGrib[Pos.x][y]);
                }
            else
                return tmp;
        }
        return tmp;
    }

    // 从宝石数组中移除自身
    private RemoveFromList(x: number, y: number): void {
        //移除脚本
        JewelSpawner.spawn.JewelGrib[x][y] = null;

        this.removeFromParent();
        this.visible = false;
    }

    public getListcount(): number {
        let list: JewelObj[] = Utils.ListPlus(this.GetRow(this.jewel.JewelPosition, this.jewel.JewelType, null),
            this.GetCollumn(this.jewel.JewelPosition, this.jewel.JewelType, null),
            this);
        return list.length;
    }
    public getList(): JewelObj[] {
        let list: JewelObj[] = Utils.ListPlus(this.GetRow(this.jewel.JewelPosition, this.jewel.JewelType, null),
            this.GetCollumn(this.jewel.JewelPosition, this.jewel.JewelType, null),
            this);
        return list;
    }

    public RuleChecker(): void {
        if (this.jewel.JewelType != 99) {
            let list: JewelObj[] = Utils.ListPlus(
                this.GetRow(this.jewel.JewelPosition, this.jewel.JewelType, null),
                this.GetCollumn(this.jewel.JewelPosition, this.jewel.JewelType, null),
                this);

            if (list.length >= 3) {
                this.listProcess(list);
                this.Checked = true;
            }
        }
        else {
            GameController.action.WinChecker();
        }
    }

    private listProcess(list: JewelObj[]): void {
        let _listint: number[] = [];// new List<int>();
        for (let i = 0; i < list.length; i++) {
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
    public Bounce(): void {
        if (GameController.action.GameState == GameState.PLAYING && !Supporter.sp.isNomove) {
            // Animation anim = render.GetComponent<Animation>();
            // anim.enabled = true;
            // anim.Play("bounce");
            //TODO
            // debug("JewelObj.Bounce()");
            let ty: number = this.y;
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ y: ty - 5 }, 80).to({ y: ty }, 80).call(this.RuleChecker, this);
        }
    }

    public JewelDisable(): void {
        // Animation anim = render.GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("Disable");
        debug("JewelObj.JewelDisable()");
    }

    public JewelEnable(): void {
        this.touchEnabled = true;
    }

    // 播放左右摇晃动画,用于提示玩家此方块可以消除
    public JewelSuggesttion(): void {
        // Animation anim = render.GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("Suggesttion");
        debug("JewelObj.JewelSuggesttion");
    }

    // 停止左右摇晃动画
    public JewelStopSuggesttion(): void {
        // Animation anim = render.GetComponent<Animation>();
        // if (anim.IsPlaying("Suggesttion"))
        // {
        //     anim.Stop("Suggesttion");
        //     anim.enabled = false;
        //     transform.GetChild(0).transform.localEulerAngles = new Vector3(0, 0, 0);
        // }
        debug("JewelObj.JewelStopSuggesttion");
    }

    /** 播放出现特效 */
    public playAppearEffect(): void{
        egret.Tween.removeTweens(this.render);
        this.render.scaleX = 0;
        this.render.scaleY = 0;
        this.render.rotation = 0;
        egret.Tween.get(this.render).to({ scaleX: 1, scaleY: 1, rotation: 720 }, 500);
    }

    public toString(): string{
        let hash = this.hashCode;
        let jewel = this.jewel;
        let pos = this.jewel.JewelPosition;
        let obj = {
            hash,
            jewel,
            pos,
        };
        return JSON.stringify(obj);
    }





}