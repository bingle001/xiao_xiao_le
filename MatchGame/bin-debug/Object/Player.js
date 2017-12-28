var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 玩家针对每一关卡的数据 实体类
var Player = (function () {
    function Player() {
    }
    /// 生成字符串拼接,类似于JSON
    Player.prototype.ToSaveString = function () {
        var s = this.Locked + "," + this.Stars + "," + this.HightScore + "," + this.Background + ",";
        return s;
    };
    return Player;
}());
__reflect(Player.prototype, "Player");
// 玩家保存记录实体类
var PlayerUtils = (function () {
    function PlayerUtils() {
    }
    /**
     * 保存玩家数据,保存的过程有点类似于JSON
     */
    PlayerUtils.Save = function (Maps) {
        var data = "";
        for (var i in Maps) {
            var item = Maps[i];
            data += item.ToSaveString();
        }
        PlayerPrefs.SetString(this.KEY_DATA, data);
    };
    /**
     * 加载玩家数据
     */
    PlayerUtils.Load = function () {
        var list = [];
        var data = PlayerPrefs.GetString(this.KEY_DATA, "");
        var dataSplit = data.split(',');
        for (var i = 0; i < 297; i++) {
            var p = new Player();
            p.Level = i + 1;
            p.Name = String(i + 1);
            p.Locked = Boolean(dataSplit[i * 4]);
            p.Stars = Number(dataSplit[i * 4 + 1]);
            p.HightScore = Number(dataSplit[i * 4 + 2]);
            p.Background = Number(dataSplit[i * 4 + 3]);
            list.push(p);
        }
        return list;
    };
    PlayerUtils.KEY_DATA = "DATA";
    return PlayerUtils;
}());
__reflect(PlayerUtils.prototype, "PlayerUtils");
//# sourceMappingURL=Player.js.map