var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FrameManager = (function () {
    function FrameManager() {
    }
    FrameManager.getFrame = function (type, key) {
        if (this.m_pFramesMap[type] && this.m_pFramesMap[type].frames[key]) {
            return this.m_pFramesMap[type].frames[key];
        }
        return null;
    };
    FrameManager.numFrames = function (type) {
        var nums = 0;
        if (this.m_pFramesMap[type]) {
            nums = Utils.objectLenght(this.m_pFramesMap[type].frames);
        }
        return nums;
    };
    FrameManager.setResourceName = function (filename) {
        if (!this.m_pResourceName[filename]) {
            this.m_pResourceName[filename] = 1;
        }
        else {
            ++this.m_pResourceName[filename];
        }
    };
    FrameManager.setFrames = function (type, textures, isOver) {
        if (!this.m_pFramesMap[type]) {
            var info = {};
            info.frames = {};
            info.isOver = false;
            this.m_pFramesMap[type] = info;
        }
        for (var name in textures) {
            this.m_pFramesMap[type].frames[name] = textures[name];
        }
        this.m_pFramesMap[type].isOver = isOver;
    };
    FrameManager.isCheck = function (type) {
        if (!this.m_pFramesMap[type])
            return false;
        return this.m_pFramesMap[type].isOver;
    };
    FrameManager.removeFrames = function (type) {
        delete this.m_pFramesMap[type];
    };
    FrameManager.loadRoleFrames = function (ietype, ietypeSub) {
        if (ietypeSub === void 0) { ietypeSub = ""; }
        if (this.isCheck(ietypeSub)) {
            return true;
        }
        var files = this.getLoadCommonFilesUrls(ietype, 1);
        var url = files[0];
        RES.getResByUrl(url, this.onFileLoadComplete, this, RES.ResourceItem.TYPE_SHEET);
        return false;
    };
    FrameManager.onFileLoadComplete = function (textureObj) {
        var textureMap = textureObj['_textureMap'];
        var exp = "_(\\d+)_png$";
        var temp_map = {};
        for (var key in textureMap) {
            var texture = textureMap[key];
            var r = key.match(exp);
            if (r) {
                var texture_key = key.substr(0, r.index);
                var temp = temp_map[texture_key];
                if (!temp) {
                    temp = {};
                    temp_map[texture_key] = temp;
                }
                temp[key] = texture;
            }
        }
        for (var temp_key in temp_map) {
            this.setFrames(temp_key, temp_map[temp_key], true);
        }
    };
    FrameManager.getLoadCommonFilesUrls = function (fileName, num) {
        this.setResourceName(fileName);
        var paths = [];
        var src = "resource/assets/effects/" + fileName + "/";
        if (num > 1) {
            for (var i = 1; i <= num; i++) {
                var path = src + fileName + "_" + i + ".json";
                paths.push(path);
            }
        }
        else {
            var path = src + fileName + ".json";
            paths.push(path);
        }
        return paths;
    };
    FrameManager.m_pFramesMap = {};
    FrameManager.m_pResourceName = {};
    return FrameManager;
}());
__reflect(FrameManager.prototype, "FrameManager");
//# sourceMappingURL=FrameManager.js.map