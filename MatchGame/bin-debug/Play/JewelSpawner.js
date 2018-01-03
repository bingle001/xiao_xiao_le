var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 此组件被挂载到PlayScene中的Screen中
// 职责:负责生成宝石对象
var JewelSpawner = (function () {
    function JewelSpawner() {
        this.prespawnlist = []; // = new List<GameObject>[7];
    }
    JewelSpawner.Awake = function () {
        JewelSpawner.spawn = new JewelSpawner();
        for (var i = 0; i < 7; i++) {
            JewelSpawner.spawn.prespawnlist[i] = new Array(); // new List<GameObject>();
        }
        //素材
        JewelSpawner.spawn.JewelSprite = [];
        for (var i = 1; i <= 8; i++) {
            JewelSpawner.spawn.JewelSprite[i] = ResUtils.getJewel(i);
        }
    };
    JewelSpawner.prototype.initJewelParent = function (group) {
        this.JewelParent = group;
    };
    // 初始化地图数据(创建地图上的宝石)
    JewelSpawner.prototype.JewelMapCreate = function (map) {
        // this.JewelGrib = Utils.initVector2(Jewel, 7, 9);
        this.JewelGrib = Utils.initVector2(JewelObj, 7, 9);
        this.JewelParent.removeChildren();
        for (var x = 0; x < 7; x++) {
            var s = 0;
            for (var y = 0; y < 9; y++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4) {
                    s = y;
                }
            }
            for (var y = s; y < 9; y++) {
                if (map[x][y] > 0) {
                    this.RJewelInstantiate(x, y);
                }
            }
        }
        // while (!Supporter.sp.isNoMoreMove()) {
        //     this.RemakeGrib();
        //     this.JewelMapCreate(map);
        // }
    };
    JewelSpawner.prototype.Destroy = function (obj) {
        //TODO
        debug("TODO -- JewelSpawner.Destroy : ", obj);
        if (obj) {
            obj.Destroy();
            // if (obj.parent) {
            // }
        }
    };
    JewelSpawner.prototype.RemakeGrib = function () {
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (this.JewelGrib[x][y] != null && this.JewelGrib[x][y].jewel != GameController.action.JewelStar.jewel) {
                    this.Destroy(this.JewelGrib[x][y]);
                    this.JewelGrib[x][y] = null;
                }
            }
        }
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < this.prespawnlist[i].length; j++) {
                if (this.prespawnlist[i][j] != null)
                    this.Destroy(this.prespawnlist[i][j]);
            }
            this.prespawnlist[i].length = 0;
            ; //this.prespawnlist[i].Clear();
        }
    };
    //应该是检测到没有可移动的了，全部重置
    JewelSpawner.prototype.Respawn = function () {
        while (!Supporter.sp.isNoMoreMove()) {
            this.RemakeGrib();
            for (var x = 0; x < 7; x++) {
                var s = 0;
                for (var y = 0; y < 9; y++) {
                    if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4)
                        s = y;
                }
                for (var y = s; y < 9; y++) {
                    if (GribManager.cell.mapData[x][y] > 0 && this.JewelGrib[x][y] == null) {
                        this.RJewelInstantiate(x, y);
                    }
                }
            }
        }
        this.EnableAllJewel();
        // yield return new WaitForSeconds(0.75f);
        Timer.timer.NoSelect.visible = false; //Timer.timer.NoSelect.SetActive(false);
        Timer.timer.Nomove.visible = false; // Timer.timer.Nomove.SetActive(false);
    };
    JewelSpawner.prototype.EnableAllJewel = function () {
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (this.JewelGrib[x][y] != null && this.JewelGrib[x][y] != GameController.action.JewelStar)
                    this.JewelGrib[x][y].JewelEnable();
            }
        }
    };
    //实例化
    JewelSpawner.prototype.JewelInstantiate = function (x, y) {
        var ObjTmp = new JewelObj();
        var r = 0;
        if (PlayerInfo.MODE == 1) {
            r = Utils.random(1, 6);
        }
        else {
            r = Utils.random(1, 7);
        }
        ObjTmp.render.source = this.JewelSprite[r];
        ObjTmp.jewel.JewelPosition = new Vector2(x, y);
        ObjTmp.jewel.JewelType = r;
        ObjTmp.jewel.JewelPower = 0;
        ObjTmp.x = x * Global.BaseDistance;
        ObjTmp.y = (8 - y) * Global.BaseDistance;
        this.JewelGrib[x][y] = ObjTmp;
        // this.JewelGrib[x][y] = ObjTmp.jewel;
        this.JewelParent.addChild(ObjTmp);
        return ObjTmp;
    };
    JewelSpawner.prototype.remakeJewel = function (obj, x) {
        var o = obj;
        //TODO 移除this.ObjTmp上移动动画
        // Animation anim = this.ObjTmp.GetComponent<Animation>();
        // if (anim.GetClipCount() > 0)
        //     anim.RemoveClip("Moveto");
        this.prespawnlist[x].splice(0, 1); //prespawnlist[x].RemoveAt(0);
        // o.transform.GetChild(0).transform.localPosition = Vector3.zero;
        // if (o.transform.GetChild(0).gameObject.transform.childCount > 0) {
        //     this.Destroy(o.transform.GetChild(0).gameObject.transform.GetChild(0).gameObject);
        // }
        //TODO
        o.x = 0;
        o.y = 0;
        this.Destroy(o); //???
        return o;
    };
    JewelSpawner.prototype.RJewelInstantiate = function (x, y) {
        var ObjTmp = this.JewelInstantiate(x, y);
        var r = this.randomjewel(x, y);
        ObjTmp.render.source = this.JewelSprite[r];
        ObjTmp.jewel.JewelType = r;
        ObjTmp.playAppearEffect(); //播放出现特效
        return ObjTmp;
    };
    JewelSpawner.prototype.randomjewel = function (x, y) {
        var r = -1;
        var dem = 0;
        while (true) {
            if (PlayerInfo.MODE == 1)
                r = Utils.random(1, 6);
            else
                r = Utils.random(1, 7);
            if (x < 2 || this.JewelGrib[x - 1][y] == null || this.JewelGrib[x - 2][y] == null || r != this.JewelGrib[x - 1][y].jewel.JewelType || r != this.JewelGrib[x - 2][y].jewel.JewelType) {
                if (y < 2 || this.JewelGrib[x][y - 1] == null || this.JewelGrib[x][y - 2] == null || this.JewelGrib[x][y - 1].jewel.JewelType != r || this.JewelGrib[x][y - 2].jewel.JewelType != r) {
                    return r;
                }
            }
            dem++;
            if (dem > 100) {
                return 0;
            }
        }
    };
    JewelSpawner.prototype.remakeGrib = function () {
        // this.NoSelect.visible = true;// NoSelect.SetActive(true);
        // // yield return new WaitForSeconds(1f);
    };
    JewelSpawner.prototype.SpawnJewelPower = function (type, power, pos) {
        var x = pos.x;
        var y = pos.y;
        if (this.JewelGrib[x][y] != null) {
            this.Destroy(this.JewelGrib[x][y]);
        }
        var tmp = new JewelObj();
        this.JewelParent.addChild(tmp);
        tmp.x = x * Global.BaseDistance;
        tmp.y = (8 - y) * Global.BaseDistance;
        this.JewelGrib[x][y] = tmp;
        // this.JewelGrib[x][y] = tmp.jewel;
        if (type != 8) {
            tmp.render.source = this.JewelSprite[type - 1];
        }
        tmp.jewel.JewelPosition = new Vector2(x, y);
        tmp.jewel.JewelType = type;
        tmp.jewel.JewelPower = power;
        if (power == Power.BOOM) {
            EffectSpawner.effect.Enchant(tmp);
        }
        return tmp;
    };
    // 显示星星位置（直接将星星消除到底部后则会显示通关获得几星评价）
    JewelSpawner.prototype.SpawnStar = function (pos) {
        var x = pos.x;
        var y = pos.y;
        if (this.JewelGrib[pos.x][pos.y] != null)
            this.Destroy(this.JewelGrib[pos.x][pos.y]);
        var tmp = this.Star; // (GameObject)Instantiate(Star);
        tmp.name = "JewelStar";
        this.JewelParent.addChild(tmp);
        tmp.x = x * Global.BaseDistance;
        tmp.y = (8 - y) * Global.BaseDistance;
        tmp.visible = true;
        tmp.jewel.JewelPosition = pos;
        this.JewelGrib[pos.x][pos.y] = tmp;
        // this.JewelGrib[pos.x][pos.y] = tmp.jewel;
        GameController.action.JewelStar = tmp;
        this.StarEffect.visible = true;
        //TODO 播放星星特效
    };
    return JewelSpawner;
}());
__reflect(JewelSpawner.prototype, "JewelSpawner");
//# sourceMappingURL=JewelSpawner.js.map