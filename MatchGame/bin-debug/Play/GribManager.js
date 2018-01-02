var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 格子管理器
// 职责:产生各种特效
var GribManager = (function () {
    function GribManager() {
    }
    GribManager.Awake = function () {
        var cell = new GribManager();
        GribManager.cell = cell;
        //初始化素材路径
        cell.CellSprite = [];
        cell.CellSprite[0] = "cell_tranf_png";
        cell.CellSprite[1] = "cell_gray_png";
        cell.CellSprite[2] = "cell_blue_png";
        cell.CellSprite[3] = "cell_red_png";
        // cell.CellSprite[4] = "cell_red_png";    //4,5是有特效的，但最低还是最高级图片
        // cell.CellSprite[5] = "cell_red_png";
    };
    // Create Grid map
    GribManager.prototype.GribMapCreate = function (mapName, cellParent, borderParent, cornerParent) {
        mapName = "7"; //test
        this.mapName = mapName;
        this.GribParent = cellParent;
        this.BorderParent = borderParent;
        this.CornerParent = cornerParent;
        this.GribCell = Utils.initVector2(Cell, 7, 9); // new GameObject[7, 9];
        this.mapData = this.MapReader(mapName);
        this.GribCreate(this.mapData);
        this.BorderCreate(this.mapData);
        this.EffectCrash(this.mapData);
        // JewelSpawner.spawn.JewelMapCreate(this.mapData);
        // JewelSpawner.spawn.EnableAllJewel();
    };
    GribManager.prototype.test = function (map) {
        this.GribParent.removeChildren();
        this.BorderParent.removeChildren();
        this.CornerParent.removeChildren();
        this.GribCell = Utils.initVector2(Cell, 7, 9); // new GameObject[7, 9];
        this.mapData = this.MapReader(map.toString());
        this.GribCreate(this.mapData);
        this.BorderCreate(this.mapData);
    };
    GribManager.prototype.GribCreate = function (map) {
        GameController.action.CellNotEmpty = 0;
        this.GribCellObj = Utils.initVector2(CellObj, 7, 9); // new CellObj[7, 9];
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (map[x][y] > 1) {
                    GameController.action.CellNotEmpty++;
                }
                if (map[x][y] > 0) {
                    this.CellInstantiate(x, y, map[x][y]);
                }
            }
        }
    };
    // 根据地图批量创建销毁动画显示对象，并缓存到JewelCrashArray
    GribManager.prototype.EffectCrash = function (map) {
        //TODO 为何这里要创建宝石的销毁动画？？？
        // for (let x = 0; x < 7; x++) {
        //     for (let y = 0; y < 9; y++) {
        //         if (map[x][y] > 0)
        //             EffectSpawner.effect.JewelCrashArray[x][y] = EffectSpawner.effect.JewelCash(new Vector3(x, y));
        //     }
        // }
    };
    GribManager.prototype.CellInstantiate = function (x, y, type) {
        var tmp = new CellObj();
        tmp.CellCode = type;
        tmp.cell = this.SetCell(type, x, y);
        tmp.SetSprite(tmp.cell.CellType - 1);
        this.GribCell[x][y] = tmp.cell;
        this.GribCellObj[x][y] = tmp;
        tmp.x = x * Global.BaseDistance;
        tmp.y = (8 - y) * Global.BaseDistance;
        this.GribParent.addChild(tmp);
        // tmp.debug(x, y);
    };
    GribManager.prototype.MapReader = function (mapName) {
        var tmp = Utils.initVector2(Number, 7, 9);
        var _data = RES.getRes("_data_json");
        var mapStringdata = _data[mapName];
        debug("读取文件：");
        debug(mapStringdata);
        var pattern = new RegExp("\\t|\\n|\\t\\n");
        var stringresult = mapStringdata.split(pattern);
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
                var cell = this.GribCellObj[x][y];
                if (i > 0) {
                    this.borderins(cell, this.left(x, y), this.right(x, y), this.top(x, y), this.bot(x, y));
                    this.CornerOutChecker(cell, this.topleft(x, y), this.topright(x, y), this.botleft(x, y), this.botright(x, y), x, y);
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
        else if (x - 1 >= 0 && this.mapData[x - 1][y] == 0)
            return true;
        return false;
    };
    GribManager.prototype.right = function (x, y) {
        if (x == 6)
            return true;
        else if (x + 1 <= 6 && this.mapData[x + 1][y] == 0)
            return true;
        return false;
    };
    GribManager.prototype.bot = function (x, y) {
        if (y == 0)
            return true;
        else if (x < 7 && y - 1 >= 0 && this.mapData[x][y - 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.top = function (x, y) {
        if (y == 8)
            return true;
        else if (y + 1 <= 8 && this.mapData[x][y + 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.topleft = function (x, y) {
        if (x - 1 < 0 || y + 1 > 8)
            return true;
        else if (x - 1 >= 0 && y + 1 <= 8 && this.mapData[x - 1][y + 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.topright = function (x, y) {
        if (x + 1 > 6 || y + 1 > 8)
            return true;
        else if (x + 1 <= 6 && y + 1 <= 8 && this.mapData[x + 1][y + 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.botleft = function (x, y) {
        if (x - 1 < 0 || y - 1 < 0)
            return true;
        else if (x - 1 >= 0 && y - 1 >= 0 && this.mapData[x - 1][y - 1] == 0)
            return true;
        return false;
    };
    GribManager.prototype.botright = function (x, y) {
        if (x + 1 > 6 || y - 1 < 0)
            return true;
        else if (x + 1 <= 6 && y - 1 >= 0 && this.mapData[x + 1][y - 1] == 0)
            return true;
        return false;
    };
    //应该是线，上下左右4个方向
    GribManager.prototype.borderins = function (cell, left, right, top, bot) {
        var tw = 100;
        var th = 10;
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
    };
    GribManager.prototype.addBorderLineImage = function (rotation, tx, ty) {
        var img = new eui.Image();
        img.source = "vien_png";
        img.x = tx;
        img.y = ty;
        img.rotation = rotation;
        this.BorderParent.addChild(img);
    };
    GribManager.prototype.addBorderCornerImage = function (rotation, tx, ty) {
        var img = new eui.Image();
        img.source = "goc-b_png";
        img.x = tx;
        img.y = ty;
        img.rotation = rotation;
        this.CornerParent.addChild(img);
    };
    GribManager.prototype.addBorderCornerInsideImage = function (rotation, tx, ty) {
        var img = new eui.Image();
        img.source = "goc-a_png";
        img.x = tx;
        img.y = ty;
        img.rotation = rotation;
        this.CornerParent.addChild(img);
    };
    // 外角
    GribManager.prototype.CornerOutChecker = function (cell, topleft, topright, botleft, botright, x, y) {
        var base = 100;
        var gap = 24;
        var th = 10;
        var _top = this.top(x, y);
        var _bot = this.bot(x, y);
        var _left = this.left(x, y);
        var _right = this.right(x, y);
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
    };
    //应该是检测内角
    GribManager.prototype.boderInChecker = function (map, x, y) {
        var base = 100;
        var tx = x * Global.BaseDistance;
        var ty = (8 - y) * Global.BaseDistance;
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