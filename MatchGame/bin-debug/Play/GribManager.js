var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 格子管理器 组件 （挂载到MainCamera游戏对象上）
// 职责:产生各种特效
var GribManager = (function () {
    function GribManager() {
        this.path = "resources/assets/map/";
    }
    GribManager.Awake = function () {
        GribManager.cell = new GribManager();
    };
    // Create Grid map
    GribManager.prototype.GribMapCreate = function (MapName) {
        this.GribCell = Utils.initVector2(GameObject, 7, 9); // new GameObject[7, 9];
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
    };
    GribManager.prototype.GribCreate = function (map) {
        GameController.action.CellNotEmpty = 0;
        this.GribCellObj = Utils.initVector2(CellObj, 7, 9); // new CellObj[7, 9];
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (map[x][y] > 1)
                    GameController.action.CellNotEmpty++;
                if (map[x][y] > 0)
                    this.CellInstantiate(x, y, map[x][y]);
                //！！！！下面这行代码多余的，会导制重复创建 JewelCash 缓存
                //EffectSpawner.effect.JewelCrashArray[x, y] = EffectSpawner.effect.JewelCash(new Vector3(x,y));
            }
        }
    };
    /// 根据地图批量创建销毁动画显示对象，并缓存到JewelCrashArray
    GribManager.prototype.EffectCrash = function (map) {
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (map[x][y] > 0)
                    EffectSpawner.effect.JewelCrashArray[x][y] = EffectSpawner.effect.JewelCash(new Vector3(x, y));
            }
        }
    };
    GribManager.prototype.CellInstantiate = function (x, y, type) {
        // ObjTmp = (GameObject)Instantiate(CellPrefab);
        // ObjTmp.transform.SetParent(GribParent.transform, false);
        // ObjTmp.transform.localPosition = new Vector3(x, y);
        // cellscript = ObjTmp.GetComponent<CellObj>();
        // cellscript.CellCode = type;
        // cellscript.cell = SetCell(type, x, y);
        // cellscript.SetSprite(cellscript.cell.CellType-1);
        // GribCell[x, y] = ObjTmp;
        // GribCellObj[x, y] = cellscript;
        var tmp = new CellObj();
        this.GribParent.addChild(tmp);
        tmp.x = x;
        tmp.y = y;
        tmp.CellCode = type;
        tmp.cell = this.SetCell(type, x, y);
        tmp.SetSprite(tmp.cell.CellType - 1);
        this.GribCell[x][y] = tmp.cell;
        this.GribCellObj[x][y] = tmp;
    };
    GribManager.prototype.MapReader = function (mapName) {
        var tmp = Utils.initVector2(Number, 7, 9); // new int[7, 9];
        var mapStringdata = RES.getRes(mapName + "_txt");
        debug("读取文件：", mapStringdata);
        var pattern = new RegExp("\\t|\\n|\\t\\n");
        var stringresult = mapStringdata.split(pattern); // Split(new char[] { '	', '\n' });
        debug("解析文件结果：", stringresult);
        var dem = 0;
        for (var y = 8; y >= 0; y--) {
            for (var x = 0; x < 7; x++) {
                tmp[x][y] = Number(stringresult[dem]);
                dem++;
            }
        }
        debug("最终地图数据：", tmp);
        return tmp;
    };
    GribManager.prototype.SetCell = function (type, x, y) {
        var script = new Cell();
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
    };
    GribManager.prototype.BorderCreate = function (map) {
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                var i = map[x][y];
                if (i > 0) {
                    this.borderins(this.GribCell[x][y], this.left(x, y), this.right(x, y), this.top(x, y), this.bot(x, y));
                    this.CornerOutChecker(this.GribCell[x][y], this.topleft(x, y), this.topright(x, y), this.botleft(x, y), this.botright(x, y), x, y);
                }
                else {
                    this.boderInChecker(map, x, y);
                }
            }
        }
    };
    GribManager.prototype.left = function (x, y) {
        if (x == 0)
            return true;
        else if (x - 1 >= 0 && this.Map[x - 1][y] == 0)
            return true;
        return false;
    };
    GribManager.prototype.right = function (x, y) {
        if (x == 6)
            return true;
        else if (x + 1 <= 6 && this.Map[x + 1][y] == 0)
            return true;
        return false;
    };
    GribManager.prototype.bot = function (x, y) {
        if (y == 0)
            return true;
        else if (x < 7 && y - 1 >= 0 && this.Map[x][y - 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.top = function (x, y) {
        if (y == 8)
            return true;
        else if (y + 1 <= 8 && this.Map[x][y + 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.topleft = function (x, y) {
        if (x - 1 < 0 || y + 1 > 8)
            return true;
        else if (x - 1 >= 0 && y + 1 <= 8 && this.Map[x - 1][y + 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.topright = function (x, y) {
        if (x + 1 > 6 || y + 1 > 8)
            return true;
        else if (x + 1 <= 6 && y + 1 <= 8 && this.Map[x + 1][y + 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.botleft = function (x, y) {
        if (x - 1 < 0 || y - 1 < 0)
            return true;
        else if (x - 1 >= 0 && y - 1 >= 0 && this.Map[x - 1][y - 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.botright = function (x, y) {
        if (x + 1 > 6 || y - 1 < 0)
            return true;
        else if (x + 1 <= 6 && y - 1 >= 0 && this.Map[x + 1][y - 1] == 0)
            return true;
        return false;
    };
    //应该是创建边缘
    GribManager.prototype.borderins = function (parent, left, right, top, bot) {
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
        var res = "goc-a_png";
        var sx = 1;
        var sy = 1;
        var tx = 0;
        var ty = 0;
        var cellW = 100;
        var cellH = 100;
        var borderW = 24; //边界图片的大小
        var borderH = 24;
        var gap = 100 - 24;
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
    };
    GribManager.prototype.addBorderinsImg = function (res, parent, sx, sy, tx, ty) {
        var img = new eui.Image();
        img.source = "goc-a_png";
        img.scaleX = sx;
        img.scaleY = sy;
        img.x = tx;
        img.y = ty;
        parent.addChild(img);
    };
    GribManager.prototype.CornerOutChecker = function (parent, topleft, topright, botleft, botright, x, y) {
        var _top = this.top(x, y);
        var _bot = this.bot(x, y);
        var _left = this.left(x, y);
        var _right = this.right(x, y);
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
    };
    GribManager.prototype.boderInChecker = function (map, x, y) {
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
    };
    GribManager.prototype.CornerOutCheckTop = function (parent) {
        var obj = parent; //parent.GetComponent<CellObj>();
        var x = obj.cell.CellPosition.x;
        var y = obj.cell.CellPosition.y;
        for (var i = y + 1; i < 9; i++) {
            if (this.GribCellObj[x][i] != null)
                return false;
        }
        return true;
    };
    GribManager.prototype.CornerOutCheckBot = function (parent) {
        var obj = parent; // parent.GetComponent<CellObj>();
        var x = obj.cell.CellPosition.x;
        var y = obj.cell.CellPosition.y;
        for (var i = y - 1; i >= 0; i--) {
            if (this.GribCellObj[x][i] != null)
                return false;
        }
        return true;
    };
    GribManager.prototype.CornerOutCheckRight = function (parent) {
        var obj = parent; // parent.GetComponent<CellObj>();
        var x = obj.cell.CellPosition.x;
        var y = obj.cell.CellPosition.y;
        for (var i = x + 1; i < 7; i++) {
            if (this.GribCellObj[i][y] != null)
                return false;
        }
        return true;
    };
    GribManager.prototype.CornerOutCheckLeft = function (parent) {
        var obj = parent; // parent.GetComponent<CellObj>();
        var x = obj.cell.CellPosition.x;
        var y = obj.cell.CellPosition.y;
        for (var i = x - 1; i >= 0; i--) {
            if (this.GribCellObj[i][y] != null)
                return false;
        }
        return true;
    };
    return GribManager;
}());
__reflect(GribManager.prototype, "GribManager");
//# sourceMappingURL=GribManager.js.map