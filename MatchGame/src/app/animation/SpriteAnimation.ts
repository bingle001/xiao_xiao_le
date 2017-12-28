enum FrameAnimNumType { num, string };

class FrameAnim {
    public framesToHold: number = 3;
    public frameToCenter: string = '';
    public frameNumType: number = 0;  // 0. 1,2,3, 1. 01,02,03
    public frameIndex: number = 0;//当前帧位置

    private m_bIsReverse: boolean = false; //是否倒序
    private m_pNextFrameIndex: number = 0;
    private m_pActionName: string = '';
    private m_pNumFrames: number = 0;
    private m_pFrameInterval: Array<number> = [];//循环区间帧

    public isReset: boolean = false;//是否已重置
    public repeatTimes: number = 0;//循环次数

    public get acitonName() {
        return this.m_pActionName;
    }

    public constructor(actionName?: string) {
        this.actionName = actionName;
    }

    public set numFrames(len: number) {
        this.m_pNumFrames = len;
    }

    public get numFrames(): number {
        if (this.m_pNumFrames == 0) {
            this.m_pNumFrames = FrameManager.numFrames(this.acitonName);
        }

        // debug("m_pNumFrames",this.m_pNumFrames)
        return this.m_pNumFrames;
    }

    public set isReverse(bool) {
        this.m_bIsReverse = bool;
        this.resetFrameIndex();
    }

    public set actionName(name: string) {
        this.m_pActionName = name;
        this.resetFrameIndex();
    }

    public nextFrame(): void {
        ++this.m_pNextFrameIndex;
        if (this.m_pNextFrameIndex >= this.framesToHold) {
            this.m_pNextFrameIndex = 0;
            if (this.m_bIsReverse) {
                let index = this.m_pFrameInterval.indexOf(this.frameIndex);
                if (index > 0 && index % 2 == 0) {
                    this.frameIndex = this.m_pFrameInterval[index + 1];
                } else {
                    --this.frameIndex;
                }
                if (this.frameIndex < 0) {
                    this.frameIndex = this.numFrames - 1;
                    this.repeatTimes++;
                }
            } else {
                let index = this.m_pFrameInterval.indexOf(this.frameIndex);
                if (index > 0 && index % 2 == 1) {
                    this.frameIndex = this.m_pFrameInterval[index - 1];
                } else {
                    ++this.frameIndex;
                }
                if (this.frameIndex >= this.numFrames) {
                    this.frameIndex = 0;
                    this.repeatTimes++;
                }
            }
        }
    }

    /**
     * 设置帧区间(start <= 帧 <= end)
     */
    public setFrameInterval(start: number, end: number) {
        if (end < start) {
            return;
        }
        this.m_pFrameInterval.push(start, end);
    }

    public clearFrameInterval() {
        this.m_pFrameInterval.length = 0;
    }

    public resetFrameIndex() {
        this.isReset = true;
        this.repeatTimes = 0;
        this.m_pNextFrameIndex = 0;
        if (this.m_bIsReverse) {
            this.frameIndex = this.m_pNumFrames - 1;
        } else {
            this.frameIndex = 0;
        }
    }

    public get isEndFrame() {
        if (this.m_bIsReverse) {
            return (this.frameIndex == 0);
        } else {
            return (this.frameIndex == this.m_pNumFrames - 1);
        }
    }

    public get isFirstFrame() {
        if (this.m_bIsReverse) {
            return (this.frameIndex == this.m_pNumFrames - 1);
        } else {
            return (this.frameIndex == 0);
        }
    }

    public getLastFrame() {
        var last_index = this.m_bIsReverse ? 0 : this.m_pNumFrames - 1;
        var name;
        var suffix = "_png";
        if (this.frameNumType == 0) {
            name = this.m_pActionName + '_' + this.frameToCenter + last_index;
        } else {
            name = this.m_pActionName + '_' + this.num2Zero(last_index);
        }
        return FrameManager.getFrame(this.m_pActionName, name + suffix);
    }

    public getFrame(): any {
        var name;
        var suffix = "_png";
        if (this.frameNumType == 0) {
            name = this.m_pActionName + '_' + this.frameToCenter + this.frameIndex;
        } else {
            name = this.m_pActionName + '_' + this.num2Zero(this.frameIndex);
        }
        return FrameManager.getFrame(this.m_pActionName, name + suffix);
    }

    private num2Zero(index): string {
        var str = index < 10 ? "0" + index : "" + index;
        return str;
    }


    public clear(): void {
        FrameManager.removeFrames(this.m_pActionName);
    }

    public static createAnim(framesToHold: number = 3, actionName?: string, frameNumType: number = 0, frameIndex: number = 0): FrameAnim {
        var action: FrameAnim = new FrameAnim(actionName);
        action.framesToHold = framesToHold;
        action.frameNumType = frameNumType;
        action.frameIndex = frameIndex;
        return action;
    }
}

class SpriteAnimation extends Animate {
    public isRepeat: boolean = false;
    public m_bIsMultiFile: boolean = false
    private m_pNumComplete: number;
    private m_pLoaderNum: number;
    private m_pLoaded: boolean = false;
    private m_pIsStart: boolean = false;
    private m_pFrameAnim: FrameAnim;

    private m_pActionBitmaps: Array<AnimationSprite> = [];
    private m_pThisArg: any = null;
    private m_pCallback: Function = null;
    private m_pCallArgs: any = null;

    private m_pLoaderComplete: Function = null;
    private m_pLoaderCompleteThis: any = null;
    private m_pRepeatTimes: number = 0;

    public textureAnchor: number = 0;//0不设置1.中心点,2脚底
    public openFrameCall: boolean = false;//false不开启逐帧回调，true开启

    public constructor(targets: Array<AnimationSprite>, actionName?: string, framesToHold: number = 3, frameNumType: number = 0, frameIndex: number = 0) {
        super();
        this.isLife = false;
        this.m_pActionBitmaps = targets;
        this.m_pFrameAnim = FrameAnim.createAnim(framesToHold, actionName, frameNumType, frameIndex);
    }

    public setCallBack(callback: Function, thisArg: any, args?: any) {
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

    public removeOneImageSprite(sprite: egret.Bitmap) {
        let sprites = this.sprites;
        for (let i = 0; i < sprites.length; i++) {
            let imgSprite = sprites[i];
            if (imgSprite.hashCode == sprite.hashCode) {
                sprites.splice(i, 1);
                return;
            }
        }
    }

    public resetFrameAnim() {
        this.m_pFrameAnim.resetFrameIndex();
    }

    public get anim(): FrameAnim {
        return this.m_pFrameAnim;
    }

    public set isReverse(bool: boolean) {
        this.m_pFrameAnim.isReverse = bool;
    }

    public set framesToHold(framesToHold) {
        this.m_pFrameAnim.framesToHold = framesToHold;
    }

    public get repeatTimes() {
        return this.m_pFrameAnim.repeatTimes - this.m_pRepeatTimes;
    }

    public loadFiles(files: any[], callback?: Function, callbackThis?: any): void {
        this.m_pNumComplete = 0;
        this.m_pLoaderNum = files.length;
        this.m_pLoaderComplete = callback;
        this.m_pLoaderCompleteThis = callbackThis;
        if (FrameManager.isCheck(this.m_pFrameAnim.acitonName)) {
            if (this.m_pIsStart) this.playAction();
            this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
            if (this.m_pLoaderCompleteThis) {
                let self = this;
                egret.callLater(function () {
                    self.m_pLoaderComplete && self.m_pLoaderComplete.call(self.m_pLoaderCompleteThis, null, self.m_pFrameAnim.acitonName, self);
                    self.m_pLoaderComplete = null;
                    self.m_pLoaderCompleteThis = null;
                }, this);
            }
        } else {
            for (var i: number = 0; i < this.m_pLoaderNum; i++) {
                this.loadFile(files[i], RES.ResourceItem.TYPE_SHEET);
            }
        }
    }

    public playAni(callback?: Function, callbackThis?: any) {
        if (this.m_pIsStart) this.playAction();
        this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
        if (this.m_pLoaderCompleteThis) {
            this.m_pLoaderComplete.call(this.m_pLoaderCompleteThis, null, this.m_pFrameAnim.acitonName, this);
        }
    }

    private loadFile(url: string, type?: string): void {
        RES.getResByUrl(url, this.onFileLoadComplete, this, type);
    }

    protected onFileLoadComplete(textureMap: any): void {
        var texture: any = textureMap['_textureMap'];

        if (!this.m_pFrameAnim) return;

        ++this.m_pNumComplete;
        if (this.m_bIsMultiFile) {
            FrameManager.onFileLoadComplete(textureMap);
        } else {
            FrameManager.setFrames(this.m_pFrameAnim.acitonName, texture, this.m_pNumComplete == this.m_pLoaderNum)
        }
        if (this.m_pNumComplete == this.m_pLoaderNum) {
            this.m_pLoaded = true;
            if (this.m_pIsStart) this.playAction();
            this.m_pFrameAnim.numFrames = FrameManager.numFrames(this.m_pFrameAnim.acitonName);
            if (this.m_pLoaderComplete) {
                if (this.m_pLoaderCompleteThis) {
                    this.m_pLoaderComplete.call(this.m_pLoaderCompleteThis, textureMap, this.m_pFrameAnim.acitonName, this);
                } else {
                    this.m_pLoaderComplete(textureMap, this.m_pFrameAnim.acitonName, this);
                }
            }
        }
    }

    public runAction(callback?: Function, thisArg?: any, needReset: boolean = true): void {
        this.m_pCallback = callback;
        this.m_pThisArg = thisArg;
        this.m_pIsStart = true;
        if (FrameManager.isCheck(this.m_pFrameAnim.acitonName)) {
            if (needReset) {
                this.m_pFrameAnim.resetFrameIndex();
            }
            this.playAction();
        }
    }

    public playAction() {
        this.m_pRepeatTimes = this.m_pFrameAnim.repeatTimes;
        this.isLife = true;
    }

    public stopAction() {
        this.isLife = false;
    }

    public removeAction(isClear = true) {
        this.stopAction();
        this.onDestroy();
        if (isClear) this.m_pFrameAnim.clear();
        this.m_pActionBitmaps = null;
        this.m_pThisArg = null;
        this.m_pCallback = null;
        this.m_pLoaderComplete = null;
        this.m_pLoaderCompleteThis = null;
        this.m_pFrameAnim = null;
        this.m_pCallArgs = null;
    }

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
    }


    public setFrames() {
        for (let i = 0; i < this.m_pActionBitmaps.length; i++) {
            let sp = this.m_pActionBitmaps[i];
            let texture = this.m_pFrameAnim.getFrame();
            if (sp && texture) {
                if (this.textureAnchor == 0) {
                    sp.texture = texture;
                } else if (this.textureAnchor == 1) {
                    sp.setCenterTexture(texture);
                } else {
                    sp.setFootTexture(texture);
                }
            }
        }
    }

    
}
