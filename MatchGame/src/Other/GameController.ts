enum Power {
    BOOM = 1,               //爆炸
    ROW_LIGHTING = 2,       //消除行
    COLLUMN_LIGHTING = 3,   //消除列
    MAGIC = 8,
    TIME = 4,               //追加时间
}

// 控制器游戏对象 组件
class GameController {

    public constructor() {
    }

    public static action: GameController;

    public static DROP_SPEED: number = 8;
    public static DROP_DELAY: number = 0.5;

    public GameState: number;

    public CellNotEmpty: number;

    public Selector: GameObject;

    public drop: SpawnController;

    public NoSelect: GameObject;

    public JewelStar: JewelObj;

    public isStar: boolean;

    public isShowStar: boolean;

    public isAddPower: boolean;

    public StartAnim: Animation;

    private JewelScript: JewelObj;
    private JewelScript1: JewelObj;

    private Pointer: GameObject;

    private Selected: GameObject;

    private ishold: boolean;

    public static Awake(): void {
        GameController.action = new GameController();
    }

    public Start() {
        EffectSpawner.effect.ComboTick();//StartCoroutine();
        Timer.timer.TimeTick(true);
        this.GameState = GameState.PLAYING;
        this.NoSelect.visible = false;// NoSelect.SetActive(false);
    }

    public Update(): void {
        this.JewelSelecter();
        this.backpress();
    }

    //process click action
    private JewelSelecter(): void {
        if (Input.GetMouseButtonDown(0)) {
            this.ishold = true;

            if (this.Pointer == null) {
                this.Pointer = this.JewelTouchChecker(Input.mousePosition);
            }

            Supporter.sp.StopSuggestionAnim();
            if (this.Pointer != null && this.Pointer.name.indexOf("Jewel") == -1) {  // !.Contains("Jewel"))
                this.Pointer = null;
            }
        }
        else if (Input.GetMouseButton(0) && this.ishold) {
            if (this.Pointer != null) {
                this.EnableSelector(this.Pointer.position);// Pointer.transform.position);
                this.Selected = this.JewelTouchChecker(Input.mousePosition);
                if (this.Selected != null && this.Pointer != this.Selected && this.Selected.name.indexOf("Jewel") != -1) { // .Contains("Jewel"))
                    if (this.DistanceChecker(this.Pointer, this.Selected)) {
                        this.RuleChecker(this.Pointer, this.Selected);
                        this.Pointer = null;
                        this.Selected = null;
                        this.Selector.visible = true;// Selector.SetActive(false);
                    }
                    else {
                        this.Pointer = this.Selected;
                        this.Selected = null;
                        this.EnableSelector(this.Pointer.position);//.transform.position);
                    }
                }
            }
        }
        else if (Input.GetMouseButtonUp(0)) {
            this.ishold = false;
        }
    }

    //check distance between 2 object
    private DistanceChecker(obj1: GameObject, obj2: GameObject): boolean {
        let v1: Vector2 = (obj1 as JewelObj).jewel.JewelPosition;// obj1.GetComponent<JewelObj>().jewel.JewelPosition;
        let v2: Vector2 = (obj2 as JewelObj).jewel.JewelPosition;// obj2.GetComponent<JewelObj>().jewel.JewelPosition;
        if (Vector2.Distance(v1, v2) <= 1) {
            return true;
        }

        return false;
    }
    //check logic game
    public RuleChecker(obj1: GameObject, obj2: GameObject): void {
        let Jewel1: JewelObj = obj1 as JewelObj;// obj1.GetComponent<JewelObj>();
        let Jewel2: JewelObj = obj2 as JewelObj;// obj2.GetComponent<JewelObj>();


        Debug.Log("Pointer:" + Jewel1.jewel.JewelPosition.x + "," + Jewel1.jewel.JewelPosition.y);
        Debug.Log("Selected:" + Jewel2.jewel.JewelPosition.x + "," + Jewel2.jewel.JewelPosition.y);

        let NeiObj1: JewelObj[] = Ulti.ListPlus(
            Jewel1.GetCollumn(Jewel2.jewel.JewelPosition, Jewel1.jewel.JewelType, null),
            Jewel1.GetRow(Jewel2.jewel.JewelPosition, Jewel1.jewel.JewelType, null),
            Jewel1);
        let NeiObj2: JewelObj[] = Ulti.ListPlus(Jewel2.GetCollumn(Jewel1.jewel.JewelPosition, Jewel2.jewel.JewelType, null),
            Jewel2.GetRow(Jewel1.jewel.JewelPosition, Jewel2.jewel.JewelType, null), Jewel2);



        if (Jewel1.jewel.JewelType == 99 || Jewel2.jewel.JewelType == 99)
            if (Jewel1.jewel.JewelType == 8 || Jewel2.jewel.JewelType == 8) {
                Jewel1.SetBackAnimation(obj2);
                Jewel2.SetBackAnimation(obj1);
                return;
            }

        if (NeiObj1.length >= 3 || NeiObj2.length >= 3 || Jewel1.jewel.JewelType == 8 || Jewel2.jewel.JewelType == 8) {

            Ulti.MoveTo(obj1, obj2.localPosition, 0.2);
            Ulti.MoveTo(obj2, obj1.localPosition, 0.2);

            this.SwapJewelPosition(obj1, obj2);
            this.JewelProcess(NeiObj1, NeiObj2, obj1, obj2);
        }
        else {
            Jewel1.SetBackAnimation(obj2);
            Jewel2.SetBackAnimation(obj1);
        }
    }

    private backpress(): void {
        //TODO  暂停游戏

        // if (Input.GetKeyDown(KeyCode.Escape) && GameState == Timer.GameState.PLAYING)
        // {
        //     Timer.timer.Pause();
        // }
        // else if (Input.GetKeyDown(KeyCode.Escape) && GameState == Timer.GameState.PAUSE)
        // {
        //     Timer.timer.Resume();
        // }
    }
    private JewelProcess(list1: JewelObj[], list2: JewelObj[], obj1: GameObject, obj2: GameObject): void {
        let c1 = list1.length;
        let c2 = list2.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj2, obj1, (obj1 as JewelObj).jewel.JewelType);
        }
        else if ((obj1 as JewelObj).jewel.JewelType == 8)   // obj1.GetComponent<JewelObj>().jewel.JewelType == 8)
        {
            (obj2 as JewelObj).Destroy(); //obj2.GetComponent<JewelObj>().Destroy();
            this.PDestroyType((obj2 as JewelObj).jewel.JewelType, obj2.position);
            (obj1 as JewelObj).Destroy(); //obj1.GetComponent<JewelObj>().Destroy();
        }

        if (c2 > 2) {
            this.ListProcess(list2, obj1, obj2, (obj2 as JewelObj).jewel.JewelType);
        }
        else if ((obj2 as JewelObj).jewel.JewelType == 8) {
            (obj1 as JewelObj).Destroy();// obj1.GetComponent<JewelObj>().Destroy();
            this.PDestroyType((obj1 as JewelObj).jewel.JewelType, obj1.position);
            (obj2 as JewelObj).Destroy();// obj2.GetComponent<JewelObj>().Destroy();
        }

    }
    public JewelProcess2(list1: JewelObj[], obj1: GameObject): void {
        let c1 = list1.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj1, null, (obj1 as JewelObj).jewel.JewelType);
        }

    }

    private ListProcess(list: JewelObj[], obj: GameObject, obj1: GameObject, type: number): boolean {
        let v: Vector3;
        if (obj1 != null) {
            this.JewelScript = obj1 as JewelObj;// .GetComponent<JewelObj>();
            v = new Vector3(this.JewelScript.jewel.JewelPosition.x, this.JewelScript.jewel.JewelPosition.y);
        }
        else {
            this.JewelScript = obj as JewelObj;// .GetComponent<JewelObj>();
            v = new Vector3(this.JewelScript.jewel.JewelPosition.x, this.JewelScript.jewel.JewelPosition.y);
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
        this.drop.DELAY = GameController.DROP_DELAY;
        // this.drop.enabled = true;
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

    private JewelTouchChecker(mouseposition: Vector3): GameObject {
        let wp: Vector3 = mouseposition;// Camera.main.ScreenToWorldPoint(mouseposition);
        let touchPos: Vector2 = new Vector2(wp.x, wp.y);
        // if (Physics2D.OverlapPoint(touchPos))
        // {
        //     return Physics2D.OverlapPoint(touchPos).gameObject;
        // }
        //TODO 应该是判断碰撞到哪个gameobject
        return null;
    }

    //swap map jewel position
    private SwapJewelPosition(jewel1: GameObject, jewel2: GameObject): void {
        let tmp1: JewelObj = jewel1 as JewelObj;// .GetComponent<JewelObj>();
        let tmp2: JewelObj = jewel2 as JewelObj;// .GetComponent<JewelObj>();

        //交互宝时对象在Map中的位置
        let tmp: Vector2 = tmp1.jewel.JewelPosition;
        tmp1.jewel.JewelPosition = tmp2.jewel.JewelPosition;
        tmp2.jewel.JewelPosition = tmp;

        //交换对象
        let Objtmp: GameObject = JewelSpawner.spawn.JewelGrib[tmp1.jewel.JewelPosition.x][tmp1.jewel.JewelPosition.y];
        JewelSpawner.spawn.JewelGrib[tmp1.jewel.JewelPosition.x][tmp1.jewel.JewelPosition.y] = jewel2;
        JewelSpawner.spawn.JewelGrib[tmp2.jewel.JewelPosition.x][tmp2.jewel.JewelPosition.y] = Objtmp;

        //交换脚本
        let scripttmp: JewelObj = tmp1;
        JewelSpawner.spawn.JewelGribScript[tmp2.jewel.JewelPosition.x][tmp2.jewel.JewelPosition.y] = tmp2;
        JewelSpawner.spawn.JewelGribScript[tmp1.jewel.JewelPosition.x][tmp1.jewel.JewelPosition.y] = scripttmp;
        if (tmp1.jewel.JewelType == 99 || tmp2.jewel.JewelType == 99)
            this.WinChecker();

    }

    private SpawnJewelPower(type: number, power: number, pos: Vector2)   //IEnumerator
    {

        // yield return new WaitForSeconds(0.4f);
        let tmp: GameObject = JewelSpawner.spawn.SpawnJewelPower(type, power, pos);
        // yield return new WaitForSeconds(0.2f);
        // tmp.GetComponent<Collider2D>().enabled = true;
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
                if (JewelSpawner.spawn.JewelGribScript[x][y] != null && JewelSpawner.spawn.JewelGribScript[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGribScript[x][y]);
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
                if (JewelSpawner.spawn.JewelGribScript[x][y] != null && JewelSpawner.spawn.JewelGribScript[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGribScript[x][y]);
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
                    if (i >= 0 && i < 7 && j >= 0 && j < 9 && JewelSpawner.spawn.JewelGribScript[i][j] != null && JewelSpawner.spawn.JewelGribScript[i][j].jewel.JewelType != 99)
                        JewelSpawner.spawn.JewelGribScript[i][j].Destroy();
            }
        }
    }

    public PDestroyType(type: number, pos: Vector3): void {
        this.DestroyType(type, pos);///StartCoroutine(DestroyType(type, pos));
    }

    private DestroyType(type: number, pos: Vector3)  //IEnumerator
    {
        this.NoSelect.visible = true;// NoSelect.SetActive(true);
        this.dropjewel();
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                let tmp: JewelObj = JewelSpawner.spawn.JewelGribScript[x][y];
                if (tmp != null && tmp.jewel.JewelType == type) {
                    EffectSpawner.effect.MGE(pos, JewelSpawner.spawn.JewelGrib[x][y].position);
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
        //uu tien destroy ganh
        this.dropjewel();
        if (PLayerInfo.MODE == 1) {
            if (!this.isStar) {
                let listeff: CellObj[] = this.getListCellEffect();

                if (listeff.length > 0) {
                    let tmp: CellObj = listeff[Utils.random(0, listeff.length)];
                    tmp.RemoveEffect();
                    //TODO
                    // EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.cell.CellPosition.x, tmp.cell.CellPosition.y].position);
                }
                else {
                    this.destroynotempty();
                }

            }
            else {
                let vtmp: Vector2 = this.posUnderStar();
                let tmp: JewelObj = JewelSpawner.spawn.JewelGribScript[vtmp.x][vtmp.y];
                if (tmp != null && tmp != this.JewelStar) {
                    tmp.Destroy();
                    //TODO
                    // EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.jewel.JewelPosition.x][tmp.jewel.JewelPosition.y].position);
                }
            }
        }
    }
    private getListCellEffect(): CellObj[] {
        let tmp: CellObj[] = [];// new List<CellObj>();
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
        let tmp: CellObj[] = [];// new List<CellObj>();
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellType > 1) {
                    if (JewelSpawner.spawn.JewelGribScript[x][y] != null)
                        tmp.push(GribManager.cell.GribCellObj[x][y]);
                }
            }
        }
        return tmp;
    }

    private posUnderStar(): Vector2 {
        let under: Vector2[] = [];// new List<Vector2>();
        let x = this.JewelStar.jewel.JewelPosition.x;
        let y = this.JewelStar.jewel.JewelPosition.y;
        for (let i = 0; i < y; i++) {
            if (JewelSpawner.spawn.JewelGribScript[x][i] != null)
                under.push(JewelSpawner.spawn.JewelGribScript[x][i].jewel.JewelPosition);
        }
        if (under.length > 0)
            return under[Utils.random(0, under.length)];
        else return new Vector2(x, y);
    }
    private destroynotempty(): void {
        // try
        // {
        let listnotempty: CellObj[] = this.getListNotEmpty();
        if (listnotempty.length > 0) {
            let tmp: Vector2 = listnotempty[Utils.random(0, listnotempty.length)].cell.CellPosition;
            if (JewelSpawner.spawn.JewelGribScript[tmp.x][tmp.y] != null) {
                JewelSpawner.spawn.JewelGribScript[tmp.x][tmp.y].Destroy();
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
    private TimeInc()   //IEnumerator
    {
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
            let x = Utils.random(0, 7);
            let y = Utils.random(0, 9);
            let tmp: JewelObj = JewelSpawner.spawn.JewelGribScript[x][y];
            if (tmp != null && tmp.jewel.JewelType != 8 && tmp.jewel.JewelPower == 0 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0) {
                //随机1种技能
                let r = Utils.random(2, 4);
                tmp.jewel.JewelPower = r;
                EffectSpawner.effect.ThunderRow(JewelSpawner.spawn.JewelGrib[x][y], r);
                return;
            }
        }
    }

    public ShowStar(): void {
        let listpos: Vector2[] = [];// new List<Vector2>();
        let pos: Vector2;
        for (let y = 9 - 1; y >= 0; y--) {
            for (let x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null)
                    listpos.push(new Vector2(x, y));
            }
            if (listpos.length > 0)
                break;
        }
        pos = listpos[Utils.random(0, listpos.length)];
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

    private EnableSelector(pos: Vector3): void {
        // Selector.transform.position = pos;
        this.Selector.x = pos.x;
        this.Selector.y = pos.y;
        this.Selector.visible = true;// Selector.SetActive(true);
    }

    public Destroy(obj: GameObject): void {
        //TODO
        debug("销毁:", obj);
    }


}