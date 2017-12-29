enum SceneType {
	Home = 1,
	Map = 2,
	Game = 3,
}


class Application {

	private static _stage: egret.Stage;

	private static _curScene: BaseScene;
	private static _nextSceneType: SceneType;

	public static start(stage:egret.Stage): void{
		this._stage = stage;
		debug("游戏启动");
		
		Time.Awake();
		DataLoader.Awake();
		GribManager.Awake();
		GameController.Awake();
		JewelSpawner.Awake();

		Application.changeScene(SceneType.Home);
	}

	public static changeScene(sceneType: SceneType): void{
		if (this._curScene && this._curScene.sceneType == sceneType) {
			return;
		}

		this._nextSceneType = sceneType;
		this.hideCurScene();
	}

	private static hideCurScene(): void{
		if (this._curScene) {
			egret.Tween.removeTweens(this._curScene);
			egret.Tween.get(this._curScene).to({ alpha: 0 }, 300).call(this.appearNextScene, this);
		}
		else {
			this.appearNextScene();
		}
	}

	private static appearNextScene(): void{
		if (this._curScene) {
			this._curScene.removeFromParent();
			this._curScene = null;
		}

		let scene: BaseScene = null;
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
	}



	/** 切换场景 */
	public static LoadLevel(sceneName:string): void{
		
	}



}