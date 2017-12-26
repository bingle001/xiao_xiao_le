class Global {
    
    public static GameWidth: number = 720;
    public static GameHeight: number = 1280;



}


class Debug {
	public static Log(content: string, ...params: any[]): void{
		console.log(content, params);
	}
}



function debug(content: string, ...params: any[]): void {
	console.log(content, params);
}

