using UnityEngine;
using System.Collections;

public class LogUtils
{

    private static int traceCount = 0;

    /// <summary>
    /// 取得当前源码的哪一行
    /// </summary>
    /// <returns></returns>
    public static int GetLineNum()
    {
        System.Diagnostics.StackTrace st = new System.Diagnostics.StackTrace(1, true);
        return st.GetFrame(0).GetFileLineNumber();
    }


    /// <summary>
    /// 取当前源码的源文件名
    /// </summary>
    /// <returns></returns>
    public static string GetCurSourceFileName()
    {
        System.Diagnostics.StackTrace st = new System.Diagnostics.StackTrace(1, true);
        return st.GetFrame(0).GetFileName();
    }

    public static void TraceNowJewelObj(JewelObj obj = null)
    {
        if (obj != null)
        {
            LogUtils.TraceNow("JewelType:" +obj.jewel.JewelType+" "+ obj.jewel.JewelPosition.x + "," + obj.jewel.JewelPosition.y);
        }
    }


    public static void TraceNow(string message = "")
    {
        System.Diagnostics.StackTrace st = new System.Diagnostics.StackTrace(1, true);

        //string typeName = this.GetType().ToString();//当类名用
        //string methodName = new System.Diagnostics.StackTrace(true).GetFrame(1).GetMethod().DeclaringType.ToString();//这个可以打印出由button调用
        //string methodName = new System.Diagnostics.StackTrace(true).GetFrame(1).GetMethod().Name;//事件源，OnClick，但是不显示writeerror这个方法名。。
        //string methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;//程序执行位置代码块的方法名

        //string typeName = this.GetType().ToString();//空间名.类名

        string fileName = st.GetFrame(0).GetFileName();//文件地址
        string methodName = st.GetFrame(0).GetMethod().Name;
        int numline = st.GetFrame(0).GetFileLineNumber();

        Debug.Log(traceCount + "|" + fileName + ":" + methodName + "()." + numline + " " + message);

        //string className = st.GetFrame(0).GetType().Name;//类名
        //Debug.Log(traceCount + ":" + className + "." + methodName + "()." + numline);

        traceCount++;
    }

}
