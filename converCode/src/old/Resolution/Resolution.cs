using UnityEngine;
using System.Collections;

/// <summary>
/// 分辨率适配组件 （挂在Payer 游戏对象上）
/// </summary>
public class Resolution : MonoBehaviour {

    public  float BASE_WIDTH = 480f;
    public  float BASE_HEIGHT = 800f;

    private Transform m_tranform;
    private float baseRatio;
    private float percentScale;

    void Start()
    {
        m_tranform = transform;
        setScale();
    }
    void setScale()
    {
        baseRatio = (float)BASE_WIDTH / BASE_HEIGHT * Screen.height;
        percentScale = Screen.width / baseRatio;

        //只针对缩小进行缩小，如果屏幕超过480*800 则不进行放大
        if (percentScale<1)
            m_tranform.localScale = new Vector3(m_tranform.localScale.x * percentScale, m_tranform.localScale.y * percentScale, 1);
    }
}
