using UnityEngine;
using System.Collections;

/// <summary>
/// 游戏背景 组件（挂在Screen/Background 游戏对像下）
/// </summary>
public class SetBackground : MonoBehaviour
{

    public Sprite[] Background;     // array background

    void Start()
    {
        // set background image by PLayerInfo.BACKGROUND
        GetComponent<SpriteRenderer>().sprite = Background[PLayerInfo.BACKGROUND];
    }

}
