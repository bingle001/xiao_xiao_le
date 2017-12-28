var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Power;
(function (Power) {
    Power[Power["BOOM"] = 1] = "BOOM";
    Power[Power["ROW_LIGHTING"] = 2] = "ROW_LIGHTING";
    Power[Power["COLLUMN_LIGHTING"] = 3] = "COLLUMN_LIGHTING";
    Power[Power["MAGIC"] = 8] = "MAGIC";
    Power[Power["TIME"] = 4] = "TIME";
})(Power || (Power = {}));
// 控制器游戏对象 组件
var GameController = (function () {
    function GameController() {
    }
    GameController.Awake = function () {
        GameController.action = new GameController();
    };
    GameController.prototype.Start = function () {
        if (PLayerInfo.MODE == 1)
            GribManager.cell.GribMapCreate(PLayerInfo.MapPlayer.Name); //StartCoroutine
        else
            GribManager.cell.GribMapCreate("classic"); //StartCoroutine
        // yield return new WaitForSeconds(1.5f);
        EffectSpawner.effect.ComboTick(); //StartCoroutine();
        Timer.timer.TimeTick(true);
        this.GameState = GameState.PLAYING;
        this.NoSelect.visible = false; // NoSelect.SetActive(false);
    };
    GameController.prototype.Update = function () {
        this.JewelSelecter();
        this.backpress();
    };
    //process click action
    GameController.prototype.JewelSelecter = function () {
        if (Input.GetMouseButtonDown(0)) {
            this.ishold = true;
            if (this.Pointer == null) {
                this.Pointer = this.JewelTouchChecker(Input.mousePosition);
            }
            Supporter.sp.StopSuggestionAnim();
            if (this.Pointer != null && this.Pointer.name.indexOf("Jewel") == -1) {
                this.Pointer = null;
            }
        }
        else if (Input.GetMouseButton(0) && this.ishold) {
            if (this.Pointer != null) {
                this.EnableSelector(this.Pointer.position); // Pointer.transform.position);
                this.Selected = this.JewelTouchChecker(Input.mousePosition);
                if (this.Selected != null && this.Pointer != this.Selected && this.Selected.name.indexOf("Jewel") != -1) {
                    if (this.DistanceChecker(this.Pointer, this.Selected)) {
                        this.RuleChecker(this.Pointer, this.Selected);
                        this.Pointer = null;
                        this.Selected = null;
                        this.Selector.visible = true; // Selector.SetActive(false);
                    }
                    else {
                        this.Pointer = this.Selected;
                        this.Selected = null;
                        this.EnableSelector(this.Pointer.position); //.transform.position);
                    }
                }
            }
        }
        else if (Input.GetMouseButtonUp(0)) {
            this.ishold = false;
        }
    };
    //check distance between 2 object
    GameController.prototype.DistanceChecker = function (obj1, obj2) {
        var v1 = obj1.jewel.JewelPosition; // obj1.GetComponent<JewelObj>().jewel.JewelPosition;
        var v2 = obj2.jewel.JewelPosition; // obj2.GetComponent<JewelObj>().jewel.JewelPosition;
        if (Vector2.Distance(v1, v2) <= 1) {
            return true;
        }
        return false;
    };
    //check logic game
    GameController.prototype.RuleChecker = function (obj1, obj2) {
        var Jewel1 = obj1; // obj1.GetComponent<JewelObj>();
        var Jewel2 = obj2; // obj2.GetComponent<JewelObj>();
        Debug.Log("Pointer:" + Jewel1.jewel.JewelPosition.x + "," + Jewel1.jewel.JewelPosition.y);
        Debug.Log("Selected:" + Jewel2.jewel.JewelPosition.x + "," + Jewel2.jewel.JewelPosition.y);
        var NeiObj1 = Ulti.ListPlus(Jewel1.GetCollumn(Jewel2.jewel.JewelPosition, Jewel1.jewel.JewelType, null), Jewel1.GetRow(Jewel2.jewel.JewelPosition, Jewel1.jewel.JewelType, null), Jewel1);
        var NeiObj2 = Ulti.ListPlus(Jewel2.GetCollumn(Jewel1.jewel.JewelPosition, Jewel2.jewel.JewelType, null), Jewel2.GetRow(Jewel1.jewel.JewelPosition, Jewel2.jewel.JewelType, null), Jewel2);
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
    };
    GameController.prototype.backpress = function () {
        //TODO  暂停游戏
        // if (Input.GetKeyDown(KeyCode.Escape) && GameState == Timer.GameState.PLAYING)
        // {
        //     Timer.timer.Pause();
        // }
        // else if (Input.GetKeyDown(KeyCode.Escape) && GameState == Timer.GameState.PAUSE)
        // {
        //     Timer.timer.Resume();
        // }
    };
    GameController.prototype.JewelProcess = function (list1, list2, obj1, obj2) {
        var c1 = list1.length;
        var c2 = list2.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj2, obj1, obj1.jewel.JewelType);
        }
        else if (obj1.jewel.JewelType == 8) {
            obj2.Destroy(); //obj2.GetComponent<JewelObj>().Destroy();
            this.PDestroyType(obj2.jewel.JewelType, obj2.position);
            obj1.Destroy(); //obj1.GetComponent<JewelObj>().Destroy();
        }
        if (c2 > 2) {
            this.ListProcess(list2, obj1, obj2, obj2.jewel.JewelType);
        }
        else if (obj2.jewel.JewelType == 8) {
            obj1.Destroy(); // obj1.GetComponent<JewelObj>().Destroy();
            this.PDestroyType(obj1.jewel.JewelType, obj1.position);
            obj2.Destroy(); // obj2.GetComponent<JewelObj>().Destroy();
        }
    };
    GameController.prototype.JewelProcess2 = function (list1, obj1) {
        var c1 = list1.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj1, null, obj1.jewel.JewelType);
        }
    };
    GameController.prototype.ListProcess = function (list, obj, obj1, type) {
        var v;
        if (obj1 != null) {
            this.JewelScript = obj1; // .GetComponent<JewelObj>();
            v = new Vector3(this.JewelScript.jewel.JewelPosition.x, this.JewelScript.jewel.JewelPosition.y);
        }
        else {
            this.JewelScript = obj; // .GetComponent<JewelObj>();
            v = new Vector3(this.JewelScript.jewel.JewelPosition.x, this.JewelScript.jewel.JewelPosition.y);
        }
        var c = list.length;
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
    };
    // 开启滑落检测
    GameController.prototype.dropjewel = function () {
        this.drop.DELAY = GameController.DROP_DELAY;
        // this.drop.enabled = true;
    };
    GameController.prototype.DestroyJewel = function (list) {
        SoundController.Sound.JewelCrash();
        EffectSpawner.effect.glass();
        for (var i in list) {
            var item = list[i];
            Debug.TraceNowJewelObj(item);
            item.Destroy();
        }
    };
    GameController.prototype.ReGroup = function (list, type, power, pos) {
        SoundController.Sound.JewelCrash();
        EffectSpawner.effect.glass();
        for (var i in list) {
            var item = list[i];
            item.ReGroup(pos);
        }
        this.SpawnJewelPower(type, power, pos); //StartCoroutine(SpawnJewelPower(type, power, pos));
    };
    GameController.prototype.JewelTouchChecker = function (mouseposition) {
        var wp = mouseposition; // Camera.main.ScreenToWorldPoint(mouseposition);
        var touchPos = new Vector2(wp.x, wp.y);
        // if (Physics2D.OverlapPoint(touchPos))
        // {
        //     return Physics2D.OverlapPoint(touchPos).gameObject;
        // }
        //TODO 应该是判断碰撞到哪个gameobject
        return null;
    };
    //swap map jewel position
    GameController.prototype.SwapJewelPosition = function (jewel1, jewel2) {
        var tmp1 = jewel1; // .GetComponent<JewelObj>();
        var tmp2 = jewel2; // .GetComponent<JewelObj>();
        //交互宝时对象在Map中的位置
        var tmp = tmp1.jewel.JewelPosition;
        tmp1.jewel.JewelPosition = tmp2.jewel.JewelPosition;
        tmp2.jewel.JewelPosition = tmp;
        //交换对象
        var Objtmp = JewelSpawner.spawn.JewelGrib[tmp1.jewel.JewelPosition.x][tmp1.jewel.JewelPosition.y];
        JewelSpawner.spawn.JewelGrib[tmp1.jewel.JewelPosition.x][tmp1.jewel.JewelPosition.y] = jewel2;
        JewelSpawner.spawn.JewelGrib[tmp2.jewel.JewelPosition.x][tmp2.jewel.JewelPosition.y] = Objtmp;
        //交换脚本
        var scripttmp = tmp1;
        JewelSpawner.spawn.JewelGribScript[tmp2.jewel.JewelPosition.x][tmp2.jewel.JewelPosition.y] = tmp2;
        JewelSpawner.spawn.JewelGribScript[tmp1.jewel.JewelPosition.x][tmp1.jewel.JewelPosition.y] = scripttmp;
        if (tmp1.jewel.JewelType == 99 || tmp2.jewel.JewelType == 99)
            this.WinChecker();
    };
    GameController.prototype.SpawnJewelPower = function (type, power, pos) {
        // yield return new WaitForSeconds(0.4f);
        var tmp = JewelSpawner.spawn.SpawnJewelPower(type, power, pos);
        // yield return new WaitForSeconds(0.2f);
        // tmp.GetComponent<Collider2D>().enabled = true;
    };
    /// 播放格子除动画特效
    GameController.prototype.CellRemoveEffect = function (x, y) {
        if (x - 1 >= 0 && GribManager.cell.GribCellObj[x - 1][y] != null)
            GribManager.cell.GribCellObj[x - 1][y].RemoveEffect();
        if (x + 1 < 7 && GribManager.cell.GribCellObj[x + 1][y] != null)
            GribManager.cell.GribCellObj[x + 1][y].RemoveEffect();
        if (y - 1 >= 0 && GribManager.cell.GribCellObj[x][y - 1] != null)
            GribManager.cell.GribCellObj[x][y - 1].RemoveEffect();
        if (y + 1 < 9 && GribManager.cell.GribCellObj[x][y + 1] != null)
            GribManager.cell.GribCellObj[x][y + 1].RemoveEffect();
    };
    /// 销毁一行
    GameController.prototype.PDestroyRow = function (_x, y) {
        this.dropjewel();
        SoundController.Sound.Fire();
        var celleffect = []; // new List<CellObj>();
        var jeweldes = []; // new List<JewelObj>();
        for (var x = 0; x < 7; x++) {
            if (_x != x) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0)
                    celleffect.push(GribManager.cell.GribCellObj[x][y]);
                if (JewelSpawner.spawn.JewelGribScript[x][y] != null && JewelSpawner.spawn.JewelGribScript[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGribScript[x][y]);
            }
        }
        for (var i in celleffect) {
            var item = celleffect[i];
            item.RemoveEffect();
        }
        for (var i in jeweldes) {
            var item = jeweldes[i];
            item.Destroy();
        }
    };
    /// 销毁一列
    GameController.prototype.PDestroyCollumn = function (x, _y) {
        this.dropjewel();
        SoundController.Sound.Fire();
        var celleffect = []; // new List<CellObj>();
        var jeweldes = []; // new List<JewelObj>();
        for (var y = 0; y < 9; y++) {
            if (_y != y) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0)
                    celleffect.push(GribManager.cell.GribCellObj[x][y]);
                if (JewelSpawner.spawn.JewelGribScript[x][y] != null && JewelSpawner.spawn.JewelGribScript[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGribScript[x][y]);
            }
        }
        for (var i in celleffect) {
            var item = celleffect[i];
            item.RemoveEffect();
        }
        for (var i in jeweldes) {
            var item = jeweldes[i];
            item.Destroy();
        }
    };
    GameController.prototype.PBoom = function (x, y) {
        this.dropjewel();
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                if (i != x || j != y)
                    if (i >= 0 && i < 7 && j >= 0 && j < 9 && JewelSpawner.spawn.JewelGribScript[i][j] != null && JewelSpawner.spawn.JewelGribScript[i][j].jewel.JewelType != 99)
                        JewelSpawner.spawn.JewelGribScript[i][j].Destroy();
            }
        }
    };
    GameController.prototype.PDestroyType = function (type, pos) {
        this.DestroyType(type, pos); ////StartCoroutine(DestroyType(type, pos));
    };
    GameController.prototype.DestroyType = function (type, pos) {
        this.NoSelect.visible = true; // NoSelect.SetActive(true);
        this.dropjewel();
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                var tmp = JewelSpawner.spawn.JewelGribScript[x][y];
                if (tmp != null && tmp.jewel.JewelType == type) {
                    EffectSpawner.effect.MGE(pos, JewelSpawner.spawn.JewelGrib[x][y].position);
                    tmp.Destroy();
                }
            }
        }
        // yield return new WaitForSeconds(0.2f);
        this.NoSelect.visible = false; // NoSelect.SetActive(false);
    };
    /// 为本局游戏追加时间
    GameController.prototype.PBonusTime = function () {
        this.TimeInc(); //StartCoroutine(TimeInc());
    };
    GameController.prototype.DestroyRandom = function () {
        //uu tien destroy ganh
        this.dropjewel();
        if (PLayerInfo.MODE == 1) {
            if (!this.isStar) {
                var listeff = this.getListCellEffect();
                if (listeff.length > 0) {
                    var tmp = listeff[Utils.random(0, listeff.length)];
                    tmp.RemoveEffect();
                    EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.cell.CellPosition.x, tmp.cell.CellPosition.y].position);
                }
                else {
                    this.destroynotempty();
                }
            }
            else {
                var vtmp = this.posUnderStar();
                var tmp = JewelSpawner.spawn.JewelGribScript[vtmp.x][vtmp.y];
                if (tmp != null && tmp != this.JewelStar) {
                    tmp.Destroy();
                    EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.jewel.JewelPosition.x][tmp.jewel.JewelPosition.y].position);
                }
            }
        }
    };
    GameController.prototype.getListCellEffect = function () {
        var tmp = []; // new List<CellObj>();
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0) {
                    tmp.push(GribManager.cell.GribCellObj[x][y]);
                }
            }
        }
        return tmp;
    };
    GameController.prototype.getListNotEmpty = function () {
        var tmp = []; // new List<CellObj>();
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellType > 1) {
                    if (JewelSpawner.spawn.JewelGribScript[x][y] != null)
                        tmp.push(GribManager.cell.GribCellObj[x][y]);
                }
            }
        }
        return tmp;
    };
    GameController.prototype.posUnderStar = function () {
        var under = []; // new List<Vector2>();
        var x = this.JewelStar.jewel.JewelPosition.x;
        var y = this.JewelStar.jewel.JewelPosition.y;
        for (var i = 0; i < y; i++) {
            if (JewelSpawner.spawn.JewelGribScript[x][i] != null)
                under.push(JewelSpawner.spawn.JewelGribScript[x][i].jewel.JewelPosition);
        }
        if (under.length > 0)
            return under[Utils.random(0, under.length)];
        else
            return new Vector2(x, y);
    };
    GameController.prototype.destroynotempty = function () {
        // try
        // {
        var listnotempty = this.getListNotEmpty();
        if (listnotempty.length > 0) {
            var tmp = listnotempty[Utils.random(0, listnotempty.length)].cell.CellPosition;
            if (JewelSpawner.spawn.JewelGribScript[tmp.x][tmp.y] != null) {
                JewelSpawner.spawn.JewelGribScript[tmp.x][tmp.y].Destroy();
                EffectSpawner.effect.Thunder(GribManager.cell.GribCell[tmp.x][tmp.y].position);
            }
        }
        // }
        // catch
        // {
        // }
    };
    //增加时间
    GameController.prototype.TimeInc = function () {
        var dem = 0;
        var t = 22;
        while (t > 0) {
            dem++;
            Timer.timer.GameTime += 1;
            if (Timer.timer.GameTime >= 270) {
                Timer.timer.GameTime = 270;
                break;
            }
            t -= 1;
            // yield return null;
            if (dem >= 270)
                break;
        }
    };
    /// 随机在一个宝石身上产生一个技能特效
    GameController.prototype.AddBonusPower = function () {
        var dem = 0;
        while (true) {
            dem++;
            if (dem >= 63)
                return;
            var x = Utils.random(0, 7);
            var y = Utils.random(0, 9);
            var tmp = JewelSpawner.spawn.JewelGribScript[x][y];
            if (tmp != null && tmp.jewel.JewelType != 8 && tmp.jewel.JewelPower == 0 && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0) {
                //随机1种技能
                var r = Utils.random(2, 4);
                tmp.jewel.JewelPower = r;
                EffectSpawner.effect.ThunderRow(JewelSpawner.spawn.JewelGrib[x][y], r);
                return;
            }
        }
    };
    GameController.prototype.ShowStar = function () {
        var listpos = []; // new List<Vector2>();
        var pos;
        for (var y = 9 - 1; y >= 0; y--) {
            for (var x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null)
                    listpos.push(new Vector2(x, y));
            }
            if (listpos.length > 0)
                break;
        }
        pos = listpos[Utils.random(0, listpos.length)];
        JewelSpawner.spawn.SpawnStar(pos);
        SoundController.Sound.StarIn();
    };
    GameController.prototype.WinChecker = function () {
        var Min = 0;
        for (var y = 0; y < 9; y++) {
            if (GribManager.cell.GribCellObj[this.JewelStar.jewel.JewelPosition.x][y] != null) {
                Min = y;
                break;
            }
        }
        if (this.JewelStar.jewel.JewelPosition.y == Min) {
            Timer.timer.Win();
            this.Destroy(this.JewelStar); //.gameObject);
        }
    };
    GameController.prototype.EnableSelector = function (pos) {
        // Selector.transform.position = pos;
        this.Selector.x = pos.x;
        this.Selector.y = pos.y;
        this.Selector.visible = true; // Selector.SetActive(true);
    };
    GameController.prototype.Destroy = function (obj) {
        //TODO
        debug("销毁:", obj);
    };
    GameController.DROP_SPEED = 8;
    GameController.DROP_DELAY = 0.5;
    return GameController;
}());
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map