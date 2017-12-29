var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 此组件被挂载到PlayScene中的Screen中
// 职责:负责生成宝石对象
var JewelSpawner = (function () {
    function JewelSpawner() {
        this.BaseDistance = 100; //应该是100，实际的大小 //?? 1;
        this.prespawnlist = []; // = new List<GameObject>[7];
    }
    JewelSpawner.Awake = function () {
        JewelSpawner.spawn = new JewelSpawner();
        for (var i = 0; i < 7; i++) {
            JewelSpawner.spawn.prespawnlist[i] = new Array(); // new List<GameObject>();
        }
        //素材
        JewelSpawner.spawn.JewelSprite = [];
        for (var i = 0; i < 7; i++) {
            JewelSpawner.spawn.JewelSprite[i] = ResUtils.getJewel(i + 1);
        }
    };
    // 初始化地图数据(创建地图上的宝石)
    JewelSpawner.prototype.JewelMapCreate = function (map) {
        this.JewelGrib = Utils.initVector2(GameObject, 7, 9); // new GameObject[7, 9];
        this.JewelGribScript = Utils.initVector2(JewelObj, 7, 9); // new JewelObj[7, 9];
        for (var x = 0; x < 7; x++) {
            var s = 0;
            for (var y = 0; y < 9; y++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4)
                    s = y;
            }
            for (var y = s; y < 9; y++) {
                if (map[x][y] > 0) {
                    this.RJewelInstantiate(x, y);
                }
            }
        }
        while (!Supporter.sp.isNoMoreMove()) {
            this.RemakeGrib();
            this.JewelMapCreate(map);
        }
    };
    JewelSpawner.prototype.Destroy = function (obj) {
        //TODO
        debug("TODO -- JewelSpawner.Destroy : ", obj);
    };
    JewelSpawner.prototype.RemakeGrib = function () {
        for (var x = 0; x < 7; x++)
            for (var y = 0; y < 9; y++)
                if (this.JewelGrib[x][y] != null && this.JewelGribScript[x][y] != GameController.action.JewelStar) {
                    this.Destroy(this.JewelGrib[x][y]);
                    this.JewelGribScript[x][y] = null;
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
                    if (GribManager.cell.mapData[x][y] > 0 && this.JewelGribScript[x][y] == null) {
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
                if (this.JewelGribScript[x][y] != null && this.JewelGribScript[x][y] != GameController.action.JewelStar)
                    this.JewelGribScript[x][y].JewelEnable();
            }
        }
    };
    //实例化
    JewelSpawner.prototype.JewelInstantiate = function (x, y) {
        // ObjTmp = (GameObject)Instantiate(JewelObject);
        // JewelScript = ObjTmp.GetComponent<JewelObj>();
        // ObjTmp.transform.SetParent(JewelParent.transform, false);
        // ObjTmp.transform.localPosition = new Vector3(ObjTmp.transform.localPosition.x + x * BaseDistance, ObjTmp.transform.localPosition.y + y * BaseDistance);
        // JewelGrib[x, y] = ObjTmp;
        // JewelGribScript[x, y] = JewelScript;
        // int r = 0;
        // if (PLayerInfo.MODE == 1)
        //     r = Random.Range(0, 6);
        // else
        //     r = Random.Range(0, 7);
        // JewelScript.render.sprite = JewelSprite[r];
        // JewelScript.jewel.JewelPosition = new Vector2(x, y);
        // JewelScript.jewel.JewelType = r;
        // return ObjTmp;
        var ObjTmp = new JewelObj();
        ObjTmp.x = x * this.BaseDistance;
        ObjTmp.y = y * this.BaseDistance;
        this.JewelGrib[x][y] = ObjTmp;
        this.JewelGribScript[x][y] = ObjTmp;
        this.JewelParent.addChild(ObjTmp);
        var r = 0;
        if (PLayerInfo.MODE == 1) {
            r = Utils.random(0, 6);
        }
        else {
            r = Utils.random(0, 7);
        }
        ObjTmp.render.source = this.JewelSprite[r];
        ObjTmp.jewel.JewelPosition = new Vector2(x, y);
        ObjTmp.jewel.JewelType = r;
        return ObjTmp;
    };
    JewelSpawner.prototype.JewelInstantiatebt = function (x, y) {
        // JewelObject tmp = (GameObject)Instantiate(JewelObject);
        // JewelScript = tmp.GetComponent<JewelObj>();
        // tmp.transform.SetParent(JewelParent.transform, false);
        // JewelScript.render.enabled = true;
        // JewelGrib[x, y] = ObjTmp;
        // JewelGribScript[x, y] = JewelScript;
        // int r = 0;
        // if (PLayerInfo.MODE == 1)
        //     r = Random.Range(0, 6);
        // else
        //     r = Random.Range(0, 7);
        // JewelScript.render.sprite = JewelSprite[r];
        // JewelScript.jewel.JewelPosition = new Vector2(x, 9);
        // JewelScript.jewel.JewelType = r;
        // JewelScript.jewel.JewelPower = 0;
        // return tmp;
        var tmp = new JewelObj();
        this.JewelParent.addChild(tmp);
        this.JewelGrib[x][y] = this.ObjTmp; //??这个真的是这样的吗，实际运行得查查！！ tmp;
        this.JewelGribScript[x][y] = tmp;
        var r = 0;
        if (PLayerInfo.MODE == 1) {
            r = Random.Range(0, 6);
        }
        else {
            r = Random.Range(0, 7);
        }
        tmp.render.source = this.JewelSprite[r];
        tmp.jewel.JewelPosition = new Vector2(x, 9);
        tmp.jewel.JewelType = r;
        tmp.jewel.JewelPower = 0;
        return tmp;
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
    // 创建宝石
    JewelSpawner.prototype.RJewelInstantiate = function (x, y) {
        // ObjTmp = (GameObject)Instantiate(JewelObject);
        // JewelScript = ObjTmp.GetComponent<JewelObj>();
        // ObjTmp.transform.SetParent(JewelParent.transform, false);
        // ObjTmp.transform.localPosition = new Vector3(x, y);
        // ObjTmp.transform.GetChild(0).gameObject.transform.localScale = new Vector3(0, 0, 1);
        // JewelGrib[x, y] = ObjTmp;
        // JewelGribScript[x, y] = JewelScript;
        // int r = randomjewel(x, y);
        // JewelScript.render.sprite = JewelSprite[r];
        // JewelScript.jewel.JewelPosition = new Vector2(x, y);
        // JewelScript.jewel.JewelType = r;
        var ObjTmp = new JewelObj();
        this.ObjTmp = ObjTmp;
        this.JewelScript = ObjTmp;
        ObjTmp.x = x * this.BaseDistance;
        ObjTmp.y = y * this.BaseDistance;
        this.JewelParent.addChild(ObjTmp);
        this.JewelGrib[x][y] = ObjTmp;
        this.JewelGribScript[x][y] = ObjTmp;
        var r = this.randomjewel(x, y);
        ObjTmp.render.source = this.JewelSprite[r];
        ObjTmp.jewel.JewelPosition = new Vector2(x, y);
        ObjTmp.jewel.JewelType = r;
        //应该是出现是从小到大旋转出现用的
        ObjTmp.scaleX = 0;
        ObjTmp.scaleY = 0;
        return ObjTmp;
    };
    JewelSpawner.prototype.randomjewel = function (x, y) {
        var r = -1;
        var dem = 0;
        while (true) {
            if (PLayerInfo.MODE == 1)
                r = Random.Range(0, 6);
            else
                r = Random.Range(0, 7);
            if (x < 2 || this.JewelGribScript[x - 1][y] == null || this.JewelGribScript[x - 2][y] == null || r != this.JewelGribScript[x - 1][y].jewel.JewelType || r != this.JewelGribScript[x - 2][y].jewel.JewelType) {
                if (y < 2 || this.JewelGribScript[x][y - 1] == null || this.JewelGribScript[x][y - 2] == null || this.JewelGribScript[x][y - 1].jewel.JewelType != r || this.JewelGribScript[x][y - 2].jewel.JewelType != r) {
                    return r;
                }
            }
            dem++;
            if (dem > 100)
                return 0;
        }
    };
    JewelSpawner.prototype.remakeGrib = function () {
        this.NoSelect.visible = true; // NoSelect.SetActive(true);
        // yield return new WaitForSeconds(1f);
    };
    JewelSpawner.prototype.SpawnJewelPower = function (type, power, pos) {
        var tmp;
        var x = pos.x;
        var y = pos.y;
        if (this.JewelGrib[x][y] != null)
            this.Destroy(this.JewelGrib[x][y]);
        if (type == 8) {
            tmp = new JewelObj(); // (GameObject)Instantiate(JewelColor);
        }
        else {
            tmp = new JewelObj(); // (GameObject)Instantiate(JewelObject);
        }
        // JewelScript = tmp.GetComponent<JewelObj>();
        // JewelScript.render.enabled = true;
        // tmp.transform.SetParent(JewelParent.transform, false);
        // tmp.transform.localPosition = new Vector3(x, y, pos.z);
        // JewelGrib[x, y] = tmp;
        // JewelGribScript[x, y] = JewelScript;
        // if (type != 8)
        //     JewelScript.render.sprite = JewelSprite[type];
        // JewelScript.jewel.JewelPosition = new Vector2(x, y);
        // JewelScript.jewel.JewelType = type;
        // JewelScript.jewel.JewelPower = power;
        // tmp.GetComponent<Collider2D>().enabled = false;
        // if (power == GameController.Power.BOOM){
        //     EffectSpawner.effect.Enchant(tmp.transform.GetChild(0).gameObject);
        // }
        this.JewelScript = tmp;
        this.JewelParent.addChild(tmp);
        tmp.x = x * this.BaseDistance;
        tmp.y = y * this.BaseDistance;
        this.JewelGrib[x][y] = tmp;
        this.JewelGribScript[x][y] = tmp;
        if (type != 8) {
            this.JewelScript.render.source = this.JewelSprite[type];
        }
        this.JewelScript.jewel.JewelPosition = new Vector2(x, y);
        this.JewelScript.jewel.JewelType = type;
        this.JewelScript.jewel.JewelPower = power;
        if (power == Power.BOOM) {
            EffectSpawner.effect.Enchant(tmp);
        }
        return tmp;
    };
    // 显示星星位置（直接将星星消除到底部后则会显示通关获得几星评价）
    JewelSpawner.prototype.SpawnStar = function (pos) {
        if (this.JewelGribScript[pos.x][pos.y] != null)
            this.Destroy(this.JewelGrib[pos.x][pos.y]);
        var tmp = this.Star; // (GameObject)Instantiate(Star);
        tmp.name = "JewelStar";
        // tmp.transform.SetParent(JewelParent.transform, false);
        // tmp.transform.localPosition = new Vector3(pos.x, pos.y);
        // tmp.transform.GetChild(0).gameObject.SetActive(false);
        // JewelScript = tmp.GetComponent<JewelObj>();
        // JewelScript.jewel.JewelPosition = pos;
        // JewelGribScript[pos.x, pos.y] = JewelScript;
        // JewelGrib[pos.x, pos.y] = tmp;
        // GameController.action.JewelStar = JewelScript;
        // StarEffect.SetActive(true);
        this.JewelParent.addChild(tmp);
        tmp.x = pos.x * this.BaseDistance;
        tmp.y = pos.y * this.BaseDistance;
        tmp.visible = true;
        this.JewelScript = tmp;
        this.JewelScript.jewel.JewelPosition = pos;
        this.JewelGribScript[pos.x][pos.y] = tmp;
        this.JewelGrib[pos.x][pos.y] = tmp;
        GameController.action.JewelStar = tmp;
        this.StarEffect.visible = true;
        //TODO 播放星星特效
    };
    return JewelSpawner;
}());
__reflect(JewelSpawner.prototype, "JewelSpawner");
//# sourceMappingURL=JewelSpawner.js.map