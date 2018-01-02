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
        _this.width = Global.CellWidth;
        _this.height = Global.cellHeight;
        _this.icon = new eui.Image();
        _this.icon.horizontalCenter = 0;
        _this.icon.verticalCenter = 0;
        // this.addChild(this.icon);
        _this.ani = new BaseAni();
        _this.ani.horizontalCenter = 0;
        _this.ani.verticalCenter = 0;
        return _this;
    }
    // change to sprite by index
    CellObj.prototype.SetSpriteEvent = function () {
        this.SetSprite(this.cell.CellType - 1);
    };
    // set sprite for cell when change index
    CellObj.prototype.SetSprite = function (type) {
        var res;
        if (type < 0) {
            res = "cell_tranf_png";
        }
        else if (type > 3) {
            res = GribManager.cell.CellSprite[3];
        }
        else {
            res = GribManager.cell.CellSprite[type];
        }
        this.icon.source = res;
        this.icon.scaleX = 1;
        this.SetActive(this, this.icon, type >= 0);
        this.setChilEffectSprite(this.cell.CellEffect);
    };
    CellObj.prototype.setChilEffectSprite = function (celleffect) {
        if (celleffect == 4) {
            this.ani.setAni(AniTypes.Ice);
            this.SetActive(this, this.ani, true);
        }
        else if (celleffect == 5) {
            this.ani.setAni(AniTypes.Lock);
            this.SetActive(this, this.ani, true);
        }
        else {
            this.SetActive(this, this.ani, false);
        }
    };
    // remove effect of cell
    CellObj.prototype.RemoveEffect = function () {
        if (this.cell.CellEffect > 0) {
            if (this.cell.CellEffect == 5) {
                this.ani.play();
                SoundController.Sound.IceCrash();
            }
            else if (this.cell.CellEffect == 4) {
                this.ani.play();
                SoundController.Sound.LockCrash();
            }
            this.cell.CellEffect = 0;
            if (JewelSpawner.spawn.JewelGribScript[this.cell.CellPosition.x][this.cell.CellPosition.y] != null) {
                JewelSpawner.spawn.JewelGribScript[this.cell.CellPosition.x][this.cell.CellPosition.y].RuleChecker();
            }
        }
    };
    CellObj.prototype.aniPlayOver = function () {
    };
    CellObj.prototype.CelltypeProcess = function () {
        if (this.cell.CellType > 1) {
            this.cell.CellType--;
            this.runAnim();
            if (this.cell.CellType == 1) {
                GameController.action.CellNotEmpty--;
                if (GameController.action.CellNotEmpty == 0) {
                    GameController.action.isShowStar = true;
                }
            }
        }
    };
    CellObj.prototype.runAnim = function () {
        // Animation anim = GetComponent<Animation>();
        // anim.enabled = true;
        // anim.Play("CellChangeSprite");
        //TODO
        debug("播放动画：CellChangeSprite");
        egret.Tween.removeTweens(this.icon);
        egret.Tween.get(this.icon).to({ scaleX: 0 }, 200).call(this.appearNewCell, this);
    };
    CellObj.prototype.appearNewCell = function () {
        this.SetSpriteEvent();
        if (this.icon.parent) {
            this.icon.scaleX = 0;
            egret.Tween.removeTweens(this.icon);
            egret.Tween.get(this.icon).to({ scaleX: 1 }, 200);
        }
    };
    CellObj.prototype.debug = function (x, y) {
        if (!this.m_pLbl) {
            this.m_pLbl = new egret.TextField();
            this.m_pLbl.size = 20;
            this.m_pLbl.x = 20;
            this.m_pLbl.y = 20;
            this.m_pLbl.textColor = 0xffffff;
            this.addChild(this.m_pLbl);
        }
        this.m_pLbl.text = "(" + x + "," + y + ")";
        this.name = x + "_" + y;
    };
    return CellObj;
}(GameObject));
__reflect(CellObj.prototype, "CellObj");
//# sourceMappingURL=CellObj.js.map