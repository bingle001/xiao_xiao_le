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
//镜头移动？？
var CameraMovement = (function (_super) {
    __extends(CameraMovement, _super);
    function CameraMovement() {
        var _this = _super.call(this) || this;
        _this.distance = 90.8 / 8680;
        return _this;
    }
    CameraMovement.Awake = function () {
        // mcamera = this;
        CameraMovement.mcamera = new CameraMovement();
    };
    CameraMovement.prototype.Start = function () {
        this.setLastpos();
        this.SetPoint();
        // GoogleMobileAdsScript.advertise.HideBanner();
    };
    CameraMovement.prototype.Update = function () {
        // if (Input.GetKeyDown(KeyCode.Escape) && isPopup)
        // {
        //     UnfreezeMap();
        // }
        // else if (Input.GetKeyDown(KeyCode.Escape))
        // {
        //     ButtonActionController.Click.HomeScene();
        // }
    };
    // set last position of container
    CameraMovement.prototype.setLastpos = function () {
        var lastp = PlayerPrefs.GetFloat("LASTPOS", 0);
        if (lastp < 0)
            lastp = 0;
        else if (lastp > 90.8000)
            lastp = 90.8;
        // transform.position += new Vector3(0, lastp);
        // container.anchoredPosition = new Vector2(container.anchoredPosition.x, -lastp / distance + 4740f);
        //TODO
        this.x = 0;
        this.y = lastp;
        // this.anchorOffsetX = 0;
        // this.anchorOffsetY = -lastp / distance + 4740f
    };
    CameraMovement.prototype.SetPoint = function () {
        var x = PlayerPrefs.GetFloat("LASTPOSX", -0.0045);
        var y = PlayerPrefs.GetFloat("LASTPOS", -3.587);
        // StarPoint.transform.position = new Vector3(x, y, StarPoint.transform.position.z);
        this.StarPoint.x = x;
        this.StarPoint.y = y;
    };
    // Update positio camera when scroller
    CameraMovement.prototype.CameraPosUpdate = function () {
        // transform.position = new Vector3(transform.position.x, -(container.anchoredPosition.y - 4740f) * distance, transform.position.z);
        // if (setstate)
        //     movement = true;
    };
    // show infomation of level player
    CameraMovement.prototype.PopUpShow = function (_map) {
        this.isPopup = true;
        CameraMovement.mcamera.FreezeMap();
        this.map = _map;
        var stars = []; // new Image[3];
        //TODO 星星素材
        //直接访问PopUp中的三个星星组件
        // stars[0] = PopUp.transform.GetChild(1).GetComponent<Image>();
        // stars[1] = PopUp.transform.GetChild(2).GetComponent<Image>();
        // stars[2] = PopUp.transform.GetChild(3).GetComponent<Image>();
        //设置星星状态
        // for (let i = 0; i < 3; i++)
        // {
        //     if (i < _map.Stars)
        //         stars[i].sprite = star[0];
        //     else
        //         stars[i].sprite = star[1];
        // }
        // PopUp.transform.GetChild(4).GetComponent<Text>().text = _map.HightScore.ToString();
        // PopUp.transform.GetChild(6).GetComponent<Text>().text = _map.Level.ToString("00");
        // Animation am = PopUp.GetComponent<Animation>();
        // am.enabled = true;
        // PopUp.SetActive(true);
    };
    CameraMovement.prototype.ArcadeScene = function () {
        ButtonActionController.Click.ArcadeScene(this.map);
    };
    CameraMovement.prototype.FreezeMap = function () {
        DataLoader.enableclick = false;
        // fade.GetComponent<CanvasGroup>().blocksRaycasts = true;
        //TODO
    };
    CameraMovement.prototype.UnfreezeMap = function () {
        //TODO
        SoundController.Sound.Click();
        // this.PopUp.SetActive(false);
        this.isPopup = false;
        DataLoader.enableclick = true;
        // fade.GetComponent<CanvasGroup>().blocksRaycasts = false;
    };
    return CameraMovement;
}(egret.DisplayObjectContainer));
__reflect(CameraMovement.prototype, "CameraMovement");
//# sourceMappingURL=CameraMovement.js.map