using UnityEngine;
using System.Collections;

/// <summary>
/// 玩家信息 显示对象脚本
/// </summary>
public class PLayerInfo : MonoBehaviour
{

    public static PLayerInfo Info;      // infomations of player

    public static Player MapPlayer;     // player object

    public static byte MODE;            // mode : Arcade or Classic 

    public static int BACKGROUND;       // background of mode

    public int Score;

    public const string KEY_CLASSIC_HISCORE = "classichightscore";

    public TextMesh textlv;

    void Awake()
    {
        Info = this;
        BACKGROUND = MapPlayer.Background;

    }

    void Start()
    {
        Score = 0;
        EffectSpawner.effect.SetLevel(MapPlayer.Level);
        EffectSpawner.effect.SetBest(MapPlayer.HightScore);
        EffectSpawner.effect.SetScore(Score);
        textlv.text = MapPlayer.Level.ToString();
    }
}
