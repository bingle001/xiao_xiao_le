/** 素材工具 */
class ResUtils {

	public static getRes(resName: string): string{
		if (resName && resName.indexOf("_png") == -1) {
			resName = resName + "_png";
		}
		return resName;
	}

	public static getJewel(type: number): string{
		let str: string = "jewel_%d_png";
		return Utils.stringFormat(str, type);
	}

	public static getGameBg(num: number): string{
		let str: string = "bg_%d_png";
		return Utils.stringFormat(str, num);
	}

	public static getMap(index: number): string{
		let str = "map_%d_png";
		return Utils.stringFormat(str, index);
	}

	public static getHome(resName: string): string{
		return "home_" + resName + "_png";
	}

	public static getLoad(resName: string): string{
		return "Load_" + resName + "_png";
	}

	public static getMapPopUp(resName: string): string{
		return "map_" + resName + "_png";
	}

	public static getPlay(resName: string): string{
		return "Play_" + resName + "_png";
	}

	public static getPlayPopUp(resName: string): string{
		return "Play_" + resName + "_png";
	}

	public static getPlayTop(resName: string): string{
		return "Play_top_" + resName + "_png";
	}

	public static getSelectMap(resName: string): string{
		return "SelectMap_" + resName + "_png";
	}
	



}