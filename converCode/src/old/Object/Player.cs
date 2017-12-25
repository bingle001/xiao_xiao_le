using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Xml.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

/// <summary>
/// 玩家针对每一关卡的数据 实体类
/// </summary>
[System.Serializable]
public class Player
{
    public int Level;
    public string Name;
    public bool Locked;
    public int Stars;
    public int HightScore;
    public int Background;

    /// <summary>
    /// 生成字符串拼接,类似于JSON
    /// </summary>
    /// <returns></returns>
    public string ToSaveString()
    {
        string s = Locked + "," + Stars + "," + HightScore + "," + Background + ",";
        return s;
    }
}

/// <summary>
/// 玩家保存记录实体类
/// </summary>
public class PlayerUtils
{
    private string KEY_DATA = "DATA";
    private string data = "";
    private string[] dataSplit;
    private Player p;

    /// <summary>
    /// 保存玩家数据,保存的过程有点类似于JSON
    /// </summary>
    /// <param name="Maps"></param>
    public void Save(List<Player> Maps)
    {
        //PlayerPrefs.DeleteKey(KEY_DATA);
        foreach (var item in Maps)
        {
            data += item.ToSaveString();
        }
        PlayerPrefs.SetString(KEY_DATA, data);
    }

    /// <summary>
    /// 加载玩家数据
    /// Load data load by PlayerPrefs, set to buttons level on map scene 
    /// </summary>
    /// <returns></returns>
    public List<Player> Load()
    {
        List<Player> list = new List<Player>();

        string data = PlayerPrefs.GetString(KEY_DATA, "");

        dataSplit = data.Split(',');

        for (int i = 0; i < 297; i++)
        {
            p = new Player();
            p.Level = i + 1;
            p.Name = (i + 1).ToString();
            p.Locked = bool.Parse(dataSplit[i * 4]);
            p.Stars = int.Parse(dataSplit[i * 4 + 1]);
            p.HightScore = int.Parse(dataSplit[i * 4 + 2]);
            p.Background = int.Parse(dataSplit[i * 4 + 3]);
            list.Add(p);
        }

        return list;
    }
}

