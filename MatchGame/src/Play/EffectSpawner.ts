// 特效产生器（挂载到SpawnController游戏对象上）
// 职责:产生各种特效
class EffectSpawner {

	public static effect: EffectSpawner;

	// 父容器对象
	public parent: GameObject;

	// 特效Prefab列表
	public EffectPrefabs: GameObject[];

	// 魔法瓶子动画 引用
	public redglass;	//Animator

	// 宝石销毁动画缓存,避免销毁后在重新创建动画对象
	public JewelCrashArray: GameObject[][];

	// 宝石销毁动画缓存的父容器，即所有销毁动画均挂在此对象像。
	public JewelCrashParent: GameObject;

	public level: eui.Label;
	public best: eui.Label;
	public Score: eui.Label;
	public Energy: eui.Image;

	public REFRESH_COMBO_TIME = 2;
	public BOOM_TIME = 0.5;
	public ICECRASH_TIME = 0.5;
	public JEWELCASH_TIME = 0.35;
	public SCORESHOW_TIME = 0.5;
	public THUNDER_TIME = 0.4;
	public FILEARROW_TIME = 0.4;

	private ComboCount = 0;
	private ThunderCount = 0;
	private PowerCount = 0;
	public ComboCountdown = 0;
	private EnergyStack = 0;

	private isEnergyInc: boolean = false;

	public static Awake(): void {
		if (EffectSpawner.effect == null) {
			EffectSpawner.effect = new EffectSpawner();
			EffectSpawner.effect.JewelCrashArray = Utils.initVector2(GameObject, 7, 9);// new GameObject[7, 9];
		}
	}

	public ContinueCombo(): void {
		this.ComboCountdown = this.REFRESH_COMBO_TIME;
	}

	public ComBoInc(): void {
		this.ComboCount++;
	}

	public ScoreInc(pos: Vector2): void {
		let scorebonus = 10 + this.ComboCount * 10;
		if (PLayerInfo.MODE != 1) {
			if (PLayerInfo.Info.Score < PLayerInfo.MapPlayer.Level * 5000)
				Timer.timer.ScoreBarProcess(scorebonus);
			else if (GameController.action.GameState == GameState.PLAYING) {
				Timer.timer.ClassicLvUp();
			}
		}
		else {
			if (GameController.action.GameState == GameState.PLAYING)
			PLayerInfo.Info.Score += scorebonus;
			this.BonusEffect();
			this.MiniStar(pos);
		}

		this.ScoreEff(scorebonus, pos);
		this.SetScore(PLayerInfo.Info.Score);
	}

	private BonusEffect(): void {
		this.ThunderCount++;
		this.PowerCount++;
		this.EnergyStack += 1 / 21;
		this.EnergyInc();
		if (this.ThunderCount >= 21) {
			GameController.action.DestroyRandom();
			this.ThunderCount = 0;
			// this.Energy.fillAmount = 0;
			//TODO
			this.EnergyStack = 0;
		}
		if (this.PowerCount >= 32) {
			this.PowerCount = 0;
			GameController.action.isAddPower = true;
		}
	}

	private EnergyInc(): void {
		if (!this.isEnergyInc) {
			//StartCoroutine(IEEnergyInc());
			this.IEEnergyInc();
		}
	}

	//TODO 应该是个能量槽增长过程
	private IEEnergyInc(): void {
		Debug.Log("EffectSpawner.IEEnergyInc()");
		this.isEnergyInc = true;
		let d = 1 / 210;
		// while (this.EnergyStack > 0)
		// {
		//     this.Energy.fillAmount += d;
		//     EnergyStack -= d;
		//     yield return null;
		//     if (Energy.fillAmount == 1)
		//         Energy.fillAmount = 0;
		// }
		this.EnergyStack = 0;
		this.isEnergyInc = false;
	}

	//TODO 应该是个飘字动画
	private ScoreEff(score: number, pos: Vector2): void {
		debug("飘字动画 ScoreEff");
		// let tmp: GameObject = this.EffectPrefabs[4];// (GameObject)Instantiate(EffectPrefabs[4]);
		// tmp.transform.GetChild(0).GetComponent<TextMesh>().text = score.ToString();
		// tmp.transform.SetParent(parent.transform, false);
		// tmp.transform.position = new Vector2(pos.x, pos.y, tmp.transform.position.z);
		// Destroy(tmp, SCORESHOW_TIME);
	}

	public SetLevel(lv: number): void {
		this.level.text = lv.toString();
	}

	public SetBest(bestscore: number): void {
		this.best.text = bestscore.toString();
	}

	public SetScore(_score: number): void {
		this.Score.text = _score.toString();
	}

	// 创建宝石销毁动画并返回
	public JewelCash(pos: Vector2): GameObject {
		//TODO 创建宝石动画
		let tmp: GameObject = new GameObject();// (GameObject)Instantiate(EffectPrefabs[0]);
		// tmp.transform.SetParent(JewelCrashParent.transform, false);
		// tmp.transform.localPosition = new Vector2(pos.x, pos.y, -0.2f);
		return tmp;
		// Destroy(tmp, JEWELCASH_TIME);
	}

	public Thunder(pos: Vector2): void {
		// // Debug.Break();
		// // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[3]);
		// // tmp.transform.SetParent(parent.transform, false);
		// // tmp.transform.position = new Vector2 (pos.x,pos.y,-2.1f);
		// // Destroy(tmp, THUNDER_TIME);
		// debug("todo");

		// this.MGE(this.Energy.transform.position, pos, -0.4f);

		let tmp = new Vector2(this.Energy.x, this.Energy.y);
		this.MGE2(tmp, pos, -0.4);
	}

	public boom(pos: Vector2): void {
		//TODO 应该是爆炸特效
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[1]);
		// SoundController.Sound.Boom();
		// tmp.transform.SetParent(parent.transform, false);   //播放在特效层中
		// tmp.transform.position = pos;
		// this.Destroy(tmp, BOOM_TIME);    //延时销毁
	}

	// (buff效果)
	// 播放爆炸动画
	public Enchant(obj: GameObject): void {
		// TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[2]);
		// tmp.transform.SetParent(obj.transform, false);
	}

	// (buff效果)
	// 在宝石的第一个子对像下产生一个Buff对象
	public ThunderRow(obj: GameObject, power: number): void {
		// TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[5]);
		// tmp.transform.SetParent(obj.transform.GetChild(0).transform, false);
		// if (power == 3)
		//     tmp.transform.localEulerAngles = new Vector2(0, 0, 90);
	}

	// 播放火攻击，行或列
	public FireArrow(pos: Vector2, c: boolean): void {
		//TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[6]);
		// tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
		// tmp.transform.position = new Vector2(pos.x, pos.y, -2.2f);
		// if (c)
		//     tmp.transform.localEulerAngles = new Vector2(0, 0, 90);
		// Destroy(tmp, FILEARROW_TIME);
	}

	/// (buff效果)
	/// 产生一个时钟技能
	public Clock(obj: GameObject): void {
		//TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[7]);
		// tmp.transform.SetParent(obj.transform.GetChild(0).transform, false);
	}

	public StarWinEffect(pos: Vector2): void {
		// TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[8]);
		// tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
		// tmp.transform.position = new Vector2(pos.x, pos.y, tmp.transform.position.z);
		// Animation anim = tmp.GetComponent<Animation>();
		// StarEffectAnim(anim, tmp);
		// Destroy(tmp, 1f);

	}

	/// 在指定的格子上播放冰冻动画
	public IceCrash(pos: Vector2): void {
		// TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[9]);
		// tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
		// tmp.transform.position = GribManager.cell.GribCell[(int)pos.x, (int)pos.y].transform.position;
		// Destroy(tmp, ICECRASH_TIME);//延时销毁

	}

	/// 在指定的格子上播放锁动画
	public LockCrash(pos: Vector2): void {
		// TODO
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[10]);
		// tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
		// tmp.transform.position = GribManager.cell.GribCell[(int)pos.x, (int)pos.y].transform.position;
		// Destroy(tmp, ICECRASH_TIME);//延时销毁
	}

	private StarEffectAnim(anim: Animation, tmp: GameObject): void {
		//Debug.Break();
		//         anim.enabled = true;
		//         AnimationClip animclip = new AnimationClip();
		// #if UNITY_5
		//                 animclip.legacy = true;
		// #endif
		//         AnimationCurve curveScalex = AnimationCurve.Linear(0, tmp.transform.localScale.x, 1, 3);
		//         //AnimationCurve curveScaley = AnimationCurve.Linear(0, tmp.transform.localScale.y, 1, 3);
		//         AnimationCurve curvex = AnimationCurve.Linear(0, tmp.transform.position.x, 1, 0);
		//         AnimationCurve curvey = AnimationCurve.Linear(0, tmp.transform.position.y, 1, 0);
		//         AnimationCurve curvez = AnimationCurve.Linear(0, tmp.transform.position.z, 1, tmp.transform.position.z);
		//         AnimationCurve curveColora = AnimationCurve.Linear(0, 1, 1, 0);

		//         animclip.SetCurve("", typeof(Transform), "m_LocalScale.x", curveScalex);
		//         animclip.SetCurve("", typeof(Transform), "m_LocalScale.y", curveScalex);
		//         animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
		//         animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
		//         animclip.SetCurve("", typeof(Transform), "localPosition.z", curvez);
		//         animclip.SetCurve(tmp.transform.GetChild(0).name, typeof(SpriteRenderer), "m_Color.a", curveColora);
		//         // animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);
		//         anim.wrapMode = WrapMode.Once;
		//         anim.AddClip(animclip, "Startwin");
		//         anim.Play("Startwin");
	}

	public ComboTick(): void {
		// while (true)
		// {
		//     if (ComboCountdown > 0)
		//         ComboCountdown -= Time.deltaTime;
		//     else
		//         ComboCount = 0;
		//     yield return null;
		// }
	}

	public MGE(pos: Vector2, target: Vector2): GameObject {
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[11]);
		// tmp.transform.SetParent(parent.transform, false);
		// tmp.transform.position = new Vector2(pos.x, pos.y, -0.22f);

		// float AngleRad = Mathf.Atan2(target.y - pos.y, target.x - pos.x);

		// float AngleDeg = (180 / Mathf.PI) * AngleRad;

		// tmp.transform.rotation = Quaternion.Euler(0, 0, AngleDeg);

		// Ulti.MoveTo(tmp, target, 0.4f);
		// Destroy(tmp, 0.4f);

		SoundController.Sound.Gun();

		let tmp = new GameObject();
		return tmp;
	}

	public MGE2(pos: Vector2, target: Vector2, z: number): GameObject {
		let tmp = this.MGE(pos, target);
		// tmp.transform.position += new Vector2(pos.x, pos.y, z);
		return tmp;
	}

	// 播放积分特效
	public glass(): void {
		// if (PLayerInfo.MODE == 1)
		//     redglass.enabled = true;
		// //redglass.Play("glass");
		// //Debug.Log("bla");
	}

	public MiniStar(startpos: Vector2): void {
		// GameObject tmp = (GameObject)Instantiate(EffectPrefabs[12]);
		// tmp.transform.SetParent(parent.transform, false);
		// Ulti.MoveTo(tmp, startpos, new Vector2(-2.485f, 4.418f), 1.2f, -2.2f);
		// Destroy(tmp, 1.2f);
	}



}