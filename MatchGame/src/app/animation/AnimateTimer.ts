class Animate {
    private static FRAME_TIME_UPDATE: number = 16;
    public isLife: boolean = true;
    private updateTime: number = 0;
    public constructor() {
        AnimateTimer.Instance.push(this);
    }
    public onCreate(): void {
    }

    public onDestroy(): void {
        this.isLife = false;
        AnimateTimer.Instance.remove(this);
    }

    public onEnterFrame(delta: number): void {
    }

    public onTimer(delta: number): void {
        var frameTime: number = Animate.FRAME_TIME_UPDATE;
        this.updateTime += delta;
        if (this.updateTime > 5000) {
            this.updateTime = frameTime;
        }

        while (this.updateTime >= frameTime) {
            if (!this.isLife) {
                break;
            }
            this.onEnterFrame(frameTime);
            this.updateTime -= frameTime;
        }
    }
}

class AnimateTimer {
    private m_pList: Animate[] = [];
    private m_pTimeStamp: number = 0;
    public constructor() {

    }

    private onEnterFrame(timeStamp: number): boolean {
        var list = this.m_pList.concat();
        var delta: number = (timeStamp - this.m_pTimeStamp);
        for (var i = 0, length = list.length; i < length; i++) {
            var action: Animate = list[i];
            if (action.isLife) action.onTimer(delta);
        }
        this.m_pTimeStamp = timeStamp;

        return false;
    }

    public push(action: Animate): Animate {
        var isAction = this.m_pList.length == 0;

        this.m_pList.push(action);
        if (isAction) {
            this.m_pTimeStamp = egret.getTimer();
            egret.startTick(this.onEnterFrame, this);
        }
        return action;
    }

    public remove(action: Animate) {
        var index = this.m_pList.indexOf(action);
        if (index != -1) {
            this.m_pList.splice(index, 1);
        }
        if (this.m_pList.length == 0) {
            egret.stopTick(this.onEnterFrame, this);
        }
    }

    private static _instance: AnimateTimer;

    public static get Instance(): AnimateTimer {
        if (AnimateTimer._instance == null) {
            AnimateTimer._instance = new AnimateTimer();
        }
        return AnimateTimer._instance;
    }
}
