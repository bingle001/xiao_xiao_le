//本地存储
class PlayerPrefs {

	private static m_pData = {};	
	
	/** 删除指定数据 */
	public static DeleteKey(key: string): void{
		if (this.m_pData[key]) {
			delete this.m_pData[key];
		}
	}

	/** 删除全部键 */
	public static DeleteAll(): void{
		this.m_pData = {};
	}

	/** 判断数据是否存在的方法 */
	public static HasKey(key: string): boolean{
		if (this.m_pData[key]) {
			return true;
		}
		return false;
	}

	/** 保存整型数据 */
	public static SetInt(key: string, value: number): void{
		this.m_pData[key] = value;
	}

	/** 读取整形数据 */
	public static GetInt(key: string, defaultValue: number = 0): number{
		if (this.m_pData[key]) {
			return this.m_pData[key];
		}
		return defaultValue || 0;
	}

	/** 保存浮点型数据 */
	public static SetFloat(key: string, value: number): void{
		this.m_pData[key] = value;
	}

	/** 读取浮点型数据 */
	public static GetFloat(key: string, defaultValue: number = 0): number{
		if (this.m_pData[key]) {
			return this.m_pData[key];
		}
		return 0;
	}

	/** 保存字符串型数据 */
	public static SetString(key: string, value: string): void{
		this.m_pData[key] = value;
	}

	/** 读取字符串型数据 */
	public static GetString(key: string, defaultValue: string = ""): string{
		if (this.m_pData[key]) {
			return this.m_pData[key];
		}
		return "";
	}


}