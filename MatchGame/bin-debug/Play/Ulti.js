var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ulti = (function (_super) {
    __extends(Ulti, _super);
    function Ulti() {
        return _super.call(this) || this;
    }
    /// 将两个List合并
    /// 触发消除的方块
    Ulti.ListPlus = function (l1, l2, bonus) {
        var tmp = []; // new List<JewelObj>();
        for (var i = l1.length - 1; i >= 0; i--) {
            tmp.push(l1[i]);
        }
        if (bonus != null)
            tmp.push(bonus);
        for (var i = 0; i < l2.length; i++) {
            tmp.push(l2[i]);
        }
        return tmp;
    };
    /// 移动显示对象
    Ulti.MoveTo = function (obj, NewPos, duration) {
        // obj.SetActive(true);
        // Animation anim = obj.GetComponent<Animation>();
        // //if (anim.GetClipCount() > 1)
        // //{
        // //    Destroy(anim.GetClip("Moveto"));
        // //}
        // anim.enabled = true;
        // AnimationClip animclip = new AnimationClip();
        // AnimationCurve curvex = AnimationCurve.Linear(0, obj.transform.localPosition.x, duration, NewPos.x);
        // AnimationCurve curvey = AnimationCurve.Linear(0, obj.transform.localPosition.y, duration, NewPos.y);
        // AnimationCurve curvenable = AnimationCurve.Linear(0, 1, duration, 0);
        // animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
        // animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
        // animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);
        // anim.AddClip(animclip, "Moveto");
        // anim.Play("Moveto");
        // Destroy(animclip, duration);
        //TODO 移动显示对象，暂时直接用tween动画移动
        debug("移动显示对象:", obj, NewPos, duration);
        var tx = NewPos.x * 100;
        var ty = NewPos.y * 100;
        egret.Tween.removeTweens(obj);
        egret.Tween.get(obj).to({ x: tx, y: ty }, duration * 1000);
    };
    //     /// 补间动画 移动游戏物体到某位置.
    //     public static MoveTo2(obj:GameObject, NewPos:Vector2, float duration, float z):void
    //     {
    //         Animation anim = obj.GetComponent<Animation>();
    //         //if (anim.GetClipCount() > 1)
    //         //{
    //         //    anim.RemoveClip("Moveto");
    //         //}
    //         anim.enabled = true;
    //         AnimationClip animclip = new AnimationClip();
    // #if UNITY_5
    //             animclip.legacy = true;
    // #endif
    //         AnimationCurve curvex = AnimationCurve.Linear(0, obj.transform.localPosition.x, duration, NewPos.x);
    //         AnimationCurve curvey = AnimationCurve.Linear(0, obj.transform.localPosition.y, duration, NewPos.y);
    //         AnimationCurve curvez = AnimationCurve.Linear(0, z, duration, z);
    //         AnimationCurve curvenable = AnimationCurve.Linear(0, 1, duration, 0);
    //         animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
    //         animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
    //         animclip.SetCurve("", typeof(Transform), "localPosition.z", curvez);
    //         animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);
    //         anim.AddClip(animclip, "Moveto");
    //         anim.Play("Moveto");
    //         Destroy(animclip, duration);
    //     }
    Ulti.MoveTo2 = function (obj, startpos, NewPos, duration, z) {
        //         Animation anim = obj.GetComponent<Animation>();
        //         //if (anim.GetClipCount() > 1)
        //         //{
        //         //    anim.RemoveClip("Moveto");
        //         //}
        //         anim.enabled = true;
        //         AnimationClip animclip = new AnimationClip();
        // #if UNITY_5
        //                 animclip.legacy = true;
        // #endif
        //         AnimationCurve curvex = AnimationCurve.Linear(0, startpos.x, duration, NewPos.x);
        //         AnimationCurve curvey = AnimationCurve.Linear(0, startpos.y, duration, NewPos.y);
        //         AnimationCurve curvez = AnimationCurve.Linear(0, z, duration, z);
        //         AnimationCurve curvenable = AnimationCurve.Linear(0, 1, duration, 0);
        //         animclip.SetCurve("", typeof(Transform), "localPosition.x", curvex);
        //         animclip.SetCurve("", typeof(Transform), "localPosition.y", curvey);
        //         animclip.SetCurve("", typeof(Transform), "localPosition.z", curvez);
        //         animclip.SetCurve("", typeof(Animation), "m_Enabled", curvenable);
        //         anim.AddClip(animclip, "Moveto");
        //         anim.Play("Moveto");
        //         Destroy(animclip, duration);
        debug("移动位置2:");
        obj.u3dX = startpos.x;
        obj.u3dY = startpos.y;
        this.MoveTo(obj, NewPos, duration);
    };
    /// 使用协程播放下落动画
    Ulti.IEDrop = function (obj, NewPos, speed) {
        // JewelObj script = obj.GetComponent<JewelObj>();
        // Collider2D coll = obj.GetComponent<Collider2D>();
        // if (obj != null)
        // {
        //     Transform _tranform = obj.transform;
        //     coll.enabled = false;
        //     script.isMove = true;
        //     //!!!! 注意显示游戏对象即：obj中transform的localPosition与逻辑地图中的NewPos是一样，均使用的是左下角0,0然后往上一格则为0,1
        //     //这就解决了显示对象数据向逻辑数据同步的问题，即显示对象按逻辑对象的x,y进行移动到指定位置。
        //     while (_tranform != null && _tranform.localPosition.y - NewPos.y > 0.1f)
        //     {
        //         _tranform.localPosition -= new Vector3(0, Time.smoothDeltaTime * speed);
        //         yield return null;
        //     }
        //     if (_tranform != null)
        //     {
        //         //这块的数据和AS3中的闭包数据很像,即协程执行完比后,他的数据类似AS3中的闭包方法,即数据还是之前的数据.
        //         _tranform.localPosition = new Vector3(NewPos.x, NewPos.y);
        //         script.Bounce();
        //         script.RuleChecker();
        //         yield return new WaitForSeconds(0.2f);
        //         //开启碰撞器组件
        //         if (coll != null)
        //         {
        //             coll.enabled = true;
        //             script.isMove = false;
        //         }
        //     }
        // }
        debug("IEDrop : 使用协程使物体运动");
    };
    return Ulti;
}(MonoBehaviour));
__reflect(Ulti.prototype, "Ulti");
//# sourceMappingURL=Ulti.js.map