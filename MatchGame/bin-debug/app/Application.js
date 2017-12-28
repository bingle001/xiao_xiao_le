var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneType;
(function (SceneType) {
    SceneType[SceneType["Home"] = 1] = "Home";
    SceneType[SceneType["Map"] = 2] = "Map";
    SceneType[SceneType["Game"] = 3] = "Game";
})(SceneType || (SceneType = {}));
var Application = (function () {
    function Application() {
    }
    Application.start = function (stage) {
        this._stage = stage;
        debug("游戏启动");
        Time.Awake();
        DataLoader.Awake();
        Application.changeScene(SceneType.Home);
    };
    Application.changeScene = function (sceneType) {
        if (this._curScene && this._curScene.sceneType == sceneType) {
            return;
        }
        this._nextSceneType = sceneType;
        this.hideCurScene();
    };
    Application.hideCurScene = function () {
        if (this._curScene) {
            egret.Tween.removeTweens(this._curScene);
            egret.Tween.get(this._curScene).to({ alpha: 0 }, 300).call(this.appearNextScene, this);
        }
        else {
            this.appearNextScene();
        }
    };
    Application.appearNextScene = function () {
        if (this._curScene) {
            this._curScene.removeFromParent();
            this._curScene = null;
        }
        var scene = null;
        if (this._nextSceneType == SceneType.Home) {
            scene = new HomeScene();
        }
        else if (this._nextSceneType == SceneType.Map) {
            scene = new MapScene();
        }
        else if (this._nextSceneType == SceneType.Game) {
            scene = new GameScene();
        }
        if (scene) {
            scene.alpha = 0;
            egret.Tween.removeTweens(scene);
            egret.Tween.get(scene).to({ alpha: 1 }, 300);
            this._stage.addChild(scene);
        }
        this._curScene = scene;
        this._nextSceneType = null;
    };
    /** 切换场景 */
    Application.LoadLevel = function (sceneName) {
    };
    return Application;
}());
__reflect(Application.prototype, "Application");
//# sourceMappingURL=Application.js.map