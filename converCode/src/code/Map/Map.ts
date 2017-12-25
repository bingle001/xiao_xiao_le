class Map extends egret.DisplayObject{
	public map:Player;

	public constructor() {
		super();

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnMouseDown, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnMouseUp, this);
	}


    private OnMouseDown()
    {
        CameraMovement.setstate = true;
        CameraMovement.movement = false;
		if (DataLoader.enableclick) {
            // transform.GetChild(0).transform.localScale = new Vector3(0.8f, 0.75f, 1);
			//TODO
			this.scaleX = 0.8;
			this.scaleY = 0.75;
		}
    }
    private OnMouseUp()
    {

        CameraMovement.setstate = false;
        if (DataLoader.enableclick && !CameraMovement.movement)
        {
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
    /// <summary>
    /// set map info
    /// </summary>
    public void SetMapInfo()
    {
        SpriteRenderer render = transform.GetChild(0).GetComponent<SpriteRenderer>();
        SpriteRenderer[] star = new SpriteRenderer[3];
        star[0] = transform.GetChild(2).GetComponent<SpriteRenderer>();
        star[1] = transform.GetChild(3).GetComponent<SpriteRenderer>();
        star[2] = transform.GetChild(4).GetComponent<SpriteRenderer>();

        if (map.Locked)
        {
            render.sprite = DataLoader.Data.MapSprite[0];
            star[0].sprite = null;
            star[1].sprite = null;
            star[2].sprite = null;
            transform.GetComponent<Collider2D>().enabled = false;
            transform.GetChild(1).gameObject.SetActive(false);
        }
        else if (map.Stars == 0)
        {
            render.sprite = DataLoader.Data.MapSprite[1];
            star[0].sprite = DataLoader.Data.MapSprite[4];
            star[1].sprite = DataLoader.Data.MapSprite[4];
            star[2].sprite = DataLoader.Data.MapSprite[4];
        }
        else
        {

            render.sprite = DataLoader.Data.MapSprite[2];
            star[0].sprite = DataLoader.Data.MapSprite[4];
            star[1].sprite = DataLoader.Data.MapSprite[4];
            star[2].sprite = DataLoader.Data.MapSprite[4];
            for (int i = 0; i < map.Stars; i++)
            {
                star[i].sprite = DataLoader.Data.MapSprite[3];
            }
        }
}
	


}