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
/// 星星移动 组件 （挂在star游戏对象下）
var StarMove = (function (_super) {
    __extends(StarMove, _super);
    function StarMove() {
        var _this = _super.call(this) || this;
        _this.X = -1;
        _this.Y = -1;
        _this.actived = false;
        return _this;
    }
    StarMove.prototype.Start = function () {
        this.X = 0;
        this.Y = 0;
        // yield return new WaitForSeconds(1f);
        this.actived = true;
        // yield return new WaitForSeconds(0.75f);
        //TODO
        //GameObject.Find("JewelStar").transform.GetChild(0).gameObject.SetActive(true);
        //Destroy(gameObject);
    };
    StarMove.prototype.Update = function () {
        if (this.actived) {
            this.X = JewelSpawner.spawn.JewelGrib[GameController.action.JewelStar.jewel.JewelPosition.x][GameController.action.JewelStar.jewel.JewelPosition.y].position.x;
            this.Y = JewelSpawner.spawn.JewelGrib[GameController.action.JewelStar.jewel.JewelPosition.x][GameController.action.JewelStar.jewel.JewelPosition.y].position.y;
        }
        if (this.X != -1 && this.X != this.localPosition.x)
            this.MoveToX(this.X);
        if (this.Y != -1 && this.Y != this.localPosition.y)
            this.MoveToY(this.Y);
    };
    StarMove.prototype.MoveToX = function (x) {
        if (Math.abs(x - this.localPosition.x) > 0.15) {
            if (this.localPosition.x > x) {
                // this.localPosition -= new Vector3(Time.smoothDeltaTime * 6f, 0, 0);
                this.u3dX -= Time.smoothDeltaTime * 6;
            }
            else if (this.localPosition.x < x) {
                // transform.localPosition += new Vector3(Time.smoothDeltaTime * 6f, 0, 0);
                this.u3dX += Time.smoothDeltaTime * 6;
            }
        }
        else {
            // transform.localPosition = new Vector3(x, transform.localPosition.y, transform.localPosition.z);
            this.u3dX = x;
            this.X = -1;
        }
    };
    StarMove.prototype.MoveToY = function (y) {
        if (Math.abs(y - this.localPosition.y) > 0.15) {
            if (this.localPosition.y > y) {
                // transform.localPosition -= new Vector3(0, Time.smoothDeltaTime * 8f, 0);
                this.u3dY -= Time.smoothDeltaTime * 8;
            }
            else if (this.localPosition.y < y) {
                // transform.localPosition += new Vector3(0, Time.smoothDeltaTime * 8f, 0);
                this.u3dY += Time.smoothDeltaTime * 8;
            }
        }
        else {
            // transform.localPosition = new Vector3(transform.localPosition.x, y, transform.localPosition.z);
            this.u3dY = y;
            this.Y = -1;
        }
    };
    return StarMove;
}(GameObject));
__reflect(StarMove.prototype, "StarMove");
//# sourceMappingURL=StarMove.js.map