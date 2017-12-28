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
// 格子游戏对象 组件
var CellObj = (function (_super) {
    __extends(CellObj, _super);
    function CellObj() {
        var _this = _super.call(this) || this;
        _this.icon = new eui.Image();
        _this.addChild(_this.icon);
        return _this;
    }
    // change to sprite by index
    CellObj.prototype.SetSpriteEvent = function () {
        this.SetSprite(this.cell.CellType - 1);
    };
    // set sprite for cell when change index
    CellObj.prototype.SetSprite = function (type) {
        //TODO
        // this.GetComponent<SpriteRenderer>().sprite = GribManager.cell.CellSprite[type];
        this.setChilEffectSprite(this.cell.CellEffect);
    };
    // remove effect of cell
    CellObj.prototype.RemoveEffect = function () {
        if (this.cell.CellEffect > 0) {
            //TODO
            //     transform.GetChild(0).gameObject.SetActive(false);
            //     if (cell.CellEffect == 5)
            //     {
            //         EffectSpawner.effect.IceCrash(cell.CellPosition);
            //         SoundController.Sound.IceCrash();
            //     }
            //     else if (cell.CellEffect == 4)
            //     {
            //         EffectSpawner.effect.LockCrash(cell.CellPosition);
            //         SoundController.Sound.LockCrash();
            //     }
            //     cell.CellEffect = 0;
            //     if (JewelSpawner.spawn.JewelGribScript[(int)cell.CellPosition.x, (int)cell.CellPosition.y] != null)
            //         JewelSpawner.spawn.JewelGribScript[(int)cell.CellPosition.x, (int)cell.CellPosition.y].RuleChecker();
        }
    };
    CellObj.prototype.setChilEffectSprite = function (celleffect) {
        if (celleffect > 0) {
            // transform.GetChild(0).GetComponent<SpriteRenderer>().sprite = GribManager.cell.CellSprite[celleffect];
            var res = GribManager.cell.CellSprite[celleffect];
            this.icon.source = res;
        }
        else {
            // transform.GetChild(0).gameObject.SetActive(false);
            this.icon.visible = false;
        }
    };
    CellObj.prototype.CelltypeProcess = function () {
        if (this.cell.CellType > 1) {
            this.cell.CellType--;
            this.runAnim();
            if (this.cell.CellType == 1) {
                GameController.action.CellNotEmpty--;
                if (GameController.action.CellNotEmpty == 0)
                    GameController.action.isShowStar = true;
            }
        }
    };
    CellObj.prototype.runAnim = function () {
        // Animation anim = GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("CellChangeSprite");
        //TODO
        debug("播放动画：CellChangeSprite");
    };
    return CellObj;
}(GameObject));
__reflect(CellObj.prototype, "CellObj");
//# sourceMappingURL=CellObj.js.map