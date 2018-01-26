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
        GameController.action.drop = new SpawnController();
    };
    GameController.prototype.Start = function (selector, noSelector) {
        this.Selector = selector;
        this.Selector.visible = false;
        this.NoSelect = noSelector;
        this.NoSelect.visible = false;
        EffectSpawner.effect.ComboTick(); //StartCoroutine();
        this.GameState = GameState.PLAYING;
        Timer.timer.TimeTick(true);
        Time.addFrameCall(this.Update, this);
    };
    GameController.prototype.Update = function () {
        this.JewelSelecter();
    };
    GameController.prototype.JewelSelecter = function () {
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
    };
    //check distance between 2 object
    GameController.prototype.DistanceChecker = function (obj1, obj2) {
        var v1 = obj1.jewel.JewelPosition;
        var v2 = obj2.jewel.JewelPosition;
        if (Vector2.Distance(v1, v2) <= 1) {
            return true;
        }
        return false;
    };
    //check logic game
    GameController.prototype.RuleChecker = function (jewel1, jewel2) {
        Debug.Log("Pointer:" + jewel1.jewel.JewelPosition.x + "," + jewel1.jewel.JewelPosition.y);
        Debug.Log("Selected:" + jewel2.jewel.JewelPosition.x + "," + jewel2.jewel.JewelPosition.y);
        if (jewel1.jewel.JewelType == 99 || jewel2.jewel.JewelType == 99) {
            if (jewel1.jewel.JewelType == 8 || jewel2.jewel.JewelType == 8) {
                jewel1.SetBackAnimation(jewel2);
                jewel2.SetBackAnimation(jewel1);
                return;
            }
        }
        var NeiObj1 = Utils.ListPlus(jewel1.GetCollumn(jewel2.jewel.JewelPosition, jewel1.jewel.JewelType, null), jewel1.GetRow(jewel2.jewel.JewelPosition, jewel1.jewel.JewelType, null), jewel1);
        var NeiObj2 = Utils.ListPlus(jewel2.GetCollumn(jewel1.jewel.JewelPosition, jewel2.jewel.JewelType, null), jewel2.GetRow(jewel1.jewel.JewelPosition, jewel2.jewel.JewelType, null), jewel2);
        if (NeiObj1.length >= 3 || NeiObj2.length >= 3 || jewel1.jewel.JewelType == 8 || jewel2.jewel.JewelType == 8) {
            Utils.MoveTo(jewel1, jewel2.jewel.JewelPosition, 0.2);
            Utils.MoveTo(jewel2, jewel1.jewel.JewelPosition, 0.2);
            this.SwapJewelPosition(jewel1, jewel2);
            var self_1 = this;
            egret.setTimeout(function () {
                self_1.JewelProcess(NeiObj1, NeiObj2, jewel1, jewel2);
            }, this, 200);
        }
        else {
            jewel1.SetBackAnimation(jewel2);
            jewel2.SetBackAnimation(jewel1);
        }
    };
    GameController.prototype.JewelProcess = function (list1, list2, obj1, obj2) {
        var c1 = list1.length;
        var c2 = list2.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj2, obj1, obj1.jewel.JewelType);
        }
        else if (obj1.jewel.JewelType == 8) {
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
    };
    GameController.prototype.JewelProcess2 = function (list1, obj1) {
        var c1 = list1.length;
        if (c1 > 2) {
            this.ListProcess(list1, obj1, null, obj1.jewel.JewelType);
        }
    };
    GameController.prototype.ListProcess = function (list, obj, obj1, type) {
        debug("消除组：", list);
        var v;
        if (obj1 != null) {
            v = obj1.jewel.JewelPosition;
        }
        else {
            v = obj.jewel.JewelPosition;
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
        // this.drop.setDelay(GameController.DROP_DELAY);
        this.drop.setLastDelay(GameController.DROP_DELAY);
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
    //检测当前鼠标碰到哪一个
    GameController.prototype.JewelTouchChecker = function (localX, localY) {
        var list = JewelSpawner.spawn.JewelGrib;
        for (var x = 0; x < list.length; x++) {
            for (var y = 0; y < list[x].length; y++) {
                var obj = list[x][y];
                if (obj) {
                    if (localX >= obj.x && localY >= obj.y && localX < obj.x + obj.width && localY < obj.y + obj.height) {
                        debug("当前触碰点：(%s, %s)", obj.jewel.JewelPosition.x, obj.jewel.JewelPosition.y);
                        return obj;
                    }
                }
            }
        }
        return null;
    };
    GameController.prototype.SwapJewelPosition = function (jewel1, jewel2) {
        JewelSpawner.spawn.JewelGrib[jewel1.jewel.JewelPosition.x][jewel1.jewel.JewelPosition.y] = jewel2;
        JewelSpawner.spawn.JewelGrib[jewel2.jewel.JewelPosition.x][jewel2.jewel.JewelPosition.y] = jewel1;
        //交互宝时对象在Map中的位置
        var tmp = jewel1.jewel.JewelPosition;
        jewel1.jewel.JewelPosition = jewel2.jewel.JewelPosition;
        jewel2.jewel.JewelPosition = tmp;
        if (jewel1.jewel.JewelType == 99 || jewel2.jewel.JewelType == 99) {
            this.WinChecker();
        }
    };
    GameController.prototype.SpawnJewelPower = function (type, power, pos) {
        // yield return new WaitForSeconds(0.4f);
        var tmp = JewelSpawner.spawn.SpawnJewelPower(type, power, pos);
        debug("重新产生一个特效宝石：", tmp);
        // yield return new WaitForSeconds(0.2f);
        // tmp.GetComponent<Collider2D>().enabled = true;
    };
    // 播放格子除动画特效
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
    // 销毁一行
    GameController.prototype.PDestroyRow = function (_x, y) {
        this.dropjewel();
        SoundController.Sound.Fire();
        var celleffect = []; // new List<CellObj>();
        var jeweldes = []; // new List<JewelObj>();
        for (var x = 0; x < 7; x++) {
            if (_x != x) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0)
                    celleffect.push(GribManager.cell.GribCellObj[x][y]);
                if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGrib[x][y]);
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
    // 销毁一列
    GameController.prototype.PDestroyCollumn = function (x, _y) {
        this.dropjewel();
        SoundController.Sound.Fire();
        var celleffect = []; // new List<CellObj>();
        var jeweldes = []; // new List<JewelObj>();
        for (var y = 0; y < 9; y++) {
            if (_y != y) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect > 0)
                    celleffect.push(GribManager.cell.GribCellObj[x][y]);
                if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelType != 99 && GribManager.cell.GribCellObj[x][y].cell != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0)
                    jeweldes.push(JewelSpawner.spawn.JewelGrib[x][y]);
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
                    if (i >= 0 && i < 7 && j >= 0 && j < 9 && JewelSpawner.spawn.JewelGrib[i][j] != null && JewelSpawner.spawn.JewelGrib[i][j].jewel.JewelType != 99)
                        JewelSpawner.spawn.JewelGrib[i][j].Destroy();
            }
        }
    };
    GameController.prototype.PDestroyType = function (type, pos) {
        this.DestroyType(type, pos); ///StartCoroutine(DestroyType(type, pos));
    };
    GameController.prototype.DestroyType = function (type, pos) {
        this.NoSelect.visible = true; // NoSelect.SetActive(true);
        this.dropjewel();
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                var tmp = JewelSpawner.spawn.JewelGrib[x][y];
                if (tmp != null && tmp.jewel.JewelType == type) {
                    EffectSpawner.effect.MGE(pos, JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelPosition);
                    tmp.Destroy();
                }
            }
        }
        // yield return new WaitForSeconds(0.2f);
        this.NoSelect.visible = false; // NoSelect.SetActive(false);
    };
    // 为本局游戏追加时间
    GameController.prototype.PBonusTime = function () {
        this.TimeInc(); //StartCoroutine(TimeInc());
    };
    GameController.prototype.DestroyRandom = function () {
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
    };
    GameController.prototype.getListCellEffect = function () {
        var tmp = [];
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
        var tmp = [];
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 7; x++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellType > 1) {
                    if (JewelSpawner.spawn.JewelGrib[x][y] != null) {
                        tmp.push(GribManager.cell.GribCellObj[x][y]);
                    }
                }
            }
        }
        return tmp;
    };
    GameController.prototype.posUnderStar = function () {
        var under = [];
        var x = this.JewelStar.jewel.JewelPosition.x;
        var y = this.JewelStar.jewel.JewelPosition.y;
        for (var i = 0; i < y; i++) {
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
    };
    GameController.prototype.destroynotempty = function () {
        // try
        // {
        var listnotempty = this.getListNotEmpty();
        if (listnotempty.length > 0) {
            var tmp = listnotempty[Utils.random(0, listnotempty.length - 1)].cell.CellPosition;
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
    // 随机在一个宝石身上产生一个技能特效
    GameController.prototype.AddBonusPower = function () {
        var dem = 0;
        while (true) {
            dem++;
            if (dem >= 63)
                return;
            var x = Utils.random(0, 6); // (0, 7);
            var y = Utils.random(0, 8); // (0, 9);
            var tmp = JewelSpawner.spawn.JewelGrib[x][y];
            if (tmp != null && tmp.jewel.JewelType != 8 && tmp.jewel.JewelPower == 0 && GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0) {
                //随机1种技能
                var r = Utils.random(2, 4);
                tmp.jewel.JewelPower = r;
                EffectSpawner.effect.ThunderRow(JewelSpawner.spawn.JewelGrib[x][y], r);
                return;
            }
        }
    };
    GameController.prototype.ShowStar = function () {
        var listpos = [];
        var pos;
        for (var y = 9 - 1; y >= 0; y--) {
            for (var x = 0; x < 7; x++) {
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
    GameController.prototype.EnableSelector = function (tx, ty) {
        this.Selector.x = tx;
        this.Selector.y = ty;
        this.Selector.visible = true;
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