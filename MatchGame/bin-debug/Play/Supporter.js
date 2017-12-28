var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// 支持者组件 （挂在Supporter游戏对象下）
/// 职责计算出那些方块可以消除,并提示给玩家.
var Supporter = (function (_super) {
    __extends(Supporter, _super);
    function Supporter() {
        var _this = _super.call(this) || this;
        _this.AvaiableObj = []; // new JewelObj[2];
        _this.SP_DELAY = 5; //5秒后开始提示
        return _this;
    }
    Supporter.Awake = function () {
        Supporter.sp = new Supporter();
    };
    Supporter.prototype.Update = function () {
        if (this.SP_DELAY > 0 && GameController.action.GameState == GameState.PLAYING && !this.isNomove) {
            this.SP_DELAY -= Time.deltaTime;
        }
        else if (!this.isNomove && GameController.action.GameState == GameState.PLAYING) {
            this.RefreshTime();
            this.isNoMoreMove();
            this.PlaySuggestionAnim();
        }
    };
    Supporter.prototype.isNoMoreMove = function () {
        this.StopSuggestionAnim();
        this.AvaiableMove = []; // new Vector2[2];
        this.AvaiableObj = []; // new JewelObj[2];
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 9; y++) {
                if (JewelSpawner.spawn.JewelGribScript[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0) {
                    this.obj = JewelSpawner.spawn.JewelGribScript[x][y];
                    var obj1 = this.MoveChecker(x, y, this.obj);
                    if (obj1 != null) {
                        this.AvaiableMove[0] = this.obj.jewel.JewelPosition;
                        this.AvaiableObj[0] = JewelSpawner.spawn.JewelGribScript[this.AvaiableMove[0].x][this.AvaiableMove[0].y];
                        this.AvaiableMove[1] = obj1.jewel.JewelPosition;
                        this.AvaiableObj[1] = JewelSpawner.spawn.JewelGribScript[this.AvaiableMove[1].x][this.AvaiableMove[1].y];
                        this.isNomove = false;
                        return true;
                    }
                }
            }
        }
        this.isNomove = true;
        return false;
    };
    Supporter.prototype.RefreshTime = function () {
        this.SP_DELAY = 5;
    };
    Supporter.prototype.MoveChecker = function (x, y, obj) {
        this.vtmplist = this.getListPos(x, y);
        for (var i in this.vtmplist) {
            var item = this.vtmplist[i];
            if (JewelSpawner.spawn.JewelGribScript[item.x][item.y] != null && JewelSpawner.spawn.JewelGribScript[item.x][item.y].jewel.JewelType == 8)
                return JewelSpawner.spawn.JewelGribScript[item.x][item.y];
            else {
                var NeiObj1 = Ulti.ListPlus(obj.GetCollumn(item, obj.jewel.JewelType, null), obj.GetRow(item, obj.jewel.JewelType, null), obj);
                if (NeiObj1.length >= 3)
                    return JewelSpawner.spawn.JewelGribScript[item.x][item.y];
            }
        }
        return null;
    };
    Supporter.prototype.getListPos = function (x, y) {
        this.vtmplist = []; // new List<Vector2>();
        if (y + 1 < 9 && GribManager.cell.GribCellObj[x][y + 1] != null && GribManager.cell.GribCellObj[x][y + 1].cell.CellEffect == 0)
            this.vtmplist.push(new Vector2(x, y + 1));
        if (y - 1 >= 0 && GribManager.cell.GribCellObj[x][y - 1] != null && GribManager.cell.GribCellObj[x][y - 1].cell.CellEffect == 0)
            this.vtmplist.push(new Vector2(x, y - 1));
        if (x + 1 < 7 && GribManager.cell.GribCellObj[x + 1][y] != null && GribManager.cell.GribCellObj[x + 1][y].cell.CellEffect == 0)
            this.vtmplist.push(new Vector2(x + 1, y));
        if (x - 1 >= 0 && GribManager.cell.GribCellObj[x - 1][y] != null && GribManager.cell.GribCellObj[x - 1][y].cell.CellEffect == 0)
            this.vtmplist.push(new Vector2(x - 1, y));
        return this.vtmplist;
    };
    /// 播放一对宝石,左右摇晃动画
    Supporter.prototype.PlaySuggestionAnim = function () {
        if (this.AvaiableObj[0] != null && this.AvaiableObj[1] != null) {
            this.AvaiableObj[0].JewelSuggesttion();
            this.AvaiableObj[1].JewelSuggesttion();
        }
    };
    Supporter.prototype.StopSuggestionAnim = function () {
        if (this.AvaiableObj[0] != null) {
            this.AvaiableObj[0].JewelStopSuggesttion();
        }
        if (this.AvaiableObj[1] != null) {
            this.AvaiableObj[1].JewelStopSuggesttion();
        }
    };
    return Supporter;
}(MonoBehaviour));
__reflect(Supporter.prototype, "Supporter");
//# sourceMappingURL=Supporter.js.map