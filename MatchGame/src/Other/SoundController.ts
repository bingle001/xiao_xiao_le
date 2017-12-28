// 特效声音
class SoundController {

	public static Sound: SoundController; // instance of SoundController

	public SoundClips: egret.Sound[];      // array sound clips

	public audiosource: egret.SoundChannel;     // audio source
	public static Awake(): void {
		if (SoundController.Sound == null) {
			SoundController.Sound = new SoundController();
		}
	}

	// sound on state
	public SoundON(): void {
		// audiosource.mute = false;
	}

	// sound off state
	public SoundOFF(): void {
		// audiosource.mute = true;
	}

	public Click(): void {
		// audiosource.PlayOneShot(SoundClips[0]);
	}
	public JewelCrash(): void {
		// audiosource.PlayOneShot(SoundClips[1]);
	}

	public LockCrash(): void {
		// audiosource.PlayOneShot(SoundClips[2]);
	}
	public IceCrash(): void {
		// audiosource.PlayOneShot(SoundClips[3]);
	}

	public Win(): void {
		// audiosource.PlayOneShot(SoundClips[4]);
	}
	public Lose(): void {
		// audiosource.PlayOneShot(SoundClips[5]);
	}

	public StarIn(): void {
		// audiosource.PlayOneShot(SoundClips[6]);
	}
	public Fire(): void {
		// audiosource.PlayOneShot(SoundClips[7]);
	}
	public Gun(): void {
		// audiosource.PlayOneShot(SoundClips[8]);
	}
	public Boom(): void {
		// audiosource.PlayOneShot(SoundClips[9]);
	}


}