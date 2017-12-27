/**
 * 输入，按键输入、屏幕点击，都是属于Input
 * 这里可以统一处理，只用舞台上来全局监听一个就够了
 */
class Input {

	/**
	 * 当前鼠标位置
	 */
	public static mousePosition: Vector3;

	public static Awake(): void{
		
	}

	/**
	 * 检测鼠标按键是否按下
	 * @param type 0对应左键 ， 1对应右键 ， 2对应中键
	 */
	public static GetMouseButtonDown(type: number): boolean{

		return false;
	}

	public static GetMouseButton(type: number): boolean{
		return false;
	}

	public static GetMouseButtonUp(type: number): boolean{
		return false;
	}




}