// 背景音乐游戏
class MusicController {
	public static Music: MusicController;

	public MusicClips: egret.Sound[];

	public audiosource: egret.SoundChannel;

	public static Awake(): void {
		if (MusicController.Music == null) {
			MusicController.Music = new MusicController();
		}
	}

	public MusicON(): void {
		// audiosource.mute = false; 
	}

	public MusicOFF(): void {
		// audiosource.mute = true; 
	}

	public BG_menu(): void {
		// audiosource.clip = MusicClips[0];
		// audiosource.Play();
	}

	public BG_play(): void {
		// audiosource.clip = MusicClips[1];
		// audiosource.Play();
	}


}