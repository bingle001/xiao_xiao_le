/**
 * 方向
 *
 * 	5  6  7
 * 	4     8
 * 	3  2  1
 *  8个方向
 */
enum NPC_Direction {
    RightDown = 1,
    Down = 2,
    LeftDown = 3,
    Left = 4,
    LeftUp = 5,
    Up = 6,
    RightUp = 7,
    Right = 8,
}

/** npc动画 */
class NpcAnimation extends Animate {

    private m_pActionBitmaps: Array<AnimationSprite>;
    private m_pFrameAnim: FrameAnim;

    private m_pThisArg: any = null;
    private m_pCallback: Function = null;
    private m_pCallArgs: any = null;

    private m_pIsStart: boolean = false;

    private m_sNpcName;             //士兵名字
    private m_iDirection: number;    //方向
    private m_iLastDirection: number; //上次的方向
    private m_sStatus: string;       //状态
    private m_pFramesToHold: number;
    private m_pRepeatTimes: number = 0;

    public isRepeat: boolean = false;   //是否重复
    public lock: boolean = false;     //锁
    public openFrameCall: boolean = false;//false不开启逐帧回调，true开启


    public onDestroy(): void {
        super.onDestroy();
    }

    public removeAction(isClear = true) {
        this.stopAction();
        this.onDestroy();
        if (isClear) this.m_pFrameAnim.clear();
        this.m_pActionBitmaps = null;
        this.m_pThisArg = null;
        this.m_pCallback = null;
        this.m_pCallArgs = null;
        this.m_pFrameAnim = null;
    }

    public constructor(targets: Array<AnimationSprite>, npc_name: string, direction: NPC_Direction, status: string) {
        super();
        this.isLife = false;
        this.m_pActionBitmaps = targets;
        this.m_sNpcName = npc_name;
        this.m_iDirection = direction;
        this.m_iLastDirection = 0;
        this.m_sStatus = status;

        this.m_pFramesToHold = 6;
        this.m_pFrameAnim = FrameAnim.createAnim(this.m_pFramesToHold, this.actionName, FrameAnimNumType.num);
        this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
        this.setFrames(true);
        this.setAnchor();

        FrameManager.loadRoleFrames(npc_name);
    }

    public get anim(): FrameAnim {
        return this.m_pFrameAnim;
    }

    public get framesToHold() {
        return this.m_pFramesToHold;
    }
    public set framesToHold(frames) {
        this.m_pFramesToHold = frames;
        this.m_pFrameAnim.framesToHold = this.m_pFramesToHold;
    }

    public get repeatTimes() {
        return this.m_pFrameAnim.repeatTimes - this.m_pRepeatTimes;
    }

    public runAction(callback?: Function, thisArg?: any, needReset: boolean = true): void {
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pIsStart = true;
        if (needReset) {
            this.m_pFrameAnim.resetFrameIndex();
        }
        this.playAction();
    }

    public setCallBack(callback: Function, thisArg: any, args: any) {
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pCallArgs = args;
    }

    public get sprites() {
        return this.m_pActionBitmaps;
    }

    public set sprites(targets) {
        this.m_pActionBitmaps = targets;
    }


    public setDirection(direction) {
        this.m_iDirection = direction;
        this.setAnchor();
        this.resetFrameAnim();
    }

    public setStatus(status) {
        if (this.lock) {
            debug("被锁了", status);
            return;
        }

        this.m_sStatus = status;
        this.setAnchor();
        this.resetFrameAnim();
    }
    public getStatus() {
        return this.m_sStatus;
    }

    private resetFrameAnim() {
        this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.actionName);
        this.m_pFrameAnim.actionName = this.actionName;
        this.m_pFrameAnim.resetFrameIndex();
        this.setFrames(true);
    }

    public playAction() {
        this.m_pRepeatTimes = this.m_pFrameAnim.repeatTimes;
        this.isLife = true;
    }

    public stopAction() {
        this.isLife = false;
    }


    //todo 待优化,先处理频率再处理
    public onEnterFrame(delta: number): void {
        if (this.m_pFrameAnim.isReset == false) {
            let frameIndex: number = this.m_pFrameAnim.frameIndex;
            this.m_pFrameAnim.nextFrame();
            if (frameIndex == this.m_pFrameAnim.frameIndex) {
                return;
            }
        } else {
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
    }

    private setFrames(is_init: boolean) {
        let len = this.m_pActionBitmaps.length;
        if (len == 0) {
            return;
        }
        let skewy = 0;
        if (this.m_iDirection >= NPC_Direction.LeftDown && this.m_iDirection <= NPC_Direction.LeftUp) {
            skewy = 180;
        }
        this.m_iLastDirection = this.m_iDirection;

        for (let i = 0; i < len; i++) {
            let sp = this.m_pActionBitmaps[i];
            let texture = this.m_pFrameAnim.getFrame();
            if (sp) {
                if (is_init) {
                    // sp.setCenterTexture(texture);
                    sp.texture = texture;
                } else {
                    sp.texture = texture;
                }
                if (sp.skewY != skewy) {
                    sp.skewY = skewy;
                }
            }
        }
    }

    private setAnchor() {
        // let conf = NpcConf.getAnchorConf(this.actionName.replace("EBattleNpc_d", "EBattleNpc_"));
        // if (conf) {
        //     for (let i = 0; i < this.m_pActionBitmaps.length; i++) {
        //         let sp = this.m_pActionBitmaps[i];
        //         sp.anchorOffsetX = conf.anchorOffsetX;
        //         sp.anchorOffsetY = conf.anchorOffsetY;
        //     }
        // }
    }

    private get actionName() {
        let action_name = this.m_sNpcName + "_" + this.realDirection + "_" + this.m_sStatus;
        return action_name;
    }

    private get realDirection() {
        let direction = this.m_iDirection;
        if (this.m_iDirection == NPC_Direction.Left) {
            direction = NPC_Direction.Right;
        } else if (this.m_iDirection == NPC_Direction.LeftUp) {
            direction = NPC_Direction.RightUp;
        } else if (this.m_iDirection == NPC_Direction.LeftDown) {
            direction = NPC_Direction.RightDown;
        }
        return direction;
    }
}