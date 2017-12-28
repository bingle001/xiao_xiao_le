var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FrameAnimNumType;
(function (FrameAnimNumType) {
    FrameAnimNumType[FrameAnimNumType["num"] = 0] = "num";
    FrameAnimNumType[FrameAnimNumType["string"] = 1] = "string";
})(FrameAnimNumType || (FrameAnimNumType = {}));
;
var FrameAnim = (function () {
    function FrameAnim(actionName) {
        this.framesToHold = 3;
        this.frameToCenter = '';
        this.frameNumType = 0; // 0. 1,2,3, 1. 01,02,03
        this.frameIndex = 0; //当前帧位置
        this.m_bIsReverse = false; //是否倒序
        this.m_pNextFrameIndex = 0;
        this.m_pActionName = '';
        this.m_pNumFrames = 0;
        this.m_pFrameInterval = []; //循环区间帧
        this.isReset = false; //是否已重置
        this.repeatTimes = 0; //循环次数
        this.actionName = actionName;
    }
    Object.defineProperty(FrameAnim.prototype, "acitonName", {
        get: function () {
            return this.m_pActionName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameAnim.prototype, "numFrames", {
        get: function () {
            if (this.m_pNumFrames == 0) {
                this.m_pNumFrames = FrameManager.numFrames(this.acitonName);
            }
            // debug("m_pNumFrames",this.m_pNumFrames)
            return this.m_pNumFrames;
        },
        set: function (len) {
            this.m_pNumFrames = len;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameAnim.prototype, "isReverse", {
        set: function (bool) {
            this.m_bIsReverse = bool;
            this.resetFrameIndex();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameAnim.prototype, "actionName", {
        set: function (name) {
            this.m_pActionName = name;
            this.resetFrameIndex();
        },
        enumerable: true,
        configurable: true
    });
    FrameAnim.prototype.nextFrame = function () {
        ++this.m_pNextFrameIndex;
        if (this.m_pNextFrameIndex >= this.framesToHold) {
            this.m_pNextFrameIndex = 0;
            if (this.m_bIsReverse) {
                var index = this.m_pFrameInterval.indexOf(this.frameIndex);
                if (index > 0 && index % 2 == 0) {
                    this.frameIndex = this.m_pFrameInterval[index + 1];
                }
                else {
                    --this.frameIndex;
                }
                if (this.frameIndex < 0) {
                    this.frameIndex = this.numFrames - 1;
                    this.repeatTimes++;
                }
            }
            else {
                var index = this.m_pFrameInterval.indexOf(this.frameIndex);
                if (index > 0 && index % 2 == 1) {
                    this.frameIndex = this.m_pFrameInterval[index - 1];
                }
                else {
                    ++this.frameIndex;
                }
                if (this.frameIndex >= this.numFrames) {
                    this.frameIndex = 0;
                    this.repeatTimes++;
                }
            }
        }
    };
    /**
     * 设置帧区间(start <= 帧 <= end)
     */
    FrameAnim.prototype.setFrameInterval = function (start, end) {
        if (end < start) {
            return;
        }
        this.m_pFrameInterval.push(start, end);
    };
    FrameAnim.prototype.clearFrameInterval = function () {
        this.m_pFrameInterval.length = 0;
    };
    FrameAnim.prototype.resetFrameIndex = function () {
        this.isReset = true;
        this.repeatTimes = 0;
        this.m_pNextFrameIndex = 0;
        if (this.m_bIsReverse) {
            this.frameIndex = this.m_pNumFrames - 1;
        }
        else {
            this.frameIndex = 0;
        }
    };
    Object.defineProperty(FrameAnim.prototype, "isEndFrame", {
        get: function () {
            if (this.m_bIsReverse) {
                return (this.frameIndex == 0);
            }
            else {
                return (this.frameIndex == this.m_pNumFrames - 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameAnim.prototype, "isFirstFrame", {
        get: function () {
            if (this.m_bIsReverse) {
                return (this.frameIndex == this.m_pNumFrames - 1);
            }
            else {
                return (this.frameIndex == 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    FrameAnim.prototype.getLastFrame = function () {
        var last_index = this.m_bIsReverse ? 0 : this.m_pNumFrames - 1;
        var name;
        var suffix = "_png";
        if (this.frameNumType == 0) {
            name = this.m_pActionName + '_' + this.frameToCenter + last_index;
        }
        else {
            name = this.m_pActionName + '_' + this.num2Zero(last_index);
        }
        return FrameManager.getFrame(this.m_pActionName, name + suffix);
    };
    FrameAnim.prototype.getFrame = function () {
        var name;
        var suffix = "_png";
        if (this.frameNumType == 0) {
            name = this.m_pActionName + '_' + this.frameToCenter + this.frameIndex;
        }
        else {
            name = this.m_pActionName + '_' + this.num2Zero(this.frameIndex);
        }
        return FrameManager.getFrame(this.m_pActionName, name + suffix);
    };
    FrameAnim.prototype.num2Zero = function (index) {
        var str = index < 10 ? "0" + index : "" + index;
        return str;
    };
    FrameAnim.prototype.clear = function () {
        FrameManager.removeFrames(this.m_pActionName);
    };
    FrameAnim.createAnim = function (framesToHold, actionName, frameNumType, frameIndex) {
        if (framesToHold === void 0) { framesToHold = 3; }
        if (frameNumType === void 0) { frameNumType = 0; }
        if (frameIndex === void 0) { frameIndex = 0; }
        var action = new FrameAnim(actionName);
        action.framesToHold = framesToHold;
        action.frameNumType = frameNumType;
        action.frameIndex = frameIndex;
        return action;
    };
    return FrameAnim;
}());
__reflect(FrameAnim.prototype, "FrameAnim");
var SpriteAnimation = (function (_super) {
    __extends(SpriteAnimation, _super);
    function SpriteAnimation(targets, actionName, framesToHold, frameNumType, frameIndex) {
        if (framesToHold === void 0) { framesToHold = 3; }
        if (frameNumType === void 0) { frameNumType = 0; }
        if (frameIndex === void 0) { frameIndex = 0; }
        var _this = _super.call(this) || this;
        _this.isRepeat = false;
        _this.m_bIsMultiFile = false;
        _this.m_pLoaded = false;
        _this.m_pIsStart = false;
        _this.m_pActionBitmaps = [];
        _this.m_pThisArg = null;
        _this.m_pCallback = null;
        _this.m_pCallArgs = null;
        _this.m_pLoaderComplete = null;
        _this.m_pLoaderCompleteThis = null;
        _this.m_pRepeatTimes = 0;
        _this.textureAnchor = 0; //0不设置1.中心点,2脚底
        _this.openFrameCall = false; //false不开启逐帧回调，true开启
        _this.isLife = false;
        _this.m_pActionBitmaps = targets;
        _this.m_pFrameAnim = FrameAnim.createAnim(framesToHold, actionName, frameNumType, frameIndex);
        return _this;
    }
    SpriteAnimation.prototype.setCallBack = function (callback, thisArg, args) {
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pCallArgs = args;
    };
    Object.defineProperty(SpriteAnimation.prototype, "sprites", {
        get: function () {
            return this.m_pActionBitmaps;
        },
        set: function (targets) {
            this.m_pActionBitmaps = targets;
        },
        enumerable: true,
        configurable: true
    });
    SpriteAnimation.prototype.removeOneImageSprite = function (sprite) {
        var sprites = this.sprites;
        for (var i = 0; i < sprites.length; i++) {
            var imgSprite = sprites[i];
            if (imgSprite.hashCode == sprite.hashCode) {
                sprites.splice(i, 1);
                return;
            }
        }
    };
    SpriteAnimation.prototype.resetFrameAnim = function () {
        this.m_pFrameAnim.resetFrameIndex();
    };
    Object.defineProperty(SpriteAnimation.prototype, "anim", {
        get: function () {
            return this.m_pFrameAnim;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteAnimation.prototype, "isReverse", {
        set: function (bool) {
            this.m_pFrameAnim.isReverse = bool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteAnimation.prototype, "framesToHold", {
        set: function (framesToHold) {
            this.m_pFrameAnim.framesToHold = framesToHold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteAnimation.prototype, "repeatTimes", {
        get: function () {
            return this.m_pFrameAnim.repeatTimes - this.m_pRepeatTimes;
        },
        enumerable: true,
        configurable: true
    });
    SpriteAnimation.prototype.loadFiles = function (files, callback, callbackThis) {
        this.m_pNumComplete = 0;
        this.m_pLoaderNum = files.length;
        this.m_pLoaderComplete = callback;
        this.m_pLoaderCompleteThis = callbackThis;
        if (FrameManager.isCheck(this.m_pFrameAnim.acitonName)) {
            if (this.m_pIsStart)
                this.playAction();
            this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
            if (this.m_pLoaderCompleteThis) {
                var self_1 = this;
                egret.callLater(function () {
                    self_1.m_pLoaderComplete && self_1.m_pLoaderComplete.call(self_1.m_pLoaderCompleteThis, null, self_1.m_pFrameAnim.acitonName, self_1);
                    self_1.m_pLoaderComplete = null;
                    self_1.m_pLoaderCompleteThis = null;
                }, this);
            }
        }
        else {
            for (var i = 0; i < this.m_pLoaderNum; i++) {
                this.loadFile(files[i], RES.ResourceItem.TYPE_SHEET);
            }
        }
    };
    SpriteAnimation.prototype.playAni = function (callback, callbackThis) {
        if (this.m_pIsStart)
            this.playAction();
        this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
        if (this.m_pLoaderCompleteThis) {
            this.m_pLoaderComplete.call(this.m_pLoaderCompleteThis, null, this.m_pFrameAnim.acitonName, this);
        }
    };
    SpriteAnimation.prototype.loadFile = function (url, type) {
        RES.getResByUrl(url, this.onFileLoadComplete, this, type);
    };
    SpriteAnimation.prototype.onFileLoadComplete = function (textureMap) {
        var texture = textureMap['_textureMap'];
        if (!this.m_pFrameAnim)
            return;
        ++this.m_pNumComplete;
        if (this.m_bIsMultiFile) {
            FrameManager.onFileLoadComplete(textureMap);
        }
        else {
            FrameManager.setFrames(this.m_pFrameAnim.acitonName, texture, this.m_pNumComplete == this.m_pLoaderNum);
        }
        if (this.m_pNumComplete == this.m_pLoaderNum) {
            this.m_pLoaded = true;
            if (this.m_pIsStart)
                this.playAction();
            this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
            if (this.m_pLoaderComplete) {
                if (this.m_pLoaderCompleteThis) {
                    this.m_pLoaderComplete.call(this.m_pLoaderCompleteThis, textureMap, this.m_pFrameAnim.acitonName, this);
                }
                else {
                    this.m_pLoaderComplete(textureMap, this.m_pFrameAnim.acitonName, this);
                }
            }
        }
    };
    SpriteAnimation.prototype.runAction = function (callback, thisArg, needReset) {
        if (needReset === void 0) { needReset = true; }
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pIsStart = true;
        if (FrameManager.isCheck(this.m_pFrameAnim.acitonName)) {
            if (needReset) {
                this.m_pFrameAnim.resetFrameIndex();
            }
            this.playAction();
        }
    };
    SpriteAnimation.prototype.playAction = function () {
        this.m_pRepeatTimes = this.m_pFrameAnim.repeatTimes;
        this.isLife = true;
    };
    SpriteAnimation.prototype.stopAction = function () {
        this.isLife = false;
    };
    SpriteAnimation.prototype.removeAction = function (isClear) {
        if (isClear === void 0) { isClear = true; }
        this.stopAction();
        this.onDestroy();
        if (isClear)
            this.m_pFrameAnim.clear();
        this.m_pActionBitmaps = null;
        this.m_pThisArg = null;
        this.m_pCallback = null;
        this.m_pLoaderComplete = null;
        this.m_pLoaderCompleteThis = null;
        this.m_pFrameAnim = null;
        this.m_pCallArgs = null;
    };
    SpriteAnimation.prototype.onEnterFrame = function (delta) {
        if (this.m_pFrameAnim.isReset == false) {
            var frameIndex = this.m_pFrameAnim.frameIndex;
            this.m_pFrameAnim.nextFrame();
            if (frameIndex == this.m_pFrameAnim.frameIndex) {
                return;
            }
        }
        else {
            this.m_pFrameAnim.isReset = false;
        }
        if (!this.isRepeat && this.repeatTimes > 0) {
            if (this.m_pFrameAnim.isFirstFrame == true) {
                this.stopAction();
                if (this.m_pCallback) {
                    this.m_pCallback.call(this.m_pThisArg, this.m_pCallArgs);
                    this.m_pCallback = null;
                    this.m_pThisArg = null;
                }
                return;
            }
        }
        this.setFrames();
        if (!this.isRepeat && this.openFrameCall == true) {
            if (this.m_pCallback) {
                this.m_pCallback.call(this.m_pThisArg, this.m_pCallArgs);
            }
        }
        // this.m_pFrameAnim.nextFrame();
        // if (this.m_pFrameAnim.isFrameFinished) {
        //     if (!this.isRepeat) {
        //         this.stopAction();
        //         if (this.m_pCallback) {
        //             this.m_pCallback.call(this.m_pThisArg,this.m_pCallArgs);
        //             this.m_pCallback = null;
        //             this.m_pThisArg = null;
        //             return;
        //         }
        //     }
        // }
        // this.setFrames();
    };
    SpriteAnimation.prototype.setFrames = function () {
        for (var i = 0; i < this.m_pActionBitmaps.length; i++) {
            var sp = this.m_pActionBitmaps[i];
            var texture = this.m_pFrameAnim.getFrame();
            if (sp && texture) {
                if (this.textureAnchor == 0) {
                    sp.texture = texture;
                }
                else if (this.textureAnchor == 1) {
                    sp.setCenterTexture(texture);
                }
                else {
                    sp.setFootTexture(texture);
                }
            }
        }
    };
    return SpriteAnimation;
}(Animate));
__reflect(SpriteAnimation.prototype, "SpriteAnimation");
//# sourceMappingURL=SpriteAnimation.js.map