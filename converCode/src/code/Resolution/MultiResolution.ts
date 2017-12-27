// 多分辨率适配 组件(挂在 背景图上)
// 职责:用于对背景图根据实际屏幕大小进行缩放
class MultiResolution
{
    private m_tranform; //Transform               // tranform need scale
    private static BASE_WIDTH = 480;
    private static BASE_HEIGHT = 800;
    private baseRatio: number;
    private percentScale:number;
    public Start():void
    {
        // m_tranform = transform;
        // this.setScale();
    }


    // scale tranform by width and high of scene
    // void setScale()
    // {
    //     #if UNITY_ANDROID || UNITY_IPHONE || UNITY_WP8
    //         baseRatio = (float)BASE_WIDTH / BASE_HEIGHT * Screen.height;
    //         percentScale = Screen.width / baseRatio;
    //         m_tranform.localScale = new Vector3(m_tranform.localScale.x * percentScale, m_tranform.localScale.y, 1);
    //     #endif
    // }
}