class Ulti extends MonoBehaviour {


	public constructor() {
		super();
	}

	/// 将两个List合并
	/// 触发消除的方块
	public static ListPlus(l1: JewelObj[], l2: JewelObj[], bonus: JewelObj): JewelObj[] {
		let tmp = [];// new List<JewelObj>();
		for (let i = l1.length - 1; i >= 0; i--) {
			tmp.push(l1[i]);
		}
		if (bonus != null)
			tmp.push(bonus);

		for (let i = 0; i < l2.length; i++) {
			tmp.push(l2[i]);
		}

		return tmp;
	}

	/// 移动显示对象
	public static MoveTo(obj: GameObject, NewPos: Vector2, duration: number): void {
		// obj.SetActive(true);
		// Animation anim = obj.GetComponent<Animation>();
		// //if (anim.GetClipCount() > 1)
		// //{
		// //    Destroy(anim.GetClip("Moveto"));
		// //}
		// anim.enabled = true;
		// AnimationClip animclip = new AnimationClip();
		// AnimationCurve curvex = AnimationCurve.Linear(0, obj.transform.localPosition.x, duration, NewPos.x);
		// AnimationCurve curvey = AnimationCurve.Linear(0, obj.transform.localPosition.y, duration, NewPos.y);
		// AnimationCurve curvenable = AnimationCurve.Linear(0, 1, duration, 0);

		// animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
		// animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
		// animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);

		// anim.AddClip(animclip, "Moveto");
		// anim.Play("Moveto");
		// Destroy(animclip, duration);

		//TODO 移动显示对象，暂时直接用tween动画移动
		debug("移动显示对象:", obj, NewPos, duration);
		let tx: number = NewPos.x * 100;
		let ty: number = NewPos.y * 100;
		egret.Tween.removeTweens(obj);
		egret.Tween.get(obj).to({ x: tx, y: ty }, duration * 1000);
	}

	//     /// 补间动画 移动游戏物体到某位置.
	//     public static MoveTo2(obj:GameObject, NewPos:Vector2, float duration, float z):void
	//     {
	//         Animation anim = obj.GetComponent<Animation>();
	//         //if (anim.GetClipCount() > 1)
	//         //{
	//         //    anim.RemoveClip("Moveto");
	//         //}
	//         anim.enabled = true;
	//         AnimationClip animclip = new AnimationClip();
	// #if UNITY_5
	//             animclip.legacy = true;
	// #endif
	//         AnimationCurve curvex = AnimationCurve.Linear(0, obj.transform.localPosition.x, duration, NewPos.x);
	//         AnimationCurve curvey = AnimationCurve.Linear(0, obj.transform.localPosition.y, duration, NewPos.y);
	//         AnimationCurve curvez = AnimationCurve.Linear(0, z, duration, z);
	//         AnimationCurve curvenable = AnimationCurve.Linear(0, 1, duration, 0);

	//         animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
	//         animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
	//         animclip.SetCurve("", typeof(Transform), "localPosition.z", curvez);
	//         animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);

	//         anim.AddClip(animclip, "Moveto");
	//         anim.Play("Moveto");
	//         Destroy(animclip, duration);
	//     }
	public static MoveTo2(obj: GameObject, startpos: Vector2, NewPos: Vector2, duration: number, z: number): void {
		//         Animation anim = obj.GetComponent<Animation>();
		//         //if (anim.GetClipCount() > 1)
		//         //{
		//         //    anim.RemoveClip("Moveto");
		//         //}
		//         anim.enabled = true;
		//         AnimationClip animclip = new AnimationClip();
		// #if UNITY_5
		//                 animclip.legacy = true;
		// #endif
		//         AnimationCurve curvex = AnimationCurve.Linear(0, startpos.x, duration, NewPos.x);
		//         AnimationCurve curvey = AnimationCurve.Linear(0, startpos.y, duration, NewPos.y);
		//         AnimationCurve curvez = AnimationCurve.Linear(0, z, duration, z);
		//         AnimationCurve curvenable = AnimationCurve.Linear(0, 1, duration, 0);

		//         animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
		//         animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
		//         animclip.SetCurve("", typeof(Transform), "localPosition.z", curvez);
		//         animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);

		//         anim.AddClip(animclip, "Moveto");
		//         anim.Play("Moveto");
		//         Destroy(animclip, duration);
		debug("移动位置2:");
		obj.u3dX = startpos.x;
		obj.u3dY = startpos.y;
		this.MoveTo(obj, NewPos, duration);
	}

	/// 使用协程播放下落动画
	public static IEDrop(obj: GameObject, NewPos: Vector2, speed: number): void 	//IEnumerator
	{
		// JewelObj script = obj.GetComponent<JewelObj>();
		// Collider2D coll = obj.GetComponent<Collider2D>();
		// if (obj != null)
		// {
		//     Transform _tranform = obj.transform;
		//     coll.enabled = false;
		//     script.isMove = true;
		//     //!!!! 注意显示游戏对象即：obj中transform的localPosition与逻辑地图中的NewPos是一样，均使用的是左下角0,0然后往上一格则为0,1
		//     //这就解决了显示对象数据向逻辑数据同步的问题，即显示对象按逻辑对象的x,y进行移动到指定位置。
		//     while (_tranform != null && _tranform.localPosition.y - NewPos.y > 0.1f)
		//     {
		//         _tranform.localPosition -= new Vector3(0, Time.smoothDeltaTime * speed);
		//         yield return null;
		//     }
		//     if (_tranform != null)
		//     {
		//         //这块的数据和AS3中的闭包数据很像,即协程执行完比后,他的数据类似AS3中的闭包方法,即数据还是之前的数据.
		//         _tranform.localPosition = new Vector3(NewPos.x, NewPos.y);

		//         script.Bounce();
		//         script.RuleChecker();
		//         yield return new WaitForSeconds(0.2f);

		//         //开启碰撞器组件
		//         if (coll != null)
		//         {
		//             coll.enabled = true;
		//             script.isMove = false;
		//         }
		//     }
		// }

		debug("IEDrop : 使用协程使物体运动");
	}



}