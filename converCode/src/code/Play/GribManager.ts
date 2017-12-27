// 格子管理器 组件 （挂载到MainCamera游戏对象上）
// 职责:产生各种特效
class GribManager {

    public constructor() {
    }

    public static cell: GribManager;

    public GribCell: GameObject[];

    public GribCellObj: CellObj[][];

    public GribParent: GameObject;

    public CellPrefab: GameObject;

    public CellSprite: string[]; //Sprite[]

    public border: GameObject[];

    public corner: GameObject[];

    public BorderParent: GameObject;

    public Map: number[][];

    private ObjTmp: GameObject;

    private cellscript: CellObj;

    private path: string = "resources/assets/map/";

    public static Awake(): void {
        GribManager.cell = new GribManager();
    }

    // Create Grid map
    public GribMapCreate(MapName: string): void {  //IEnumerator
        this.GribCell = Utils.initVector2(GameObject, 7, 9);// new GameObject[7, 9];
        this.Map = this.MapReader(MapName);
        // yield return new WaitForEndOfFrame();        //这样写的好处是为了能跟上帧频,即每帧执行一块
        this.GribCreate(this.Map);
        // yield return new WaitForEndOfFrame();
        this.BorderCreate(this.Map);
        // yield return new WaitForEndOfFrame();
        this.EffectCrash(this.Map);
        // yield return new WaitForSeconds(1);
        JewelSpawner.spawn.JewelMapCreate(this.Map);
        // yield return new WaitForEndOfFrame();
        JewelSpawner.spawn.EnableAllJewel();
    }

    private GribCreate(map: number[][]): void {
        GameController.action.CellNotEmpty = 0;
        this.GribCellObj = Utils.initVector2(CellObj, 7, 9);// new CellObj[7, 9];
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                if (map[x][y] > 1)
                    GameController.action.CellNotEmpty++;
                if (map[x][y] > 0)
                    this.CellInstantiate(x, y, map[x][y]);
                //！！！！下面这行代码多余的，会导制重复创建 JewelCash 缓存
                //EffectSpawner.effect.JewelCrashArray[x, y] = EffectSpawner.effect.JewelCash(new Vector3(x,y));
            }
        }
    }

    /// 根据地图批量创建销毁动画显示对象，并缓存到JewelCrashArray
    private EffectCrash(map: number[][]): void {
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                if (map[x][y] > 0)
                    EffectSpawner.effect.JewelCrashArray[x][y] = EffectSpawner.effect.JewelCash(new Vector3(x, y));
            }
        }
    }

    private CellInstantiate(x: number, y: number, type: number): void {
        // ObjTmp = (GameObject)Instantiate(CellPrefab);
        // ObjTmp.transform.SetParent(GribParent.transform, false);
        // ObjTmp.transform.localPosition = new Vector3(x, y);
        // cellscript = ObjTmp.GetComponent<CellObj>();
        // cellscript.CellCode = type;
        // cellscript.cell = SetCell(type, x, y);
        // cellscript.SetSprite(cellscript.cell.CellType-1);
        // GribCell[x, y] = ObjTmp;
        // GribCellObj[x, y] = cellscript;

        let tmp = new CellObj();
        this.GribParent.addChild(tmp);
        tmp.x = x;
        tmp.y = y;
        tmp.CellCode = type;
        tmp.cell = this.SetCell(type, x, y);
        tmp.SetSprite(tmp.cell.CellType - 1);
        this.GribCell[x][y] = tmp.cell;
        this.GribCellObj[x][y] = tmp;
    }

    private MapReader(mapName: string): number[][]//int[,]
    {
        let tmp: number[][] = Utils.initVector2(Number, 7, 9);// new int[7, 9];
        let mapStringdata: string = RES.getRes(mapName + "_txt");
        debug("读取文件：", mapStringdata);
        let pattern = new RegExp("\\t|\\n|\\t\\n");
        let stringresult: string[] = mapStringdata.split(pattern);// Split(new char[] { '	', '\n' });
        debug("解析文件结果：", stringresult);
        let dem = 0;
        for (let y = 8; y >= 0; y--) {
            for (let x = 0; x < 7; x++) {
                tmp[x][y] = Number(stringresult[dem]);
                dem++;
            }
        }
        debug("最终地图数据：", tmp);
        return tmp;
    }

    private SetCell(type: number, x: number, y: number): Cell {
        let script: Cell = new Cell();
        if (type > 10) {
            script.CellType = type / 10;
            script.CellEffect = type % 10;
        }
        else {
            script.CellType = type % 100 % 10;
            script.CellEffect = 0;
        }
        script.CellPosition = new Vector2(x, y);
        return script;
    }

    private BorderCreate(map: number[][]): void {
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                let i = map[x][y];
                if (i > 0) {
                    this.borderins(this.GribCell[x][y], this.left(x, y), this.right(x, y), this.top(x, y), this.bot(x, y));
                    this.CornerOutChecker(this.GribCell[x][y], this.topleft(x, y), this.topright(x, y), this.botleft(x, y), this.botright(x, y), x, y);
                } else {
                    this.boderInChecker(map, x, y);
                }
            }
        }
    }

    private left(x: number, y: number): boolean {
        if (x == 0)
            return true;
        else if (x - 1 >= 0 && this.Map[x - 1][y] == 0)
            return true;

        return false;
    }

    private right(x: number, y: number): boolean {
        if (x == 6)
            return true;
        else if (x + 1 <= 6 && this.Map[x + 1][y] == 0)
            return true;

        return false;
    }

    private bot(x: number, y: number): boolean {
        if (y == 0)
            return true;
        else if (x < 7 && y - 1 >= 0 && this.Map[x][y - 1] == 0)
            return true;

        return false;
    }

    private top(x: number, y: number): boolean {
        if (y == 8)
            return true;
        else if (y + 1 <= 8 && this.Map[x][y + 1] == 0)
            return true;

        return false;
    }

    private topleft(x: number, y: number): boolean {
        if (x - 1 < 0 || y + 1 > 8)
            return true;
        else if (x - 1 >= 0 && y + 1 <= 8 && this.Map[x - 1][y + 1] == 0)
            return true;

        return false;
    }

    private topright(x: number, y: number): boolean {
        if (x + 1 > 6 || y + 1 > 8)
            return true;
        else if (x + 1 <= 6 && y + 1 <= 8 && this.Map[x + 1][y + 1] == 0)
            return true;

        return false;
    }

    private botleft(x: number, y: number): boolean {
        if (x - 1 < 0 || y - 1 < 0)
            return true;
        else if (x - 1 >= 0 && y - 1 >= 0 && this.Map[x - 1][y - 1] == 0)
            return true;

        return false;
    }

    private botright(x: number, y: number): boolean {
        if (x + 1 > 6 || y - 1 < 0)
            return true;
        else if (x + 1 <= 6 && y - 1 >= 0 && this.Map[x + 1][y - 1] == 0)
            return true;

        return false;
    }

    //应该是创建边缘
    private borderins(parent: GameObject, left: boolean, right: boolean, top: boolean, bot: boolean): void {
        // if (left)
        // {
        //         ObjTmp = (GameObject)Instantiate(this.border[2]);
        //         ObjTmp.transform.SetParent(this.BorderParent.transform, false);
        //         ObjTmp.transform.localPosition += parent.transform.localPosition;
        //      //   boderInChecker(parent);
        // }
        // if (right)
        // {

        //         ObjTmp = (GameObject)Instantiate(border[3]);
        //         ObjTmp.transform.SetParent(BorderParent.transform, false);
        //         ObjTmp.transform.localPosition += parent.transform.localPosition;
        //         //boderInChecker(parent);
        // }
        // if (top)
        // {

        //         ObjTmp = (GameObject)Instantiate(border[1]);
        //         ObjTmp.transform.SetParent(BorderParent.transform, false);
        //         ObjTmp.transform.localPosition += parent.transform.localPosition;
        // }
        // if (bot)
        // {

        //         ObjTmp = (GameObject)Instantiate(border[0]);
        //         ObjTmp.transform.SetParent(BorderParent.transform, false);
        //         ObjTmp.transform.localPosition += parent.transform.localPosition;
        // }

        let res: string = "goc-a_png";
        let sx: number = 1;
        let sy: number = 1;
        let tx: number = 0;
        let ty: number = 0;

        let cellW: number = 100;
        let cellH: number = 100;
        let borderW: number = 24;//边界图片的大小
        let borderH: number = 24;
        let gap: number = 100 - 24;

        if (left) {
            sx = 1;
            sy = 1;
            tx = 0;
            ty = 0;
            this.addBorderinsImg(res, parent, sx, sy, tx, ty);
        }
        if (right) {
            sx = -1;
            sy = 1;
            tx = gap;
            ty = 0;
            this.addBorderinsImg(res, parent, sx, sy, tx, ty);
        }

        if (top) {

        }

    }

    private addBorderinsImg(res: string, parent: GameObject, sx, sy, tx, ty): void {
        let img: eui.Image = new eui.Image();
        img.source = "goc-a_png";
        img.scaleX = sx;
        img.scaleY = sy;
        img.x = tx;
        img.y = ty;
        parent.addChild(img);
    }


    private CornerOutChecker(parent: GameObject, topleft: boolean, topright: boolean, botleft: boolean, botright: boolean, x: number, y: number): void {
        let _top: boolean = this.top(x, y);
        let _bot: boolean = this.bot(x, y);
        let _left: boolean = this.left(x, y);
        let _right: boolean = this.right(x, y);

        // if (topleft &&  _top && _left)
        // {
        //     ObjTmp = (GameObject)Instantiate(corner[0]);
        //     ObjTmp.transform.SetParent(BorderParent.transform, false);
        //     ObjTmp.transform.localPosition += parent.transform.localPosition;
        // }
        // if (topright && _top && _right)
        // {
        //     ObjTmp = (GameObject)Instantiate(corner[1]);
        //     ObjTmp.transform.SetParent(BorderParent.transform, false);
        //     ObjTmp.transform.localPosition += parent.transform.localPosition;
        // }
        // if (botleft && _bot && _left)
        // {
        //     ObjTmp = (GameObject)Instantiate(corner[2]);
        //     ObjTmp.transform.SetParent(BorderParent.transform, false);
        //     ObjTmp.transform.localPosition += parent.transform.localPosition;
        // }
        // if (botright && _bot && _right)
        // {
        //     ObjTmp = (GameObject)Instantiate(corner[3]);
        //     ObjTmp.transform.SetParent(BorderParent.transform, false);
        //     ObjTmp.transform.localPosition += parent.transform.localPosition;
        // }

    }

    private boderInChecker(map: number[][], x: number, y: number): void {
        if (x - 1 >= 0 && y - 1 >= 0 && map[x - 1][y] > 0 && map[x][y - 1] > 0) {

            // ObjTmp = (GameObject)Instantiate(corner[6]);
            // ObjTmp.transform.SetParent(BorderParent.transform, false);
            // ObjTmp.transform.localPosition += new Vector3(x-1, y-1);
        }
        if (x - 1 >= 0 && y + 1 < 9 && map[x - 1][y] > 0 && map[x][y + 1] > 0) {

            // ObjTmp = (GameObject)Instantiate(corner[4]);
            // ObjTmp.transform.SetParent(BorderParent.transform, false);
            // ObjTmp.transform.localPosition += new Vector3(x - 1 , y);
        }
        if (x + 1 < 7 && y - 1 >= 0 && map[x + 1][y] > 0 && map[x][y - 1] > 0) {

            // ObjTmp = (GameObject)Instantiate(corner[7]);
            // ObjTmp.transform.SetParent(BorderParent.transform, false);
            // ObjTmp.transform.localPosition += new Vector3(x, y - 1);
        }
        if (x + 1 < 7 && y + 1 < 9 && map[x + 1][y] > 0 && map[x][y + 1] > 0) {

            // ObjTmp = (GameObject)Instantiate(corner[5]);
            // ObjTmp.transform.SetParent(BorderParent.transform, false);
            // ObjTmp.transform.localPosition += new Vector3(x, y);
        }


    }

    private CornerOutCheckTop(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj; //parent.GetComponent<CellObj>();
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = y + 1; i < 9; i++) {
            if (this.GribCellObj[x][i] != null)
                return false;
        }
        return true;
    }

    private CornerOutCheckBot(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;// parent.GetComponent<CellObj>();
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = y - 1; i >= 0; i--) {
            if (this.GribCellObj[x][i] != null)
                return false;
        }
        return true;
    }
    private CornerOutCheckRight(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;// parent.GetComponent<CellObj>();
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = x + 1; i < 7; i++) {
            if (this.GribCellObj[i][y] != null)
                return false;
        }
        return true;
    }
    private CornerOutCheckLeft(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;// parent.GetComponent<CellObj>();
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = x - 1; i >= 0; i--) {
            if (this.GribCellObj[i][y] != null)
                return false;
        }
        return true;
    }



}