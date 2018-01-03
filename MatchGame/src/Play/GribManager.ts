// 格子管理器
// 职责:产生各种特效
class GribManager {

    public static cell: GribManager;
    public CellSprite: string[]; //Sprite[]

    public GribCell: Cell[][];
    public GribCellObj: CellObj[][];
    public GribParent: egret.DisplayObjectContainer;

    public border: eui.Image[]; //线
    public BorderParent: egret.DisplayObjectContainer;
    public corner: eui.Image[]; //角
    public CornerParent: egret.DisplayObjectContainer;

    public mapName: string;
    public mapData: number[][]; //当前关卡数据

    public static Awake(): void {
        let cell = new GribManager();
        GribManager.cell = cell;

        //初始化素材路径
        cell.CellSprite = [];
        cell.CellSprite[0] = "cell_tranf_png";
        cell.CellSprite[1] = "cell_gray_png";
        cell.CellSprite[2] = "cell_blue_png";
        cell.CellSprite[3] = "cell_red_png";

        // cell.CellSprite[4] = "cell_red_png";    //4,5是有特效的，但最低还是最高级图片
        // cell.CellSprite[5] = "cell_red_png";
    }

    // Create Grid map
    public GribMapCreate(mapName: string, cellParent: egret.DisplayObjectContainer, borderParent: egret.DisplayObjectContainer, cornerParent: egret.DisplayObjectContainer): void {
        mapName = "7";  //test
        this.mapName = mapName;
        this.GribParent = cellParent;
        this.BorderParent = borderParent;
        this.CornerParent = cornerParent;

        this.GribCell = Utils.initVector2(Cell, 7, 9);// new GameObject[7, 9];
        this.mapData = this.MapReader(mapName);
        this.GribCreate(this.mapData);
        this.BorderCreate(this.mapData);
        this.EffectCrash(this.mapData);
        JewelSpawner.spawn.JewelMapCreate(this.mapData);
        JewelSpawner.spawn.EnableAllJewel();
    }

    public test(map: number): void{
        this.GribParent.removeChildren();
        this.BorderParent.removeChildren();
        this.CornerParent.removeChildren();
        this.GribCell = Utils.initVector2(Cell, 7, 9);// new GameObject[7, 9];
        this.mapData = this.MapReader(map.toString());
        this.GribCreate(this.mapData);
        this.BorderCreate(this.mapData);
        JewelSpawner.spawn.JewelMapCreate(this.mapData);
        JewelSpawner.spawn.EnableAllJewel();
    }

    private GribCreate(map: number[][]): void {
        GameController.action.CellNotEmpty = 0;
        this.GribCellObj = Utils.initVector2(CellObj, 7, 9);// new CellObj[7, 9];
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 9; y++) {
                if (map[x][y] > 1) {
                    GameController.action.CellNotEmpty++;
                }

                if (map[x][y] > 0) {
                    this.CellInstantiate(x, y, map[x][y]);
                }
                else {
                    this.GribCell[x][y] = null;
                    this.GribCellObj[x][y] = null;
                }
            }
        }
    }

    // 根据地图批量创建销毁动画显示对象，并缓存到JewelCrashArray
    private EffectCrash(map: number[][]): void {
        //TODO 为何这里要创建宝石的销毁动画？？？
        // for (let x = 0; x < 7; x++) {
        //     for (let y = 0; y < 9; y++) {
        //         if (map[x][y] > 0)
        //             EffectSpawner.effect.JewelCrashArray[x][y] = EffectSpawner.effect.JewelCash(new Vector3(x, y));
        //     }
        // }
    }

    private CellInstantiate(x: number, y: number, type: number): void {
        let tmp = new CellObj();
        tmp.CellCode = type;
        tmp.cell = this.SetCell(type, x, y);
        tmp.SetSprite(tmp.cell.CellType - 1);
        this.GribCell[x][y] = tmp.cell;
        this.GribCellObj[x][y] = tmp;
        tmp.x = x * Global.BaseDistance;
        tmp.y = (8 - y) * Global.BaseDistance;
        this.GribParent.addChild(tmp);
        // tmp.debug(x, y);
    }

    private MapReader(mapName: string): number[][]
    {
        let tmp: number[][] = Utils.initVector2(Number, 7, 9);
        let _data = RES.getRes("_data_json");
        let mapStringdata: string = _data[mapName];
        debug("读取文件：");
        debug(mapStringdata);
        let pattern = new RegExp("\\t|\\n|\\t\\n");
        let stringresult: string[] = mapStringdata.split(pattern);
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
                let cell = this.GribCellObj[x][y];
                if (i > 0) {
                    this.borderins(cell, this.left(x, y), this.right(x, y), this.top(x, y), this.bot(x, y));
                    this.CornerOutChecker(cell, this.topleft(x, y), this.topright(x, y), this.botleft(x, y), this.botright(x, y), x, y);
                }
                else {
                    this.boderInChecker(map, x, y);
                }
            }
        }
    }

    private left(x: number, y: number): boolean {
        if (x == 0)
            return true;
        else if (x - 1 >= 0 && this.mapData[x - 1][y] == 0)
            return true;

        return false;
    }

    private right(x: number, y: number): boolean {
        if (x == 6)
            return true;
        else if (x + 1 <= 6 && this.mapData[x + 1][y] == 0)
            return true;

        return false;
    }

    private bot(x: number, y: number): boolean {
        if (y == 0)
            return true;
        else if (x < 7 && y - 1 >= 0 && this.mapData[x][y - 1] == 0)
            return true;

        return false;
    }

    private top(x: number, y: number): boolean {
        if (y == 8)
            return true;
        else if (y + 1 <= 8 && this.mapData[x][y + 1] == 0)
            return true;

        return false;
    }

    private topleft(x: number, y: number): boolean {
        if (x - 1 < 0 || y + 1 > 8)
            return true;
        else if (x - 1 >= 0 && y + 1 <= 8 && this.mapData[x - 1][y + 1] == 0)
            return true;

        return false;
    }

    private topright(x: number, y: number): boolean {
        if (x + 1 > 6 || y + 1 > 8)
            return true;
        else if (x + 1 <= 6 && y + 1 <= 8 && this.mapData[x + 1][y + 1] == 0)
            return true;

        return false;
    }

    private botleft(x: number, y: number): boolean {
        if (x - 1 < 0 || y - 1 < 0)
            return true;
        else if (x - 1 >= 0 && y - 1 >= 0 && this.mapData[x - 1][y - 1] == 0)
            return true;

        return false;
    }

    private botright(x: number, y: number): boolean {
        if (x + 1 > 6 || y - 1 < 0)
            return true;
        else if (x + 1 <= 6 && y - 1 >= 0 && this.mapData[x + 1][y - 1] == 0)
            return true;

        return false;
    }

    //应该是线，上下左右4个方向
    private borderins(cell: GameObject, left: boolean, right: boolean, top: boolean, bot: boolean): void {
        let tw: number = 100;
        let th: number = 10;

        if (left) {
            this.addBorderLineImage(90, cell.x, cell.y);
        }
        if (right) {
            this.addBorderLineImage(90, cell.x + tw + th, cell.y);
        }
        if (bot) {
            this.addBorderLineImage(0, cell.x, cell.y + tw);
        }
        if (top) {
            this.addBorderLineImage(0, cell.x, cell.y - th);
        }
    }

    private addBorderLineImage(rotation: number, tx: number, ty: number): void {    //线
        let img: eui.Image = new eui.Image();
        img.source = "vien_png";
        img.x = tx;
        img.y = ty;
        img.rotation = rotation;
        this.BorderParent.addChild(img);
    }

    private addBorderCornerImage(rotation: number, tx: number, ty: number): void {   //角
        let img: eui.Image = new eui.Image();
        img.source = "goc-b_png";
        img.x = tx;
        img.y = ty;
        img.rotation = rotation;
        this.CornerParent.addChild(img);
    }

    private addBorderCornerInsideImage(rotation: number, tx: number, ty: number): void {   //内角
        let img: eui.Image = new eui.Image();
        img.source = "goc-a_png";
        img.x = tx;
        img.y = ty;
        img.rotation = rotation;
        this.CornerParent.addChild(img);
    }

    // 外角
    private CornerOutChecker(cell: GameObject, topleft: boolean, topright: boolean, botleft: boolean, botright: boolean, x: number, y: number): void {
        let base: number = 100;
        let gap: number = 24;
        let th: number = 10;
        let _top: boolean = this.top(x, y);
        let _bot: boolean = this.bot(x, y);
        let _left: boolean = this.left(x, y);
        let _right: boolean = this.right(x, y);

        if (topleft && _top && _left) {
            this.addBorderCornerImage(0, cell.x - 10, cell.y - 10);
        }
        if (topright && _top && _right) {
            this.addBorderCornerImage(90, cell.x + base + 10, cell.y - 10);
        }
        if (botleft && _bot && _left) {
            this.addBorderCornerImage(270, cell.x - 10, cell.y + base + 10);
        }
        if (botright && _bot && _right) {
            this.addBorderCornerImage(180, cell.x + base + 10, cell.y + base + 10);
        }
    }

    //应该是检测内角
    private boderInChecker(map: number[][], x: number, y: number): void {
        let base: number = 100;
        let tx: number = x * Global.BaseDistance;
        let ty: number = (8 - y) * Global.BaseDistance;
        if (x - 1 >= 0 && y - 1 >= 0 && map[x - 1][y] > 0 && map[x][y - 1] > 0) {
            this.addBorderCornerInsideImage(270, tx, ty + base);
        }
        if (x - 1 >= 0 && y + 1 < 9 && map[x - 1][y] > 0 && map[x][y + 1] > 0) {
            this.addBorderCornerInsideImage(0, tx, ty);
        }
        if (x + 1 < 7 && y - 1 >= 0 && map[x + 1][y] > 0 && map[x][y - 1] > 0) {
            this.addBorderCornerInsideImage(180, tx + base, ty + base);
        }
        if (x + 1 < 7 && y + 1 < 9 && map[x + 1][y] > 0 && map[x][y + 1] > 0) {
            this.addBorderCornerInsideImage(90, tx + base, ty);
        }
    }
    

    private CornerOutCheckTop(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = y + 1; i < 9; i++) {
            if (this.GribCellObj[x][i] != null)
                return false;
        }
        return true;
    }

    private CornerOutCheckBot(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = y - 1; i >= 0; i--) {
            if (this.GribCellObj[x][i] != null)
                return false;
        }
        return true;
    }
    private CornerOutCheckRight(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = x + 1; i < 7; i++) {
            if (this.GribCellObj[i][y] != null)
                return false;
        }
        return true;
    }
    private CornerOutCheckLeft(parent: GameObject): boolean {
        let obj: CellObj = parent as CellObj;
        let x: number = obj.cell.CellPosition.x;
        let y: number = obj.cell.CellPosition.y;
        for (let i = x - 1; i >= 0; i--) {
            if (this.GribCellObj[i][y] != null)
                return false;
        }
        return true;
    }



}