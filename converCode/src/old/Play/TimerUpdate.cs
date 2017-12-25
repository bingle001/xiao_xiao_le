using UnityEngine;
using System.Collections;

/// <summary>
/// 计时器更新组件 (挂在计时器 游戏对象上)
/// </summary>
public class TimerUpdate : MonoBehaviour {

	void Update () {
        Timer.timer.Tick();
	}
}
