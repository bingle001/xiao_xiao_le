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
/**
 * u3d里面的游戏对象
 */
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        //注意，这里的_x,_y是指行列的位置，不是实际位置！！
        _this._u3d_x = 0;
        _this._u3d_y = 0;
        return _this;
    }
    Object.defineProperty(GameObject.prototype, "u3dX", {
        get: function () {
            return this._u3d_x;
        },
        set: function (value) {
            this._u3d_x = value;
            this.x = this._u3d_x * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "u3dY", {
        get: function () {
            return this._u3d_y;
        },
        set: function (value) {
            this._u3d_y = value;
            this.y = this._u3d_y * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "localPosition", {
        /** 位置 */
        get: function () {
            return new Vector3(this._u3d_x, this._u3d_y, 0);
        },
        set: function (value) {
            this._u3d_x = value.x;
            this._u3d_y = value.y;
            this.x = this._u3d_x * 100;
            this.y = this._u3d_y * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "position", {
        /** 全局坐标，暂时直接返回_x,_y */
        get: function () {
            // let pos:egret.Point = this.localToGlobal(0, 0);
            // return new Vector3(pos.x, pos.y, 0);
            return new Vector3(this._u3d_x, this._u3d_y);
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 激活或取消激活某个显示对象
     */
    GameObject.prototype.SetActive = function (parent, obj, isActive) {
        if (parent && obj) {
            if (isActive) {
                obj.visible = true;
                parent.addChild(obj);
            }
            else {
                obj.visible = false;
                if (obj.parent) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    };
    return GameObject;
}(egret.DisplayObjectContainer));
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map