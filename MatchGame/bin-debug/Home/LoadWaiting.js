var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoadWaiting = (function () {
    function LoadWaiting() {
    }
    // fill image by second and go to Home scene
    LoadWaiting.prototype.Start = function () {
        // for (let i = 0; i < 120; i++){
        // 	loadbar.fillAmount += 1 / 120f;
        // 	let scale:number = 
        //     yield return new WaitForEndOfFrame();
        // }
        // Application.LoadLevel("HomeScene");
        //延迟120帧后加载主界面
        //暂时忽略
    };
    return LoadWaiting;
}());
__reflect(LoadWaiting.prototype, "LoadWaiting");
//# sourceMappingURL=LoadWaiting.js.map