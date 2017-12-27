var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 背景音乐游戏
var MusicController = (function () {
    function MusicController() {
    }
    MusicController.Awake = function () {
        if (MusicController.Music == null) {
            MusicController.Music = new MusicController();
        }
    };
    MusicController.prototype.MusicON = function () {
        // audiosource.mute = false; 
    };
    MusicController.prototype.MusicOFF = function () {
        // audiosource.mute = true; 
    };
    MusicController.prototype.BG_menu = function () {
        // audiosource.clip = MusicClips[0];
        // audiosource.Play();
    };
    MusicController.prototype.BG_play = function () {
        // audiosource.clip = MusicClips[1];
        // audiosource.Play();
    };
    return MusicController;
}());
__reflect(MusicController.prototype, "MusicController");
//# sourceMappingURL=MusicController.js.map