/// 滑落控制器 组件（挂在 SpawnController游戏对象上）
/// 此类主要用于计算消除后的滑落，并产生新的方块。属于控制器类
class SpawnController {

	public constructor() {
	}

	// 滑落延迟
	private _DELAY: number = 0;
	private _enabled: boolean = false;

	public setDelay(delay: number): void{
		this._DELAY = delay;

		if (!this._enabled) {
			this._enabled = true;
			Time.addFrameCall(this.Update, this);
		}
	}

	/**
	 * 设置掉落时间，只会取最大值，最后个掉落完毕后，才进行继续检测
	 * @param dropTime 掉落时间，秒！
	 */
	public setLastDelay(dropTime: number): void{
		if (dropTime > this._DELAY) {
			this._DELAY = dropTime;
		}

		if (this._DELAY > 0) {
			if (!this._enabled) {
				this._enabled = true;
				Time.addFrameCall(this.Update, this);
			}	
		}
	}

	/// 当enable=true后,则会重新启动Update
	public Update(): void {
		this._DELAY -= Time.deltaTime;
		if (this._DELAY <= 0) {	//到计时结束:则开始启动滑落检测 
			this.DropAndSpawn();

			Time.removeFrameCall(this.Update, this);
			this._enabled = false;
		}
	}

	private DropAndSpawn(): void {
		debug("开始掉落检测！");
		this.Drop();
		this.Spawn();
		this.BonusPower();
		this.ShowStar();
	}

	/// 对所有方块进行下落计算（冒泡排序）,调整位置,并播放下落动画
	/// 下落计算完毕后，所有空位均在二维数组顶部。（以方便后面产生新方块）
	private Drop(): void {
		for (let y = 0; y < 9; y++) {
			for (let x = 0; x < 7; x++) {
				if (JewelSpawner.spawn.JewelGrib[x][y] != null && GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect != 4) {
					JewelSpawner.spawn.JewelGrib[x][y].getNewPosition();
				}
			}
		}
	}

	/// 产生新方块,并播放下落动画
	private Spawn(): void {
		let count: number = 0;
		let h: number[] = Utils.initVector(7, 0);
		for (let x = 0; x < 7; x++) {
			let s = 0;
			for (let y = 0; y < 9; y++) {
				if (GribManager.cell.GribCellObj[x][y] != null && GribManager.cell.GribCellObj[x][y].cell.CellEffect == 4) {
					s = y + 1;
				}
			}
			for (let y = s; y < 9; y++) {
				if (GameController.action.GameState == GameState.PLAYING) {
					if (GribManager.cell.GribCellObj[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y] == null) {
						let tmp: JewelObj = JewelSpawner.spawn.JewelInstantiate(x, y);
						if (PlayerInfo.MODE == 1 && Random.value > 0.99) {
							(tmp as JewelObj).jewel.JewelPower = 4;
							EffectSpawner.effect.Clock(tmp);
						}
						tmp.y = Global.posY(9 + h[x]);//设置到屏幕外掉落下来
						h[x]++;

						//播放滑落动画
						Utils.IEDrop(tmp, new Vector2(x, y), GameController.DROP_SPEED);
						// let script: JewelObj = tmp as JewelObj;
						// script.render.enabled = true;	//掉落完了才能移动

						count++;
					}
				}
			}
		}
		debug("往下掉的宝石个数：", count);

		if (this._DELAY <= 0) {
			this.checkNomoremove();//StartCoroutine(checkNomoremove());
		}
	}

	/// check no more move
	private checkNomoremove(): void {
		if (!Supporter.sp.isNoMoreMove()) {
			if (PlayerInfo.MODE == 1) {
				// Timer.timer.NoSelect.SetActive(true);
				// StartCoroutine(ReSpawnGrib());
				Timer.timer.NoSelect.visible = true;
				this.ReSpawnGrib();
			}
			else if (true) {
				Timer.timer.NoSelect.visible = true;//Timer.timer.NoSelect.SetActive(true);
				Timer.timer.Lost();
			}
		}
	}

	private ReSpawnGrib(): void	//IEnumerator
	{
		Timer.timer.Nomove.visible = true;// SetActive(true);
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 9; y++) {
				if (JewelSpawner.spawn.JewelGrib[x][y] != null && JewelSpawner.spawn.JewelGrib[x][y].jewel.JewelType != 99)
					JewelSpawner.spawn.JewelGrib[x][y].JewelDisable();
			}
		}
		// yield return new WaitForSeconds(0.7f);
		JewelSpawner.spawn.Respawn();//StartCoroutine(JewelSpawner.spawn.Respawn());
	}


	private BonusPower(): void {
		if (GameController.action.isAddPower) {
			GameController.action.AddBonusPower();
			GameController.action.isAddPower = false;
		}
	}

	// 显示星星宝石
	private ShowStar(): void {
		if (GameController.action.isShowStar) {
			GameController.action.isShowStar = false;
			GameController.action.ShowStar();
			GameController.action.isStar = true;
		}
	}



}