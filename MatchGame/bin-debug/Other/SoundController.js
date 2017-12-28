var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 特效声音
var SoundController = (function () {
    function SoundController() {
    }
    SoundController.Awake = function () {
        if (SoundController.Sound == null) {
            SoundController.Sound = new SoundController();
        }
    };
    // sound on state
    SoundController.prototype.SoundON = function () {
        // audiosource.mute = false;
    };
    // sound off state
    SoundController.prototype.SoundOFF = function () {
        // audiosource.mute = true;
    };
    SoundController.prototype.Click = function () {
        // audiosource.PlayOneShot(SoundClips[0]);
    };
    SoundController.prototype.JewelCrash = function () {
        // audiosource.PlayOneShot(SoundClips[1]);
    };
    SoundController.prototype.LockCrash = function () {
        // audiosource.PlayOneShot(SoundClips[2]);
    };
    SoundController.prototype.IceCrash = function () {
        // audiosource.PlayOneShot(SoundClips[3]);
    };
    SoundController.prototype.Win = function () {
        // audiosource.PlayOneShot(SoundClips[4]);
    };
    SoundController.prototype.Lose = function () {
        // audiosource.PlayOneShot(SoundClips[5]);
    };
    SoundController.prototype.StarIn = function () {
        // audiosource.PlayOneShot(SoundClips[6]);
    };
    SoundController.prototype.Fire = function () {
        // audiosource.PlayOneShot(SoundClips[7]);
    };
    SoundController.prototype.Gun = function () {
        // audiosource.PlayOneShot(SoundClips[8]);
    };
    SoundController.prototype.Boom = function () {
        // audiosource.PlayOneShot(SoundClips[9]);
    };
    return SoundController;
}());
__reflect(SoundController.prototype, "SoundController");
//# sourceMappingURL=SoundController.js.map