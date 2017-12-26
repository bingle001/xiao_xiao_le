class FrameManager {
    private static m_pFramesMap = {};
    private static m_pResourceName = {};
    public static getFrame(type, key) {
        if (this.m_pFramesMap[type] && this.m_pFramesMap[type].frames[key]) {
            return this.m_pFramesMap[type].frames[key];
        }
        return null;
    }

    public static numFrames(type) {
        var nums = 0;
        if (this.m_pFramesMap[type]) {
            nums = Utils.objectLenght(this.m_pFramesMap[type].frames);
        }
        return nums;
    }

    public static setResourceName(filename) {
        if (!this.m_pResourceName[filename]) {
            this.m_pResourceName[filename] = 1;
        }
        else {
            ++this.m_pResourceName[filename];
        }
    }
    public static setFrames(type, textures, isOver) {

        if (!this.m_pFramesMap[type]) {
            var info: any = {}
            info.frames = {};
            info.isOver = false;
            this.m_pFramesMap[type] = info;
        }
        for (var name in textures) {
            this.m_pFramesMap[type].frames[name] = textures[name];
        }
        this.m_pFramesMap[type].isOver = isOver;
    }

    public static isCheck(type) {
        if (!this.m_pFramesMap[type]) return false;
        return this.m_pFramesMap[type].isOver;
    }

    public static removeFrames(type) {
        delete this.m_pFramesMap[type];
    }

    public static loadRoleFrames(ietype, ietypeSub = "") {
        if (this.isCheck(ietypeSub)) {
            return true;
        }
        var files = this.getLoadCommonFilesUrls(ietype, 1);
        var url = files[0];
        RES.getResByUrl(url, this.onFileLoadComplete, this, RES.ResourceItem.TYPE_SHEET);

        return false;
    }

    public static onFileLoadComplete(textureObj: any) {
        let textureMap: any = textureObj['_textureMap'];
        let exp = "_(\\d+)_png$";
        let temp_map = {};
        for (let key in textureMap) {
            let texture = textureMap[key];
            let r = key.match(exp);
            if (r) {
                let texture_key = key.substr(0, r.index);
                var temp = temp_map[texture_key];
                if (!temp) {
                    temp = {};
                    temp_map[texture_key] = temp;
                }
                temp[key] = texture;
            }
        }
        for (let temp_key in temp_map) {
            this.setFrames(temp_key, temp_map[temp_key], true);
        }
    }

    public static getLoadCommonFilesUrls(fileName, num) {
        this.setResourceName(fileName);
        var paths = [];
        var src = "resource/assets/effects/" + fileName + "/";
        if (num > 1) {
            for (var i = 1; i <= num; i++) {
                var path = src + fileName + "_" + i + ".json";
                paths.push(path);
            }
        } else {
            var path = src + fileName + ".json";
            paths.push(path);
        }
        return paths;
    }
}