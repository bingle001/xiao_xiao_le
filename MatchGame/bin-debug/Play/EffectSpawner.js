var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 特效产生器（挂载到SpawnController游戏对象上）
// 职责:产生各种特效
var EffectSpawner = (function () {
    function EffectSpawner() {
        this.REFRESH_COMBO_TIME = 2;
        this.BOOM_TIME = 0.5;
        this.ICECRASH_TIME = 0.5;
        this.JEWELCASH_TIME = 0.35;
        this.SCORESHOW_TIME = 0.5;
        this.THUNDER_TIME = 0.4;
        this.FILEARROW_TIME = 0.4;
        this.ComboCount = 0;
        this.ThunderCount = 0;
        this.PowerCount = 0;
        this.ComboCountdown = 0;
        this.EnergyStack = 0;
        this.isEnergyInc = false;
    }
    EffectSpawner.Awake = function () {
        EffectSpawner.effect = new EffectSpawner();
    };
    EffectSpawner.prototype.start = function (effectParent) {
        this.parent = effectParent;
        this.parent.removeChildren();
        var list = [];
        for (var x = 0; x < 7; x++) {
            var arr = [];
            for (var y = 0; y < 9; y++) {
                var ani = new BashAni();
                ani.x = Global.posX(x);
                ani.y = Global.posY(y);
                this.parent.addChild(ani);
                arr.push(ani);
            }
            list.push(arr);
        }
        this.JewelCrashArray = list;
    };
    EffectSpawner.prototype.ContinueCombo = function () {
        this.ComboCountdown = this.REFRESH_COMBO_TIME;
    };
    EffectSpawner.prototype.ComBoInc = function () {
        this.ComboCount++;
    };
    EffectSpawner.prototype.ScoreInc = function (pos) {
        var scorebonus = 10 + this.ComboCount * 10;
        if (PlayerInfo.MODE != 1) {
            if (PlayerInfo.Info.Score < PlayerInfo.MapPlayer.Level * 5000)
                Timer.timer.ScoreBarProcess(scorebonus);
            else if (GameController.action.GameState == GameState.PLAYING) {
                Timer.timer.ClassicLvUp();
            }
        }
        else {
            if (GameController.action.GameState == GameState.PLAYING)
                PlayerInfo.Info.Score += scorebonus;
            this.BonusEffect();
            this.MiniStar(pos);
        }
        this.ScoreEff(scorebonus, pos);
        this.SetScore(PlayerInfo.Info.Score);
    };
    EffectSpawner.prototype.BonusEffect = function () {
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
    };
    EffectSpawner.prototype.EnergyInc = function () {
        if (!this.isEnergyInc) {
            //StartCoroutine(IEEnergyInc());
            this.IEEnergyInc();
        }
    };
    //TODO 应该是个能量槽增长过程
    EffectSpawner.prototype.IEEnergyInc = function () {
        Debug.Log("EffectSpawner.IEEnergyInc()");
        this.isEnergyInc = true;
        var d = 1 / 210;
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
    };
    //TODO 应该是个飘字动画
    EffectSpawner.prototype.ScoreEff = function (score, pos) {
        debug("飘字动画 ScoreEff");
        // let tmp: GameObject = this.EffectPrefabs[4];// (GameObject)Instantiate(EffectPrefabs[4]);
        // tmp.transform.GetChild(0).GetComponent<TextMesh>().text = score.ToString();
        // tmp.transform.SetParent(parent.transform, false);
        // tmp.transform.position = new Vector2(pos.x, pos.y, tmp.transform.position.z);
        // Destroy(tmp, SCORESHOW_TIME);
    };
    EffectSpawner.prototype.SetLevel = function (lv) {
        // this.level.text = lv.toString();
    };
    EffectSpawner.prototype.SetBest = function (bestscore) {
        // this.best.text = bestscore.toString();
    };
    EffectSpawner.prototype.SetScore = function (_score) {
        // this.Score.text = _score.toString();
    };
    // 创建宝石销毁动画并返回
    EffectSpawner.prototype.JewelCash = function (pos) {
        //TODO 创建宝石动画
        var tmp = new GameObject(); // (GameObject)Instantiate(EffectPrefabs[0]);
        // tmp.transform.SetParent(JewelCrashParent.transform, false);
        // tmp.transform.localPosition = new Vector2(pos.x, pos.y, -0.2f);
        return tmp;
        // Destroy(tmp, JEWELCASH_TIME);
    };
    EffectSpawner.prototype.Thunder = function (pos) {
        // // Debug.Break();
        // // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[3]);
        // // tmp.transform.SetParent(parent.transform, false);
        // // tmp.transform.position = new Vector2 (pos.x,pos.y,-2.1f);
        // // Destroy(tmp, THUNDER_TIME);
        // debug("todo");
        // this.MGE(this.Energy.transform.position, pos, -0.4f);
        // let tmp = new Vector2(this.Energy.x, this.Energy.y);
        // this.MGE2(tmp, pos, -0.4);
    };
    EffectSpawner.prototype.boom = function (pos) {
        //TODO 应该是爆炸特效
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[1]);
        // SoundController.Sound.Boom();
        // tmp.transform.SetParent(parent.transform, false);   //播放在特效层中
        // tmp.transform.position = pos;
        // this.Destroy(tmp, BOOM_TIME);    //延时销毁
    };
    // (buff效果)
    // 播放爆炸动画
    EffectSpawner.prototype.Enchant = function (obj) {
        // TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[2]);
        // tmp.transform.SetParent(obj.transform, false);
    };
    // (buff效果)
    // 在宝石的第一个子对像下产生一个Buff对象
    EffectSpawner.prototype.ThunderRow = function (obj, power) {
        // TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[5]);
        // tmp.transform.SetParent(obj.transform.GetChild(0).transform, false);
        // if (power == 3)
        //     tmp.transform.localEulerAngles = new Vector2(0, 0, 90);
    };
    // 播放火攻击，行或列
    EffectSpawner.prototype.FireArrow = function (pos, c) {
        //TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[6]);
        // tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
        // tmp.transform.position = new Vector2(pos.x, pos.y, -2.2f);
        // if (c)
        //     tmp.transform.localEulerAngles = new Vector2(0, 0, 90);
        // Destroy(tmp, FILEARROW_TIME);
    };
    // (buff效果)
    // 产生一个时钟技能
    EffectSpawner.prototype.Clock = function (obj) {
        //TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[7]);
        // tmp.transform.SetParent(obj.transform.GetChild(0).transform, false);
    };
    EffectSpawner.prototype.StarWinEffect = function (pos) {
        // TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[8]);
        // tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
        // tmp.transform.position = new Vector2(pos.x, pos.y, tmp.transform.position.z);
        // Animation anim = tmp.GetComponent<Animation>();
        // StarEffectAnim(anim, tmp);
        // Destroy(tmp, 1f);
    };
    // 在指定的格子上播放冰冻动画
    EffectSpawner.prototype.IceCrash = function (pos) {
        // TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[9]);
        // tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
        // tmp.transform.position = GribManager.cell.GribCell[(int)pos.x, (int)pos.y].transform.position;
        // Destroy(tmp, ICECRASH_TIME);//延时销毁
    };
    // 在指定的格子上播放锁动画
    EffectSpawner.prototype.LockCrash = function (pos) {
        // TODO
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[10]);
        // tmp.transform.SetParent(parent.transform, false);  //播放在特效层中
        // tmp.transform.position = GribManager.cell.GribCell[(int)pos.x, (int)pos.y].transform.position;
        // Destroy(tmp, ICECRASH_TIME);//延时销毁
    };
    EffectSpawner.prototype.StarEffectAnim = function (anim, tmp) {
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
    };
    EffectSpawner.prototype.ComboTick = function () {
        // while (true)
        // {
        //     if (ComboCountdown > 0)
        //         ComboCountdown -= Time.deltaTime;
        //     else
        //         ComboCount = 0;
        //     yield return null;
        // }
    };
    EffectSpawner.prototype.MGE = function (pos, target) {
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[11]);
        // tmp.transform.SetParent(parent.transform, false);
        // tmp.transform.position = new Vector2(pos.x, pos.y, -0.22f);
        // float AngleRad = Mathf.Atan2(target.y - pos.y, target.x - pos.x);
        // float AngleDeg = (180 / Mathf.PI) * AngleRad;
        // tmp.transform.rotation = Quaternion.Euler(0, 0, AngleDeg);
        // Ulti.MoveTo(tmp, target, 0.4f);
        // Destroy(tmp, 0.4f);
        SoundController.Sound.Gun();
        var tmp = new GameObject();
        return tmp;
    };
    EffectSpawner.prototype.MGE2 = function (pos, target, z) {
        var tmp = this.MGE(pos, target);
        // tmp.transform.position += new Vector2(pos.x, pos.y, z);
        return tmp;
    };
    // 播放积分特效
    EffectSpawner.prototype.glass = function () {
        // if (PLayerInfo.MODE == 1)
        //     redglass.enabled = true;
        // //redglass.Play("glass");
        // //Debug.Log("bla");
    };
    EffectSpawner.prototype.MiniStar = function (startpos) {
        // GameObject tmp = (GameObject)Instantiate(EffectPrefabs[12]);
        // tmp.transform.SetParent(parent.transform, false);
        // Ulti.MoveTo(tmp, startpos, new Vector2(-2.485f, 4.418f), 1.2f, -2.2f);
        // Destroy(tmp, 1.2f);
    };
    return EffectSpawner;
}());
__reflect(EffectSpawner.prototype, "EffectSpawner");
//# sourceMappingURL=EffectSpawner.js.map