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
/**
 * 方向
 *
 * 	5  6  7
 * 	4     8
 * 	3  2  1
 *  8个方向
 */
var NPC_Direction;
(function (NPC_Direction) {
    NPC_Direction[NPC_Direction["RightDown"] = 1] = "RightDown";
    NPC_Direction[NPC_Direction["Down"] = 2] = "Down";
    NPC_Direction[NPC_Direction["LeftDown"] = 3] = "LeftDown";
    NPC_Direction[NPC_Direction["Left"] = 4] = "Left";
    NPC_Direction[NPC_Direction["LeftUp"] = 5] = "LeftUp";
    NPC_Direction[NPC_Direction["Up"] = 6] = "Up";
    NPC_Direction[NPC_Direction["RightUp"] = 7] = "RightUp";
    NPC_Direction[NPC_Direction["Right"] = 8] = "Right";
})(NPC_Direction || (NPC_Direction = {}));
/** npc动画 */
var NpcAnimation = (function (_super) {
    __extends(NpcAnimation, _super);
    function NpcAnimation(targets, npc_name, direction, status) {
        var _this = _super.call(this) || this;
        _this.m_pThisArg = null;
        _this.m_pCallback = null;
        _this.m_pCallArgs = null;
        _this.m_pIsStart = false;
        _this.m_pRepeatTimes = 0;
        _this.isRepeat = false; //是否重复
        _this.lock = false; //锁
        _this.openFrameCall = false; //false不开启逐帧回调，true开启
        _this.isLife = false;
        _this.m_pActionBitmaps = targets;
        _this.m_sNpcName = npc_name;
        _this.m_iDirection = direction;
        _this.m_iLastDirection = 0;
        _this.m_sStatus = status;
        _this.m_pFramesToHold = 6;
        _this.m_pFrameAnim = FrameAnim.createAnim(_this.m_pFramesToHold, _this.actionName, FrameAnimNumType.num);
        _this.m_pFrameAnim.numFrames = FrameManager.numFrames(_this.m_pFrameAnim.acitonName);
        _this.setFrames(true);
        _this.setAnchor();
        FrameManager.loadRoleFrames(npc_name);
        return _this;
    }
    NpcAnimation.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    NpcAnimation.prototype.removeAction = function (isClear) {
        if (isClear === void 0) { isClear = true; }
        this.stopAction();
        this.onDestroy();
        if (isClear)
            this.m_pFrameAnim.clear();
        this.m_pActionBitmaps = null;
        this.m_pThisArg = null;
        this.m_pCallback = null;
        this.m_pCallArgs = null;
        this.m_pFrameAnim = null;
    };
    Object.defineProperty(NpcAnimation.prototype, "anim", {
        get: function () {
            return this.m_pFrameAnim;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpcAnimation.prototype, "framesToHold", {
        get: function () {
            return this.m_pFramesToHold;
        },
        set: function (frames) {
            this.m_pFramesToHold = frames;
            this.m_pFrameAnim.framesToHold = this.m_pFramesToHold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpcAnimation.prototype, "repeatTimes", {
        get: function () {
            return this.m_pFrameAnim.repeatTimes - this.m_pRepeatTimes;
        },
        enumerable: true,
        configurable: true
    });
    NpcAnimation.prototype.runAction = function (callback, thisArg, needReset) {
        if (needReset === void 0) { needReset = true; }
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pIsStart = true;
        if (needReset) {
            this.m_pFrameAnim.resetFrameIndex();
        }
        this.playAction();
    };
    NpcAnimation.prototype.setCallBack = function (callback, thisArg, args) {
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pCallArgs = args;
    };
    Object.defineProperty(NpcAnimation.prototype, "sprites", {
        get: function () {
            return this.m_pActionBitmaps;
        },
        set: function (targets) {
            this.m_pActionBitmaps = targets;
        },
        enumerable: true,
        configurable: true
    });
    NpcAnimation.prototype.setDirection = function (direction) {
        this.m_iDirection = direction;
        this.setAnchor();
        this.resetFrameAnim();
    };
    NpcAnimation.prototype.setStatus = function (status) {
        if (this.lock) {
            debug("被锁了", status);
            return;
        }
        this.m_sStatus = status;
        this.setAnchor();
        this.resetFrameAnim();
    };
    NpcAnimation.prototype.getStatus = function () {
        return this.m_sStatus;
    };
    NpcAnimation.prototype.resetFrameAnim = function () {
        this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.actionName);
        this.m_pFrameAnim.actionName = this.actionName;
        this.m_pFrameAnim.resetFrameIndex();
        this.setFrames(true);
    };
    NpcAnimation.prototype.playAction = function () {
        this.m_pRepeatTimes = this.m_pFrameAnim.repeatTimes;
        this.isLife = true;
    };
    NpcAnimation.prototype.stopAction = function () {
        this.isLife = false;
    };
    //todo 待优化,先处理频率再处理
    NpcAnimation.prototype.onEnterFrame = function (delta) {
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
                    // this.m_pCallback = null;
                    // this.m_pThisArg = null;
                    // this.m_pCallArgs = null;
                }
                return;
            }
        }
        this.setFrames(true);
        if (!this.isRepeat && this.openFrameCall == true) {
            if (this.m_pCallback) {
                this.m_pCallback.call(this.m_pThisArg, this.m_pCallArgs);
            }
        }
    };
    NpcAnimation.prototype.setFrames = function (is_init) {
        var len = this.m_pActionBitmaps.length;
        if (len == 0) {
            return;
        }
        var skewy = 0;
        if (this.m_iDirection >= NPC_Direction.LeftDown && this.m_iDirection <= NPC_Direction.LeftUp) {
            skewy = 180;
        }
        this.m_iLastDirection = this.m_iDirection;
        for (var i = 0; i < len; i++) {
            var sp = this.m_pActionBitmaps[i];
            var texture = this.m_pFrameAnim.getFrame();
            if (sp) {
                if (is_init) {
                    // sp.setCenterTexture(texture);
                    sp.texture = texture;
                }
                else {
                    sp.texture = texture;
                }
                if (sp.skewY != skewy) {
                    sp.skewY = skewy;
                }
            }
        }
    };
    NpcAnimation.prototype.setAnchor = function () {
        // let conf = NpcConf.getAnchorConf(this.actionName.replace("EBattleNpc_d", "EBattleNpc_"));
        // if (conf) {
        //     for (let i = 0; i < this.m_pActionBitmaps.length; i++) {
        //         let sp = this.m_pActionBitmaps[i];
        //         sp.anchorOffsetX = conf.anchorOffsetX;
        //         sp.anchorOffsetY = conf.anchorOffsetY;
        //     }
        // }
    };
    Object.defineProperty(NpcAnimation.prototype, "actionName", {
        get: function () {
            var action_name = this.m_sNpcName + "_" + this.realDirection + "_" + this.m_sStatus;
            return action_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpcAnimation.prototype, "realDirection", {
        get: function () {
            var direction = this.m_iDirection;
            if (this.m_iDirection == NPC_Direction.Left) {
                direction = NPC_Direction.Right;
            }
            else if (this.m_iDirection == NPC_Direction.LeftUp) {
                direction = NPC_Direction.RightUp;
            }
            else if (this.m_iDirection == NPC_Direction.LeftDown) {
                direction = NPC_Direction.RightDown;
            }
            return direction;
        },
        enumerable: true,
        configurable: true
    });
    return NpcAnimation;
}(Animate));
__reflect(NpcAnimation.prototype, "NpcAnimation");
//# sourceMappingURL=NpcAnimation.js.map