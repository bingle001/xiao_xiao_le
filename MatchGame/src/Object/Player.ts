// 玩家针对每一关卡的数据 实体类
class Player {

	public Level: number;
	public Name: string;
	public Locked: boolean;
	public Stars: number;
	public HightScore: number;
	public Background: number;

	/// 生成字符串拼接,类似于JSON
	public ToSaveString(): string {
		let s: string = this.Locked + "," + this.Stars + "," + this.HightScore + "," + this.Background + ",";
		return s;
	}

}

// 玩家保存记录实体类
class PlayerUtils {
	private KEY_DATA: string = "DATA";
	private data: string = "";
	private dataSplit: string[];
	private p: Player;

	/// 保存玩家数据,保存的过程有点类似于JSON
	public Save(Maps: Player[]): void {
		//PlayerPrefs.DeleteKey(KEY_DATA);
		for (let i in Maps) {
			let item: Player = Maps[i];
			this.data += item.ToSaveString();
		}
		PlayerPrefs.SetString(this.KEY_DATA, this.data);
	}

	/// 加载玩家数据
	public Load(): Player[] {
		let list: Player[] = [];
		let data: string = PlayerPrefs.GetString(this.KEY_DATA, "");
		let dataSplit = data.split(',');

		for (let i = 0; i < 297; i++) {
			let p = new Player();
			p.Level = i + 1;
			p.Name = String(i + 1);
			p.Locked = Boolean(dataSplit[i * 4]);
			p.Stars = Number(dataSplit[i * 4 + 1]);
			p.HightScore = Number(dataSplit[i * 4 + 2]);
			p.Background = Number(dataSplit[i * 4 + 3]);
			list.push(p)
		}
		return list;
	}
}