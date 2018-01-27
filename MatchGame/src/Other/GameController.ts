enum Power {
    BOOM = 1,               //爆炸
    ROW_LIGHTING = 2,       //消除行
    COLLUMN_LIGHTING = 3,   //消除列
    MAGIC = 8,
    TIME = 4,               //追加时间
}

// 控制器游戏对象 组件
class GameController {

    public static action: GameController;

    public static DROP_SPEED: number = 8;
    public static DROP_DELAY: number = 0.5;

    public GameState: number;

    public CellNotEmpty: number;

    public Selector: eui.Group;

    public drop: SpawnController;

    public NoSelect: eui.Group;

    public JewelStar: JewelObj;

    public isStar: boolean;

    public isShowStar: boolean;

    public isAddPower: boolean;

    private JewelScript: JewelObj;
    private JewelScript1: JewelObj;

    private Pointer: JewelObj;  //最开始点中的
    private Selected: JewelObj; //当前选中的

    private ishold: boolean;

    public static Awake(): void {
        GameController.action = new GameController();
        GameController.action.drop = new SpawnController();
    }

    public Start(selector: eui.Group, noSelector: eui.Group) {
        this.Selector = selector;
        this.Selector.visible = false;
        this.NoSelect = noSelector;
        this.NoSelect.visible = false;

        EffectSpawner.effect.ComboTick();//StartCoroutine();
        this.GameState = GameState.PLAYING;
        Timer.timer.TimeTick(true);
        Time.addFrameCall(this.Update, this);
    }

    public Update(): void {
        this.JewelSelecter();
    }

    private JewelSelecter(): void {
        if (Input._isMouseDown && !this.ishold) {
            this.ishold = true;

            this.Pointer = this.JewelTouchChecker(Input._localX, Input._localY);
            if (this.Pointer) {
                this.EnableSelector(this.Pointer.x, this.Pointer.y);
            }

            Supporter.sp.StopSuggestionAnim();
        }
        else if (Input._isMouseDown && this.ishold) {
            if (this.Pointer != null) {

                this.Selected = this.JewelTouchChecker(Input._localX, Input._localY);
                if (this.Selected != null && this.Pointer != this.Selected) {
                    if (this.DistanceChecker(this.Pointer, this.Selected)) {
                        this.RuleChecker(this.Pointer, this.Selected);
                        this.Pointer = null;
                        this.Selected = null;
                        this.Selector.visible = false;
                    }
                    else {
                        this.Pointer = this.Selected;
                        this.Selected = null;
                        this.EnableSelector(this.Pointer.x, this.Pointer.y);
                    }
                }
            }
        }
        else if (this.ishold) {
            this.ishold = false;
        }
    }

    //check distance between 2 object
    private DistanceChecker(obj1: JewelObj, obj2: JewelObj): boolean {
        let v1: Vector2 = obj1.jewel.JewelPosition;
        let v2: Vector2 = obj2.jewel.JewelPosition;
        if (Vector2.Distance(v1, v2) <= 1) {
            return true;
        }

        return false;
    }

    //check logic game
    public RuleChecker(jewel1: JewelObj, jewel2: JewelObj): void {
        Debug.Log("Pointer:" + jewel1.jewel.JewelPosition.x + "," + jewel1.jewel.JewelPosition.y);
        Debug.Log("Selected:" + jewel2.jewel.JewelPosition.x + "," + jewel2.jewel.JewelPosition.y);

        if (jewel1.jewel.JewelType == 99 || jewel2.jewel.JewelType == 99) {
            if (jewel1.jewel.JewelType == 8 || jewel2.jewel.JewelType == 8) {
                jewel1.SetBackAnimation(jewel2);
                jewel2.SetBackAnimation(jewel1);
                return;
            }
        }

        let NeiObj1: JewelObj[] = Utils.ListPlus(
            jewel1.GetCollumn(jewel2.jewel.JewelPosition, jewel1.jewel.JewelType, null),
            jewel1.GetRow(jewel2.jewel.JewelPosition, jewel1.jewel.JewelType, null),
            jewel1);
        let NeiObj2: JewelObj[] = Utils.ListPlus(
            jewel2.GetCollumn(jewel1.jewel.JewelPosition, jewel2.jewel.JewelType, null),
            jewel2.GetRow(jewel1.jewel.JewelPosition, jewel2.jewel.JewelType, null),
            jewel2);

        if (NeiObj1.length >= 3 || NeiObj2.length >= 3 || jewel1.jewel.JewelType == 8 || jewel2.jewel.JewelType == 8) {
            Utils.MoveTo(jewel1, jewel2.jewel.JewelPosition, 0.2);
            Utils.MoveTo(jewel2, jewel1.jewel.JewelPosition, 0.2);

            this.SwapJewelPosition(jewel1, jewel2);
            let self = this;
            egret.setTimeout(function () {
                self.JewelProcess(NeiObj1, NeiObj2, jewel1, jewel2);
            }, this, 200);
        }
        else {
            jewel1.SetBackAnimation(jewel2);
            jewel2.SetBackAnimation(jewel1);
        }
    }

    private JewelProcess(list1: JewelObj[], list2: JewelObj[], obj1: JewelObj, obj2: JewelObj): void {
        let c1 = list1.length;
        let c2 = list2.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj2, obj1, obj1.jewel.JewelType);
        }
        else if (obj1.jewel.JewelType == 8) {   // obj1.GetComponent<JewelObj>().jewel.JewelType == 8)
            obj2.Destroy();
            this.PDestroyType(obj2.jewel.JewelType, obj2.jewel.JewelPosition);
            obj1.Destroy();
        }

        if (c2 > 2) {
            this.ListProcess(list2, obj1, obj2, obj2.jewel.JewelType);
        }
        else if (obj2.jewel.JewelType == 8) {
            obj1.Destroy();
            this.PDestroyType(obj1.jewel.JewelType, obj1.jewel.JewelPosition);
            obj2.Destroy();
        }

    }
    public JewelProcess2(list1: JewelObj[], obj1: JewelObj): void {
        let c1 = list1.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj1, null, obj1.jewel.JewelType);
        }

    }

    private ListProcess(list: JewelObj[], obj: JewelObj, obj1: JewelObj, type: number): boolean {
        debug("消除组：", list);
        let v: Vector2;
        if (obj1 != null) {
            v = obj1.jewel.JewelPosition;
        }
        else {
            v = obj.jewel.JewelPosition;
        }

        let c = list.length;
        if (c == 3) {
            this.DestroyJewel(list);
            EffectSpawner.effect.ComBoInc();
            this.dropjewel();
            return false;
        }
        else if (c == 4) {
            this.ReGroup(list, type, Power.BOOM, v);
            this.DestroyRandom();
            EffectSpawner.effect.ComBoInc();
            this.dropjewel();
        }
        else if (c >= 5) {
            this.ReGroup(list, 8, Power.MAGIC, v);
            EffectSpawner.effect.ComBoInc();
            this.DestroyRandom();
            this.DestroyRandom();
            this.dropjewel();
        }

        return true;
    }

    // 开启滑落检测
    private dropjewel(): void {
        // this.drop.setDelay(GameController.DROP_DELAY);
        this.drop.setLastDelay(GameController.DROP_DELAY);
    }
    private DestroyJewel(list: JewelObj[]): void {
        SoundController.Sound.JewelCrash();
        EffectSpawner.effect.glass();
        for (let i in list) {
            let item = list[i];
            Debug.TraceNowJewelObj(item);
            item.Destroy();
        }
    }
    private ReGroup(list: JewelObj[], type: number, power: number, pos: Vector2): void {
        SoundController.Sound.JewelCrash();
        EffectSpawner.effect.glass();
        for (let i in list) {
            let item = list[i];
            item.ReGroup(pos);
        }
        this.SpawnJewelPower(type, power, pos);//StartCoroutine(SpawnJewelPower(type, power, pos));
    }

    //检测当前鼠标碰到哪一个
    private JewelTouchChecker(localX: number, localY: number): JewelObj {
        let list = JewelSpawner.spawn.JewelGrib;
        for (let x = 0; x < list.length; x++) {
            for (let y = 0; y < list[x].length; y++) {
                let obj = list[x][y];
                if (obj) {
                    if (localX >= obj.x && localY >= obj.y && localX < obj.x + obj.width && localY < obj.y + obj.height) {
                        debug("当前触碰点：(%s, %s)", obj.jewel.JewelPosition.x, obj.jewel.JewelPosition.y);
                        return obj;
                    }
                }
            }
        }
        return null;
    }

    private SwapJewelPosition(jewel1: JewelObj, jewel2: JewelObj): void {
        JewelSpawner.spawn.JewelGrib[jewel1.jewel.JewelPosition.x][jewel1.jewel.JewelPosition.y] = jewel2;
        JewelSpawner.spawn.JewelGrib[jewel2.jewel.JewelPosition.x][jewel2.jewel.JewelPosition.y] = jewel1;

        //交互宝时对象在Map中的位置
        let tmp: Vector2 = jewel1.jewel.JewelPosition;
        jewel1.jewel.JewelPosition = jewel2.jewel.JewelPosition;
        jewel2.jewel.JewelPosition = tmp;

        if (jewel1.jewel.JewelType == 99 || jewel2.jewel.JewelType == 99) {
            this.WinChecker();
        }
    }

    private SpawnJewelPower(type: number, power: number, pos: Vector2) {
        egret.setTimeout(function () {
            JewelSpawner.spawn.SpawnJewelPower(type, power, pos);
        }, this, 0.2 * 1000);
    }


    // 播放格子除动画特效
    public CellRemoveEffect(x: number, y: number): void {
        if (x - 1 >= 0 && GribManager.cell.GribCellObj[x - 1][y] != null)
            GribManager.cell.GribCellObj[x - 1][y].RemoveEffect();

        if (x + 1 < 7 && GribManager.cell.GribCellObj[x + 1][y] != null)
            GribManager.cell.GribCellObj[x + 1][y].RemoveEffect();

        if (y - 1 >= 0 && GribManager.cell.GribCellObj[x][y - 1] != null)
            GribManager.cell.GribCellObj[x][y - 1].RemoveEffect();

        if (y + 1 < 9 && GribManager.cell.GribCellObj[x][y + 1] != null)
            GribManager.cell.GribCellObj[x][y + 1].RemoveEffect();
    }

    // 销毁一行
    public PDestroyRow(_x: number, y: number): void {
        this.dropjewel();
        SoundController.Sound.Fire();
        let celleffect: CellObj[] = [];// new List<CellObj>();
        let jeweldes: JewelObj[] = [];// new List<JewelObj>();
        for (let x = 0; x < 7; x++) {
            if (_x != x) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0)
                    celleffect.push(GribManager.cell.GribCellObj[x][y]);
                if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGrib[x][y]);
            }
        }
        for (let i in celleffect) {
            let item: CellObj = celleffect[i]
            item.RemoveEffect();
        }
        for (let i in jeweldes) {
            let item: JewelObj = jeweldes[i];
            item.Destroy();
        }
    }

    // 销毁一列
    public PDestroyCollumn(x: number, _y: number): void {
        this.dropjewel();
        SoundController.Sound.Fire();
        let celleffect: CellObj[] = [];// new List<CellObj>();
        let jeweldes: JewelObj[] = [];// new List<JewelObj>();
        for (let y = 0; y < 9; y++) {
            if (_y != y) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0)
                    celleffect.push(GribManager.cell.GribCellObj[x][y]);
                if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGrib[x][y]);
            }
        }
        for (let i in celleffect) {
            let item: CellObj = celleffect[i];
            item.RemoveEffect();
        }
        for (let i in jeweldes) {
            let item: JewelObj = jeweldes[i];
            item.Destroy();
        }
    }

    public PBoom(x: number, y: number): void {
        this.dropjewel();
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i != x || j != y)
                    if (i >= 0 && i < 7 && j >= 0 && j < 9 && JewelSpawner.spawn.JewelGrib[i][j] != null && JewelSpawner.spawn.JewelGrib[i][j].jewel.JewelType != 99)
                        JewelSpawner.spawn.JewelGrib[i][j].Destroy();
            }
        }
    }

    public PDestroyType(type: number, pos: Vector2): void {
        this.DestroyType(type, pos);///StartCoroutine(DestroyType(type, pos));
    }

    private DestroyType(type: number, pos: Vector2) {  //IEnumerator
        this.NoSelect.visible = true;// NoSelect.SetActive(true);
        this.dropjewel();
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                let tmp: JewelObj = JewelSpawner.spawn.JewelGrib[x][y];
                if (tmp != null && tmp.jewel.JewelType == type) {
                    EffectSpawner.effect.MGE(pos, JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelPosition);
                    tmp.Destroy();
                }

            }
        }
        // yield return new WaitForSeconds(0.2f);
        this.NoSelect.visible = false;// NoSelect.SetActive(false);
    }

    // 为本局游戏追加时间
    public PBonusTime(): void {
        this.TimeInc(); //StartCoroutine(TimeInc());
    }

    public DestroyRandom(): void {
        debug("随机销毁一个宝石！");
        //uu tien destroy ganh
        // this.dropjewel();
        // if (PlayerInfo.MODE == 1) {
        //     if (!this.isStar) {
        //         let listeff: CellObj[] = this.getListCellEffect();

        //         if (listeff.length > 0) {
        //             let tmp: CellObj = listeff[Utils.random(0, listeff.length - 1)];
        //             tmp.RemoveEffect();
        //             //TODO
        //             // EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.cell.CellPosition.x, tmp.cell.CellPosition.y].position);
        //         }
        //         else {
        //             this.destroynotempty();
        //         }
        //     }
        //     else {
        //         let vtmp: Vector2 = this.posUnderStar();
        //         let tmp: JewelObj = JewelSpawner.spawn.JewelGrib[vtmp.x][vtmp.y];
        //         if (tmp != null && tmp != this.JewelStar) {
        //             tmp.Destroy();
        //             //TODO
        //             // EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.jewel.JewelPosition.x][tmp.jewel.JewelPosition.y].position);
        //         }
        //     }
        // }
    }
    private getListCellEffect(): CellObj[] {
        let tmp: CellObj[] = [];
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0) {
                    tmp.push(GribManager.cell.GribCellObj[x][y]);
                }
            }
        }
        return tmp;
    }
    private getListNotEmpty(): CellObj[] {
        let tmp: CellObj[] = [];
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellType > 1) {
                    if (JewelSpawner.spawn.JewelGrib[x][y] != null) {
                        tmp.push(GribManager.cell.GribCellObj[x][y]);
                    }
                }
            }
        }
        return tmp;
    }

    private posUnderStar(): Vector2 {
        let under: Vector2[] = [];
        let x = this.JewelStar.jewel.JewelPosition.x;
        let y = this.JewelStar.jewel.JewelPosition.y;
        for (let i = 0; i < y; i++) {
            if (JewelSpawner.spawn.JewelGrib[x][i] != null) {
                under.push(JewelSpawner.spawn.JewelGrib[x][i].jewel.JewelPosition);
            }
        }
        if (under.length > 0) {
            return under[Utils.random(0, under.length - 1)];
        }
        else {
            return new Vector2(x, y);
        }
    }
    private destroynotempty(): void {
        // try
        // {
        let listnotempty: CellObj[] = this.getListNotEmpty();
        if (listnotempty.length > 0) {
            let tmp: Vector2 = listnotempty[Utils.random(0, listnotempty.length - 1)].cell.CellPosition;
            if (JewelSpawner.spawn.JewelGrib[tmp.x][tmp.y] != null) {
                JewelSpawner.spawn.JewelGrib[tmp.x][tmp.y].Destroy();
                debug("随机销毁宝石：(%d,%d)", tmp.x, tmp.y);
                //TODO
                // EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.x][tmp.y].position);
            }
        }
        // }
        // catch
        // {
        // }
    }

    //增加时间
    private TimeInc() {
        let dem = 0;
        let t = 22;
        while (t > 0) {
            dem++;
            Timer.timer.GameTime += 1;
            if (Timer.timer.GameTime >= 270) {
                Timer.timer.GameTime = 270;
                break;
            }
            t -= 1;
            // yield return null;
            if (dem >= 270) break;

        }
    }

    // 随机在一个宝石身上产生一个技能特效
    public AddBonusPower(): void {
        let dem = 0;
        while (true) {
            dem++;
            if (dem >= 63)
                return;
            let x = Utils.random(0, 6);// (0, 7);
            let y = Utils.random(0, 8);// (0, 9);
            let tmp: JewelObj = JewelSpawner.spawn.JewelGrib[x][y];
            if (tmp != null && tmp.jewel.JewelType != 8 && tmp.jewel.JewelPower == 0 && GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0) {
                //随机1种技能
                let r = Utils.random(2, 4);
                tmp.jewel.JewelPower = r;
                EffectSpawner.effect.ThunderRow(JewelSpawner.spawn.JewelGrib[x][y], r);
                return;
            }
        }
    }

    public ShowStar(): void {
        let listpos: Vector2[] = [];
        let pos: Vector2;
        for (let y = 9 - 1; y >= 0; y--) {
            for (let x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null) {
                    listpos.push(new Vector2(x, y));
                }
            }
            if (listpos.length > 0) {
                break;
            }
        }
        pos = listpos[Utils.random(0, listpos.length - 1)];
        JewelSpawner.spawn.SpawnStar(pos);
        SoundController.Sound.StarIn();
    }

    public WinChecker(): void {
        let Min = 0;
        for (let y = 0; y < 9; y++) {
            if (GribManager.cell.GribCellObj[this.JewelStar.jewel.JewelPosition.x][y] != null) {
                Min = y;
                break;
            }
        }

        if (this.JewelStar.jewel.JewelPosition.y == Min) {
            Timer.timer.Win();
            this.Destroy(this.JewelStar);//.gameObject);
        }
    }

    private EnableSelector(tx: number, ty: number): void {
        this.Selector.x = tx;
        this.Selector.y = ty;
        this.Selector.visible = true;
    }

    public Destroy(obj: GameObject): void {
        //TODO
        debug("销毁:", obj);
    }


}