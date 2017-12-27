/// 支持者组件 （挂在Supporter游戏对象下）
/// 职责计算出那些方块可以消除,并提示给玩家.
class Supporter extends MonoBehaviour {

	public static sp: Supporter;

	public isNomove: boolean;
	public AvaiableMove: Vector2[];
	private AvaiableObj: JewelObj[] = [];// new JewelObj[2];
	private SP_DELAY = 5;	//5秒后开始提示
	private vtmplist: Vector2[];
	private obj: JewelObj;

	public constructor() {
		super();
	}

	public static Awake(): void {
		Supporter.sp = new Supporter();
	}

	public Update(): void {
		if (this.SP_DELAY > 0 && GameController.action.GameState == GameState.PLAYING && !this.isNomove) {
			this.SP_DELAY -= Time.deltaTime;
		}
		else if (!this.isNomove && GameController.action.GameState == GameState.PLAYING) {
			this.RefreshTime();
			this.isNoMoreMove();
			this.PlaySuggestionAnim();
		}
	}

	public isNoMoreMove(): boolean {
		this.StopSuggestionAnim();
		this.AvaiableMove = [];// new Vector2[2];
		this.AvaiableObj = [];// new JewelObj[2];

		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 9; y++) {
				if (JewelSpawner.spawn.JewelGribScript[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 0) {
					this.obj = JewelSpawner.spawn.JewelGribScript[x][y];
					let obj1: JewelObj = this.MoveChecker(x, y, this.obj);
					if (obj1 != null) {
						this.AvaiableMove[0] = this.obj.jewel.JewelPosition;
						this.AvaiableObj[0] = JewelSpawner.spawn.JewelGribScript[this.AvaiableMove[0].x][this.AvaiableMove[0].y];
						this.AvaiableMove[1] = obj1.jewel.JewelPosition;
						this.AvaiableObj[1] = JewelSpawner.spawn.JewelGribScript[this.AvaiableMove[1].x][this.AvaiableMove[1].y];
						this.isNomove = false;
						return true;
					}

				}
			}
		}
		this.isNomove = true;
		return false;
	}

	public RefreshTime(): void {
		this.SP_DELAY = 5;
	}

	private MoveChecker(x: number, y: number, obj: JewelObj): JewelObj {
		this.vtmplist = this.getListPos(x, y);
		for (let i in this.vtmplist) {
			let item: Vector2 = this.vtmplist[i];
			if (JewelSpawner.spawn.JewelGribScript[item.x][item.y] != null && JewelSpawner.spawn.JewelGribScript[item.x][item.y].jewel.JewelType == 8)
				return JewelSpawner.spawn.JewelGribScript[item.x][item.y];
			else {
				let NeiObj1: JewelObj[] = Ulti.ListPlus(obj.GetCollumn(item, obj.jewel.JewelType, null),
					obj.GetRow(item, obj.jewel.JewelType, null), obj);
				if (NeiObj1.length >= 3)
					return JewelSpawner.spawn.JewelGribScript[item.x][item.y];
			}
		}

		return null;
	}


	private getListPos(x: number, y: number): Vector2[] {
		this.vtmplist = [];// new List<Vector2>();
		if (y + 1 < 9 && GribManager.cell.GribCellObj[x][y + 1] != null && GribManager.cell.GribCellObj[x][y + 1].cell.CellEffect == 0)
			this.vtmplist.push(new Vector2(x, y + 1));
		if (y - 1 >= 0 && GribManager.cell.GribCellObj[x][y - 1] != null && GribManager.cell.GribCellObj[x][y - 1].cell.CellEffect == 0)
			this.vtmplist.push(new Vector2(x, y - 1));
		if (x + 1 < 7 && GribManager.cell.GribCellObj[x + 1][y] != null && GribManager.cell.GribCellObj[x + 1][y].cell.CellEffect == 0)
			this.vtmplist.push(new Vector2(x + 1, y));
		if (x - 1 >= 0 && GribManager.cell.GribCellObj[x - 1][y] != null && GribManager.cell.GribCellObj[x - 1][y].cell.CellEffect == 0)
			this.vtmplist.push(new Vector2(x - 1, y));
		return this.vtmplist;
	}

	/// 播放一对宝石,左右摇晃动画
	public PlaySuggestionAnim(): void {
		if (this.AvaiableObj[0] != null && this.AvaiableObj[1] != null) {
			this.AvaiableObj[0].JewelSuggesttion();
			this.AvaiableObj[1].JewelSuggesttion();
		}
	}
	public StopSuggestionAnim(): void {
		if (this.AvaiableObj[0] != null) {
			this.AvaiableObj[0].JewelStopSuggesttion();
		}
		if (this.AvaiableObj[1] != null) {
			this.AvaiableObj[1].JewelStopSuggesttion();
		}
	}




}