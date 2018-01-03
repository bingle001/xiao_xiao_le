var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// 滑落控制器 组件（挂在 SpawnController游戏对象上）
/// 此类主要用于计算消除后的滑落，并产生新的方块。属于控制器类
var SpawnController = (function () {
    function SpawnController() {
        // 滑落延迟
        this._DELAY = 0;
        this._enabled = false;
    }
    SpawnController.prototype.setDelay = function (delay) {
        this._DELAY = delay;
        if (!this._enabled) {
            this._enabled = true;
            Time.addFrameCall(this.Update, this);
        }
    };
    /// 当enable=true后,则会重新启动Update
    SpawnController.prototype.Update = function () {
        this._DELAY -= Time.deltaTime;
        if (this._DELAY <= 0) {
            this.DropAndSpawn();
            Time.removeFrameCall(this.Update, this);
            this._enabled = false;
        }
    };
    SpawnController.prototype.DropAndSpawn = function () {
        debug("开始掉落检测！");
        this.Drop();
        this.Spawn();
        this.BonusPower();
        this.ShowStar();
    };
    /// 对所有方块进行下落计算（冒泡排序）,调整位置,并播放下落动画
    /// 下落计算完毕后，所有空位均在二维数组顶部。（以方便后面产生新方块）
    SpawnController.prototype.Drop = function () {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 7; x++) {
                if (JewelSpawner.spawn.JewelGrib[x][y] != null && GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect != 4) {
                    JewelSpawner.spawn.JewelGrib[x][y].getNewPosition();
                }
            }
        }
    };
    /// 产生新方块,并播放下落动画
    SpawnController.prototype.Spawn = function () {
        var h = Utils.initVector(7, 0);
        for (var x = 0; x < 7; x++) {
            var s = 0;
            for (var y = 0; y < 9; y++) {
                if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4) {
                    s = y + 1;
                }
            }
            for (var y = s; y < 9; y++) {
                if (GameController.action.GameState == GameState.PLAYING)
                    if (GribManager.cell.GribCellObj[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y] == null) {
                        var tmp = JewelSpawner.spawn.JewelInstantiate(x, y);
                        if (PlayerInfo.MODE == 1 && Random.value > 0.99) {
                            tmp.jewel.JewelPower = 4;
                            EffectSpawner.effect.Clock(tmp);
                        }
                        tmp.y = Global.posY(9 + h[x]); //设置到屏幕外掉落下来
                        h[x]++;
                        //播放滑落动画
                        Utils.IEDrop(tmp, new Vector2(x, y), GameController.DROP_SPEED);
                        // let script: JewelObj = tmp as JewelObj;
                        // script.render.enabled = true;	//掉落完了才能移动
                    }
            }
        }
        this.checkNomoremove(); //StartCoroutine(checkNomoremove());
    };
    /// check no more move
    SpawnController.prototype.checkNomoremove = function () {
        if (!Supporter.sp.isNoMoreMove()) {
            if (PlayerInfo.MODE == 1) {
                // Timer.timer.NoSelect.SetActive(true);
                // StartCoroutine(ReSpawnGrib());
                Timer.timer.NoSelect.visible = true;
                this.ReSpawnGrib();
            }
            else if (true) {
                Timer.timer.NoSelect.visible = true; //Timer.timer.NoSelect.SetActive(true);
                Timer.timer.Lost();
            }
        }
    };
    SpawnController.prototype.ReSpawnGrib = function () {
        Timer.timer.Nomove.visible = true; // SetActive(true);
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelType != 99)
                    JewelSpawner.spawn.JewelGrib[x][y].JewelDisable();
            }
        }
        // yield return new WaitForSeconds(0.7f);
        JewelSpawner.spawn.Respawn(); //StartCoroutine(JewelSpawner.spawn.Respawn());
    };
    SpawnController.prototype.BonusPower = function () {
        if (GameController.action.isAddPower) {
            GameController.action.AddBonusPower();
            GameController.action.isAddPower = false;
        }
    };
    // 显示星星宝石
    SpawnController.prototype.ShowStar = function () {
        if (GameController.action.isShowStar) {
            GameController.action.isShowStar = false;
            GameController.action.ShowStar();
            GameController.action.isStar = true;
        }
    };
    return SpawnController;
}());
__reflect(SpawnController.prototype, "SpawnController");
//# sourceMappingURL=SpawnController.js.map