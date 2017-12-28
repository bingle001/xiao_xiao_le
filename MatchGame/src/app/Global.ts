class Global {

	public static GameWidth: number = 720;
	public static GameHeight: number = 1280;

	public static CellWidth: number = 100;
	public static cellHeight: number = 100;


}


class Debug {
	public static Log(content: string, ...params: any[]): void {
		console.log(content, params);
	}

	public static TraceNowJewelObj(obj: JewelObj = null): void {
		if (obj != null) {
			this.Log("JewelType:" + obj.jewel.JewelType + " " + obj.jewel.JewelPosition.x + "," + obj.jewel.JewelPosition.y);
		}
	}
}

class Random{
	public static Range(min: number, max: number): number{
		return Utils.random(min, max);
	}

	public static get value(): number{
		return Math.random();
	}
}



function debug(content: string, ...params: any[]): void {
	console.log(content, params);
}

