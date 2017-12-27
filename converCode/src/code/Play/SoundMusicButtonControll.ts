// 按钮点击声音 
class SoundMusicButtonControll {

	public Sound: eui.Image;      // button sound
	public Music: eui.Image;      // button music

	public constructor() {
	}

	private Start(): void {
		this.SetButtonState();
	}

	/// Set state button music and sound when play game
	private SetButtonState(): void {
		if (PlayerPrefs.GetInt("MUSIC", 0) != 1) {
			this.Music.source = "home_music-on_png";// sprite = ButtonActionController.Click.ButtonSprite[0];
			MusicController.Music.MusicON();
		}
		else {
			this.Music.source = "home_music-off_png";// sprite = ButtonActionController.Click.ButtonSprite[1];
			MusicController.Music.MusicOFF();
		}

		if (PlayerPrefs.GetInt("SOUND", 0) != 1) {
			this.Sound.source = "home_sound-on_png";// overrideSprite = ButtonActionController.Click.ButtonSprite[2];
			SoundController.Sound.SoundON();
		}
		else {
			this.Sound.source = "home_sound-off_png";// overrideSprite = ButtonActionController.Click.ButtonSprite[3];
			SoundController.Sound.SoundOFF();
		}
	}

	// Set and change state of music in game
	public BMusic(): void {
		if (PlayerPrefs.GetInt("MUSIC", 0) != 1) {
			PlayerPrefs.SetInt("MUSIC", 1);
			Debug.Log("MUSIC OFF");
		}
		else {
			PlayerPrefs.SetInt("MUSIC", 0);
			Debug.Log("MUSIC ON");
		}
		SoundController.Sound.Click();
		this.SetButtonState();
	}

	// Set and change state of sound background in game
	public BSound(): void {

		if (PlayerPrefs.GetInt("SOUND", 0) != 1) {
			PlayerPrefs.SetInt("SOUND", 1);
		}
		else {
			PlayerPrefs.SetInt("SOUND", 0);
		}
		SoundController.Sound.Click();
		this.SetButtonState();
	}



}