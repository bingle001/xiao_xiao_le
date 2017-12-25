class Debug {

	public static Log(content: string, ...params: any[]): void{
		console.log(content, params);
	}


}

function debug(content: string, ...params: any[]): void {
	console.log(content, params);
}