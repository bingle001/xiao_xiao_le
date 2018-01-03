class WinUI extends eui.Component {

	public Stargold: eui.Image[];
	public Score: eui.Label;
	public TimeBonus: eui.Label;
	public Best: eui.Label;

	private playerScore: number;
	private star: number;

	public constructor() {
		super();

	}

	private Start(): void {
		this.TimeBonus.text = (Math.abs(Timer.timer.GameTime)).toString();
		this.playerScore = this.getGameScore(PlayerInfo.Info.Score, Timer.timer.GameTime);
		this.Score.text = this.playerScore.toString();
		this.Best.text = this.getBestScore(this.playerScore).toString();
		this.star = this.getGameStar(this.playerScore);
		this.StarAnimation(this.star); //StartCoroutine(StarAnimation(star));
		this.SaveData();
	}

	/// get best score
	private getBestScore(score: number): number {
		if (score > PlayerInfo.MapPlayer.HightScore) {
			PlayerInfo.MapPlayer.HightScore = score;
		}
		return PlayerInfo.MapPlayer.HightScore;
	}

	/// calculate score
	private getGameScore(playerscore: number, gametime: number): number {
		return playerscore + Math.abs(gametime) * 500;
	}

	/// caculate star number by score
	private getGameStar(score: number): number {
		if (score >= 80000) {
			PlayerInfo.MapPlayer.Stars = 3;
			return 3;
		}
		else if (score >= 60000) {
			if (PlayerInfo.MapPlayer.Stars < 2)
				PlayerInfo.MapPlayer.Stars = 2;
			return 2;
		}
		else {
			PlayerInfo.MapPlayer.Stars = 1;
			return 1;
		}
	}

	/// animation star
	private StarAnimation(star: number): void {	//IEnumerator
		for (let i = 0; i < star; i++) {
			this.Stargold[i].visible = true;// SetActive(true);
			// yield return new WaitForSeconds(0.7f);
			//TODO 间隔出现星星
		}
	}

	/// sava data
	private SaveData(): void {
		let index = PlayerInfo.MapPlayer.Level - 1;
		DataLoader.MyData[index] = PlayerInfo.MapPlayer;
		if (PlayerInfo.MapPlayer.Level < 297)
			DataLoader.MyData[index + 1].Locked = false;
		PlayerUtils.Save(DataLoader.MyData);
	}


}