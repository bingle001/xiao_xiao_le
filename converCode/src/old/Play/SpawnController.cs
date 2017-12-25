using UnityEngine;
using System.Collections;

/// <summary>
/// 滑落控制器 组件（挂在 SpawnController游戏对象上）
/// 此类主要用于计算消除后的滑落，并产生新的方块。属于控制器类
/// </summary>
public class SpawnController : MonoBehaviour
{

    /// <summary>
    /// 滑落延迟
    /// </summary>
    public float DELAY;


    /// <summary>
    /// 当enable=true后,则会重新启动Update
    /// </summary>
    void Update()
    {
        DELAY -= Time.deltaTime;
        //到计时结束:则开始启动滑落检测 
        if (DELAY <= 0)
        {
            //启动 协程
            StartCoroutine(DropAndSpawn());
            this.enabled = false;
        }
    }

    IEnumerator DropAndSpawn()
    {
        Drop();
        yield return new WaitForEndOfFrame();
        Spawn();
        BonusPower();
        ShowStar();
    }

    /// <summary>
    /// 对所有方块进行下落计算（冒泡排序）,调整位置,并播放下落动画
    /// 下落计算完毕后，所有空位均在二维数组顶部。（以方便后面产生新方块）
    /// </summary>
    void Drop()
    {
        for (int y = 0; y < 9; y++)
        {
            for (int x = 0; x < 7; x++)
            {
                if (JewelSpawner.spawn.JewelGribScript[x, y] != null && GribManager.cell.GribCellObj[x, y].cell.CellEffect != 4)
                    JewelSpawner.spawn.JewelGribScript[x, y].getNewPosition();
            }
        }
    }

    /// <summary>
    /// 产生新方块,并播放下落动画
    /// </summary>
    void Spawn()
    {
        int[] h = new int[7];
        for (int x = 0; x < 7; x++)
        {
            int s = 0;
            for (int y = 0; y < 9; y++)
            {
                if (GribManager.cell.GribCellObj[x, y] != null && GribManager.cell.GribCellObj[x, y].cell.CellEffect == 4)
                    s = y + 1;
            }
            for (int y = s; y < 9; y++)
            {
                if (GameController.action.GameState == (int)Timer.GameState.PLAYING)
                    if (GribManager.cell.GribCellObj[x, y] != null && JewelSpawner.spawn.JewelGribScript[x, y] == null)
                    {
                        Object temp = JewelSpawner.spawn.JewelGrib[x, y];
                        GameObject tmp = JewelSpawner.spawn.JewelInstantiate(x, y);
                        if (PLayerInfo.MODE == 1 && Random.value > 0.99f)
                        {
                            tmp.GetComponent<JewelObj>().jewel.JewelPower = 4;
                            EffectSpawner.effect.Clock(tmp);
                        }
                        tmp.transform.localPosition = new Vector3(tmp.transform.localPosition.x, 10 + h[x]);
                        h[x]++;

                        //播放滑落动画
                        StartCoroutine(Ulti.IEDrop(tmp, new Vector2(x, y), GameController.DROP_SPEED));
                        JewelObj script = tmp.GetComponent<JewelObj>();
                        script.render.enabled = true;
                    }
            }
        }
        StartCoroutine(checkNomoremove());
    }

    /// <summary>
    /// check no more move
    /// </summary>
    /// <returns></returns>
    IEnumerator checkNomoremove()
    {
        yield return new WaitForSeconds(0.5f);
        if (!Supporter.sp.isNoMoreMove())
        {
            if (PLayerInfo.MODE == 1)
            {
                Timer.timer.NoSelect.SetActive(true);
                StartCoroutine(ReSpawnGrib());
            }
            else if (true)
            {
                Timer.timer.NoSelect.SetActive(true);
                Timer.timer.Lost();
            }
        }
    }

    IEnumerator ReSpawnGrib()
    {
        Timer.timer.Nomove.SetActive(true);
        for (int x = 0; x < 7; x++)
        {
            for (int y = 0; y < 9; y++)
            {
                if (JewelSpawner.spawn.JewelGribScript[x, y] != null && JewelSpawner.spawn.JewelGribScript[x, y].jewel.JewelType != 99)
                    JewelSpawner.spawn.JewelGribScript[x, y].JewelDisable();
            }
        }
        yield return new WaitForSeconds(0.7f);
        StartCoroutine(JewelSpawner.spawn.Respawn());
    }


    void BonusPower()
    {
        if (GameController.action.isAddPower)
        {
            GameController.action.AddBonusPower();
            GameController.action.isAddPower = false;
        }
    }

    /// <summary>
    /// 显示星星宝石
    /// </summary>
    void ShowStar()
    {
        if (GameController.action.isShowStar)
        {
            GameController.action.isShowStar = false;
            GameController.action.ShowStar();
            GameController.action.isStar = true;
        }
    }
}
