class LoseUI {

	public Score: eui.Label;   // current score
	public Best: eui.Label;    // best score
	private playerScore: number;            // score tmp
	private star: number;                   // star number

	public constructor() {
	}

	private Start(): void {
		if (PLayerInfo.MODE != 1)
			this.playerScore = PLayerInfo.Info.Score + (PLayerInfo.MapPlayer.Level - 1) * 5000;
		else
			this.playerScore = PLayerInfo.Info.Score;
		// display score text
		this.Score.text = this.playerScore.toString();
		// display best score text
		this.Best.text = this.getBestScore(this.playerScore).toString();

	}

	/// compare score with best score
	private getBestScore(score: number): number {
		if (PLayerInfo.MODE != 1) {
			if (score > PLayerInfo.MapPlayer.HightScore) {
				PLayerInfo.MapPlayer.HightScore = score;
				PlayerPrefs.SetInt(PLayerInfo.KEY_CLASSIC_HISCORE, PLayerInfo.MapPlayer.HightScore);
			}
		}
		return PLayerInfo.MapPlayer.HightScore;
	}


}