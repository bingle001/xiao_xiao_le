class Map extends eui.Component {

    public group_star: eui.Group;
    public star0: eui.Image;
    public star1: eui.Image;
    public star2: eui.Image;
    public img_icon: eui.Image;
    public lbl_num: eui.BitmapLabel;

    public map: Player;

    public constructor() {
        super();
        this.skinName = "MapPointSkin";

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnMouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnMouseUp, this);
    }


    private OnMouseDown() {
        CameraMovement.setstate = true;
        CameraMovement.movement = false;
        if (DataLoader.enableclick) {
            // transform.GetChild(0).transform.localScale = new Vector3(0.8f, 0.75f, 1);
            //TODO
            this.scaleX = 0.8;
            this.scaleY = 0.75;
        }
    }
    private OnMouseUp() {

        CameraMovement.setstate = false;
        if (DataLoader.enableclick && !CameraMovement.movement) {
            SoundController.Sound.Click();
            // transform.GetChild(0).transform.localScale = new Vector3(0.8f, 0.8f, 1);
            //TODO
            this.scaleX = 0.8;
            this.scaleY = 0.8;

            PlayerPrefs.DeleteKey("LASTPOS");
            PlayerPrefs.DeleteKey("LASTPOSX");
            PlayerPrefs.SetFloat("LASTPOS", this.y);// transform.position.y);
            PlayerPrefs.SetFloat("LASTPOSX", this.x);// transform.position.x);

            //TODO
            // CameraMovement.mcamera.StarPoint.transform.position = transform.position + new Vector3(0, 0, -0.2f);
            this.scaleX = this.scaleY = 0.2;

            CameraMovement.mcamera.PopUpShow(this.map);
        }
        CameraMovement.movement = false;
    }

    // set map info
    public SetMapInfo(): void {
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

            let star: number = this.map.Stars;
            this.star0.source = star > 0 ? "SelectMap_starmap1_png" : "SelectMap_starmap5_png";
            this.star1.source = star > 1 ? "SelectMap_starmap1_png" : "SelectMap_starmap5_png";
            this.star2.source = star > 2 ? "SelectMap_starmap1_png" : "SelectMap_starmap5_png";
        }
    }



}