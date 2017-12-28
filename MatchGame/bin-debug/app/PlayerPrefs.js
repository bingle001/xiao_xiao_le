var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//本地存储
var PlayerPrefs = (function () {
    function PlayerPrefs() {
    }
    /** 删除指定数据 */
    PlayerPrefs.DeleteKey = function (key) {
        if (this.m_pData[key]) {
            delete this.m_pData[key];
        }
    };
    /** 删除全部键 */
    PlayerPrefs.DeleteAll = function () {
        this.m_pData = {};
    };
    /** 判断数据是否存在的方法 */
    PlayerPrefs.HasKey = function (key) {
        if (this.m_pData[key]) {
            return true;
        }
        return false;
    };
    /** 保存整型数据 */
    PlayerPrefs.SetInt = function (key, value) {
        this.m_pData[key] = value;
    };
    /** 读取整形数据 */
    PlayerPrefs.GetInt = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        if (this.m_pData[key]) {
            return this.m_pData[key];
        }
        return defaultValue || 0;
    };
    /** 保存浮点型数据 */
    PlayerPrefs.SetFloat = function (key, value) {
        this.m_pData[key] = value;
    };
    /** 读取浮点型数据 */
    PlayerPrefs.GetFloat = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        if (this.m_pData[key]) {
            return this.m_pData[key];
        }
        return 0;
    };
    /** 保存字符串型数据 */
    PlayerPrefs.SetString = function (key, value) {
        this.m_pData[key] = value;
    };
    /** 读取字符串型数据 */
    PlayerPrefs.GetString = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        if (this.m_pData[key]) {
            return this.m_pData[key];
        }
        return "";
    };
    PlayerPrefs.m_pData = {};
    return PlayerPrefs;
}());
__reflect(PlayerPrefs.prototype, "PlayerPrefs");
//# sourceMappingURL=PlayerPrefs.js.map