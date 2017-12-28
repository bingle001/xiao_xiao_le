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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.skinName = "MapPointSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.OnMouseDown, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.OnMouseUp, _this);
        return _this;
    }
    Map.prototype.OnMouseDown = function () {
        CameraMovement.setstate = true;
        CameraMovement.movement = false;
        // if (DataLoader.enableclick) {
        //     // transform.GetChild(0).transform.localScale = new Vector3(0.8f, 0.75f, 1);
        //     //TODO
        //     this.scaleX = 0.8;
        //     this.scaleY = 0.75;
        // }
    };
    Map.prototype.OnMouseUp = function () {
        CameraMovement.setstate = false;
        // if (DataLoader.enableclick && !CameraMovement.movement) {
        if (!CameraMovement.movement) {
            SoundController.Sound.Click();
            // transform.GetChild(0).transform.localScale = new Vector3(0.8f, 0.8f, 1);
            //TODO
            this.scaleX = 0.8;
            this.scaleY = 0.8;
            PlayerPrefs.DeleteKey("LASTPOS");
            PlayerPrefs.DeleteKey("LASTPOSX");
            PlayerPrefs.SetFloat("LASTPOS", this.y); // transform.position.y);
            PlayerPrefs.SetFloat("LASTPOSX", this.x); // transform.position.x);
            //TODO
            // CameraMovement.mcamera.StarPoint.transform.position = transform.position + new Vector3(0, 0, -0.2f);
            this.scaleX = this.scaleY = 0.2;
            CameraMovement.mcamera.PopUpShow(this.map);
        }
        CameraMovement.movement = false;
    };
    // set map info
    Map.prototype.SetMapInfo = function () {
        if (this.map.Locked) {
            this.group_star.visible = false;
            this.img_icon.source = "SelectMap_locked_png";
            this.enabled = false;
        }
        else if (this.map.Stars == 0) {
            this.group_star.visible = true;
            this.img_icon.source = "SelectMap_pre-play_png";
            this.star0.source = "SelectMap_starmap5_png";
            this.star1.source = "SelectMap_starmap5_png";
            this.star2.source = "SelectMap_starmap5_png";
            this.enabled = true;
        }
        else {
            this.group_star.visible = true;
            this.img_icon.source = "SelectMap_passed_png";
            var star = this.map.Stars;
            this.star0.source = star > 0 ? "SelectMap_starmap1_png" : "SelectMap_starmap5_png";
            this.star1.source = star > 1 ? "SelectMap_starmap1_png" : "SelectMap_starmap5_png";
            this.star2.source = star > 2 ? "SelectMap_starmap1_png" : "SelectMap_starmap5_png";
        }
    };
    return Map;
}(eui.Component));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map