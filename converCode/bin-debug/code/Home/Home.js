var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Home = (function () {
    function Home() {
    }
    Home.prototype.Start = function () {
        // MusicController.Music.BG_menu();
    };
    Home.prototype.Update = function () {
        //退出
        // if (Input.GetKeyDown(KeyCode.Escape))
        // {
        //     ExitOK();
        // }
    };
    Home.prototype.ExitOK = function () {
        // Application.Quit();
    };
    return Home;
}());
__reflect(Home.prototype, "Home");
//# sourceMappingURL=Home.js.map