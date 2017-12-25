using UnityEngine;
using System.Collections;

/// <summary>
/// 宝石 实体类
/// </summary>
[System.Serializable]
public class Jewel
{

    public int JewelType;           // type of jewel

    public Vector2 JewelPosition;   // position of jewel in vitual map

    /// <summary>
    /// 宝石拥有技能
    /// </summary>
    public int JewelPower;          // type of effect 

}
