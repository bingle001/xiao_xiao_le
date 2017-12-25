using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// 宝石游戏对象 组件 (挂在 Jewel游戏对象下)
/// 职责:自身提供多种方法，用于宝石生命周期的自管理
/// </summary>
public class JewelObj : MonoBehaviour
{

    public Jewel jewel;

    public SpriteRenderer render;

    private const float DELAY = 0.2f;

    public bool Checked;

    public bool isMove;

    //delete jewel
    public void Destroy()
    {
        //从宝石数组中移除自身
        RemoveFromList((int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y);
        StartCoroutine(_Destroy());
    }

    /// <summary>
    /// 技能释放 power of jewel
    /// </summary>
    /// <param name="power"></param>
    void PowerProcess(int power)
    {
        switch (power)
        {
            case 1:
                GameController.action.PBoom((int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y);
                EffectSpawner.effect.boom(this.gameObject.transform.position);
                break;
            case 2:
                EffectSpawner.effect.FireArrow(transform.position, false);
                GameController.action.PDestroyRow((int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y);
                break;
            case 3:
                EffectSpawner.effect.FireArrow(transform.position, true);
                GameController.action.PDestroyCollumn((int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y);
                break;
            case 4:
                GameController.action.PBonusTime();
                break;
        }
    }

    //move jewel and destroy
    public void ReGroup(Vector2 pos)
    {
        StartCoroutine(_ReGroup(pos));
    }

    IEnumerator _ReGroup(Vector2 pos)
    {
        RemoveFromList((int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y);
        yield return new WaitForSeconds(DELAY - 0.015f);
        Ulti.MoveTo(this.gameObject, pos, DELAY);

        StartCoroutine(_Destroy());
    }

    /// <summary>
    /// 销毁自身
    /// </summary>
    /// <returns></returns>
    IEnumerator _Destroy()
    {
        GribManager.cell.GribCellObj[(int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y].CelltypeProcess();
        GameController.action.CellRemoveEffect((int)jewel.JewelPosition.x, (int)jewel.JewelPosition.y);

        yield return new WaitForSeconds(DELAY);
        if (jewel.JewelPower > 0)
        {
            PowerProcess(jewel.JewelPower);
        }
        GameController.action.drop.DELAY = GameController.DROP_DELAY;
        JewelCrash();

        yield return new WaitForEndOfFrame();
        EffectSpawner.effect.ScoreInc(this.gameObject.transform.position);

        yield return new WaitForEndOfFrame();
        EffectSpawner.effect.ContinueCombo();

        yield return new WaitForEndOfFrame();
        Supporter.sp.RefreshTime();
        StopAllCoroutines();        
        Destroy(gameObject);
    }

    /// <summary>
    /// 根据当前宝石显示对象，播放销毁动画
    /// </summary>
    void JewelCrash()
    {
        int x = (int)jewel.JewelPosition.x;
        int y = (int)jewel.JewelPosition.y;

        EffectSpawner.effect.JewelCrashArray[x, y].transform.position = new Vector3(transform.position.x, transform.position.y, -0.2f);
        EffectSpawner.effect.JewelCrashArray[x, y].SetActive(false);
        EffectSpawner.effect.JewelCrashArray[x, y].SetActive(true);
    }

    /// <summary>
    /// 重新调整JewelPosition的位置，并播放下落动画
    /// 此方法有点类似于排序，主要是处理当Map中有消除的方块后产生空位，此时需要将空位上方的方块移动到空位。
    /// （说白了就是冒泡排序，地图中消失的方块移动到后面）
    /// 将数组中Y轴的往下移动。全部移动完后，所有地图中空的位置均为后面的值，例如6、7、8这几个位置是空的）
    /// </summary>
    public void getNewPosition()
    {
        int newpos = (int)jewel.JewelPosition.y;
        int x = (int)jewel.JewelPosition.x;
        int oldpos = (int)jewel.JewelPosition.y;

        for (int y = newpos - 1; y >= 0; y--)
        {
            if (GribManager.cell.Map[x, y] != 0 && GribManager.cell.GribCellObj[x, y].cell.CellEffect != 4 && JewelSpawner.spawn.JewelGribScript[x, y] == null)
                newpos = y;
            else if (GribManager.cell.Map[x, y] != 0 && GribManager.cell.GribCellObj[x, y].cell.CellEffect == 4)
            {
                break;
            }
        }
        JewelSpawner.spawn.JewelGribScript[x, (int)jewel.JewelPosition.y] = null;
        JewelSpawner.spawn.JewelGrib[x, (int)jewel.JewelPosition.y] = null;

        jewel.JewelPosition = new Vector2(x, newpos);
        JewelSpawner.spawn.JewelGribScript[x, newpos] = this;
        JewelSpawner.spawn.JewelGrib[x, newpos] = this.gameObject;
        if (oldpos != newpos)
            StartCoroutine(Ulti.IEDrop(this.gameObject, jewel.JewelPosition, GameController.DROP_SPEED));
    }

    /// <summary>
    /// 获取行消除List
    /// </summary>
    /// <param name="Pos"></param>
    /// <param name="type"></param>
    /// <param name="bonus"></param>
    /// <returns></returns>
    public List<JewelObj> GetRow(Vector2 Pos, int type, JewelObj bonus)
    {
        List<JewelObj> tmp1 = GetLeft(Pos, type);
        List<JewelObj> tmp2 = GetRight(Pos, type);
        if (tmp1.Count + tmp2.Count > 1)
        {
            return Ulti.ListPlus(tmp1, tmp2, bonus);
        }

        else
            return new List<JewelObj>();
    }

    /// <summary>
    /// 获取列消除List
    /// </summary>
    /// <param name="Pos"></param>
    /// <param name="type"></param>
    /// <param name="bonus"></param>
    /// <returns></returns>
    public List<JewelObj> GetCollumn(Vector2 Pos, int type, JewelObj bonus)
    {
        List<JewelObj> tmp1 = GetTop(Pos, type);
        List<JewelObj> tmp2 = GetBot(Pos, type);
        if (tmp1.Count + tmp2.Count > 1)
        {
            return Ulti.ListPlus(tmp1, tmp2, bonus);
        }
        else
            return new List<JewelObj>();
    }

    /// <summary>
    /// 播放移动无效的动画
    /// </summary>
    /// <param name="Obj"></param>
    public void SetBackAnimation(GameObject Obj)
    {
        if (!Supporter.sp.isNomove)
        {
            Vector2 ObjPos = Obj.GetComponent<JewelObj>().jewel.JewelPosition;
            Animation anim = transform.GetChild(0).GetComponent<Animation>();
            anim.enabled = true;

            if (ObjPos.x == jewel.JewelPosition.x)
            {
                if (ObjPos.y > jewel.JewelPosition.y)
                {
                    anim.Play("MoveBack_Up");
                }
                else
                {
                    anim.Play("MoveBack_Down");
                }
            }
            else
            {
                if (ObjPos.x > jewel.JewelPosition.x)
                {
                    anim.Play("MoveBack_Right");
                }
                else
                {
                    anim.Play("MoveBack_Left");
                }
            }
        }
    }

    List<JewelObj> GetLeft(Vector2 Pos, int type)
    {
        List<JewelObj> tmp = new List<JewelObj>();
        for (int x = (int)Pos.x - 1; x >= 0; x--)
        {

            if (x != jewel.JewelPosition.x && JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y] != null && JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y].jewel.JewelType == type && GribManager.cell.GribCellObj[x, (int)Pos.y].cell.CellEffect == 0)
                tmp.Add(JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y]);
            else
                return tmp;
        }
        return tmp;
    }
    List<JewelObj> GetRight(Vector2 Pos, int type)
    {
        List<JewelObj> tmp = new List<JewelObj>();
        for (int x = (int)Pos.x + 1; x < 7; x++)
        {
            if (x != jewel.JewelPosition.x && JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y] != null && JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y].jewel.JewelType == type && GribManager.cell.GribCellObj[x, (int)Pos.y].cell.CellEffect == 0)
                tmp.Add(JewelSpawner.spawn.JewelGribScript[x, (int)Pos.y]);
            else
                return tmp;
        }
        return tmp;
    }

    /// <summary>
    /// 检测上方是否有相同的方块
    /// </summary>
    /// <param name="Pos"></param>
    /// <param name="type"></param>
    /// <returns></returns>
    List<JewelObj> GetTop(Vector2 Pos, int type)
    {
        List<JewelObj> tmp = new List<JewelObj>();
        for (int y = (int)Pos.y + 1; y < 9; y++)
        {
            if (y != jewel.JewelPosition.y && 
                JewelSpawner.spawn.JewelGribScript[(int)Pos.x, y] != null && 
                JewelSpawner.spawn.JewelGribScript[(int)Pos.x, y].jewel.JewelType == type && 
                GribManager.cell.GribCellObj[(int)Pos.x, y].cell.CellEffect == 0)
                tmp.Add(JewelSpawner.spawn.JewelGribScript[(int)Pos.x, y]);
            else
                return tmp;
        }

        return tmp;
    }
    
    /// <summary>
    /// 检测下方是否有相同的方块
    /// </summary>
    /// <param name="Pos"></param>
    /// <param name="type"></param>
    /// <returns></returns>
    List<JewelObj> GetBot(Vector2 Pos, int type)
    {
        List<JewelObj> tmp = new List<JewelObj>();
        for (int y = (int)Pos.y - 1; y >= 0; y--)
        {
            if (y != jewel.JewelPosition.y && JewelSpawner.spawn.JewelGribScript[(int)Pos.x, y] != null && JewelSpawner.spawn.JewelGribScript[(int)Pos.x, y].jewel.JewelType == type && GribManager.cell.GribCellObj[(int)Pos.x, y].cell.CellEffect == 0)
                tmp.Add(JewelSpawner.spawn.JewelGribScript[(int)Pos.x, y]);
            else
                return tmp;
        }

        return tmp;
    }

    /// <summary>
    /// 从宝石数组中移除自身
    /// </summary>
    /// <param name="x"></param>
    /// <param name="y"></param>
    private void RemoveFromList(int x, int y)
    {
        //移除脚本
        JewelSpawner.spawn.JewelGribScript[x, y] = null;
        //移除显示对象
        JewelSpawner.spawn.JewelGrib[x, y] = null;

        //碰撞器
        GetComponent<Collider2D>().enabled = false;
    }

    public int getListcount()
    {
        List<JewelObj> list = Ulti.ListPlus(GetRow(jewel.JewelPosition, jewel.JewelType, null),
                                            GetCollumn(jewel.JewelPosition, jewel.JewelType, null),
                                            this);

        return list.Count;
    }
    public List<JewelObj> getList()
    {
        List<JewelObj> list = Ulti.ListPlus(GetRow(jewel.JewelPosition, jewel.JewelType, null),
                                            GetCollumn(jewel.JewelPosition, jewel.JewelType, null),
                                            this);

        return list;
    }

    public void RuleChecker()
    {

        if (jewel.JewelType != 99)
        {
            List<JewelObj> list = Ulti.ListPlus(GetRow(jewel.JewelPosition, jewel.JewelType, null),
                                                      GetCollumn(jewel.JewelPosition, jewel.JewelType, null),
                                                      this);

            if (list.Count >= 3)
            {
                listProcess(list);
                Checked = true;
            }
        }
        else
        {
            GameController.action.WinChecker();
        }


    }

    void listProcess(List<JewelObj> list)
    {
        List<int> _listint = new List<int>();
        for (int i = 0; i < list.Count; i++)
        {
            if (!list[i].Checked)
                _listint.Add(list[i].getListcount());
            else
                _listint.Add(list.Count);
        }
        int max = Mathf.Max(_listint.ToArray());
        int idx = _listint.IndexOf(max);
        GameController.action.JewelProcess(list[idx].getList(), this.gameObject);
    }

    /// <summary>
    /// 播放宝石的抖动动画,即宝石移动完毕后停止时会抖动一下.
    /// </summary>
    public void Bounce()
    {
        if (GameController.action.GameState == (int)Timer.GameState.PLAYING && !Supporter.sp.isNomove)
        {
            Animation anim = render.GetComponent<Animation>();
            anim.enabled = true;
            anim.Play("bounce");
        }
    }

    public void JewelDisable()
    {
        Animation anim = render.GetComponent<Animation>();
        anim.enabled = true;
        anim.Play("Disable");
    }

    public void JewelEnable()
    {
        Animation anim = render.GetComponent<Animation>();
        anim.enabled = true;
        anim.Play("Enable");
    }

    /// <summary>
    /// 播放左右摇晃动画,用于提示玩家此方块可以消除
    /// </summary>
    public void JewelSuggesttion()
    {
        Animation anim = render.GetComponent<Animation>();
        anim.enabled = true;
        anim.Play("Suggesttion");
    }

    /// <summary>
    /// 停止左右摇晃动画
    /// </summary>
    public void JewelStopSuggesttion()
    {
        Animation anim = render.GetComponent<Animation>();
        if (anim.IsPlaying("Suggesttion"))
        {
            anim.Stop("Suggesttion");
            anim.enabled = false;
            transform.GetChild(0).transform.localEulerAngles = new Vector3(0, 0, 0);
        }
    }
}
