class LoseUI {

	public Score: eui.Label;   // current score
	public Best: eui.Label;    // best score
	private playerScore: number;            // score tmp
	private star: number;                   // star number

	public constructor() {
	}

	private Start(): void {
		if (PlayerInfo.MODE != 1)
			this.playerScore = PlayerInfo.Info.Score + (PlayerInfo.MapPlayer.Level - 1) * 5000;
		else
			this.playerScore = PlayerInfo.Info.Score;
		// display score text
		this.Score.text = this.playerScore.toString();
		// display best score text
		this.Best.text = this.getBestScore(this.playerScore).toString();

	}

	/// compare score with best score
	private getBestScore(score: number): number {
		if (PlayerInfo.MODE != 1) {
			if (score > PlayerInfo.MapPlayer.HightScore) {
				PlayerInfo.MapPlayer.HightScore = score;
				PlayerPrefs.SetInt(PlayerInfo.KEY_CLASSIC_HISCORE, PlayerInfo.MapPlayer.HightScore);
			}
		}
		return PlayerInfo.MapPlayer.HightScore;
	}


}