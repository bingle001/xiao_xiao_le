class RoleAnimation extends Animate {
    private m_pFrameAnim: FrameAnim;

    private m_pActionBitmaps: Array<AnimationSprite>;

    public isRepeat: boolean = false;
    private m_pNumComplete: number;
    private m_pLoaderNum: number;
    private m_pLoaderComplete: Function = null;
    private m_pLoaderCompleteThis: any = null;

    public constructor(targets: Array<AnimationSprite>, actionName?: string, framesToHold: number = 3, frameNumType: number = 0) {
        super();
        this.isLife = false;
        this.m_pActionBitmaps = targets;
        this.m_pFrameAnim = FrameAnim.createAnim(framesToHold, actionName, frameNumType);
    }

    public loadFiles(files: any[], callback?: Function, callbackThis?: any): void {
        this.m_pNumComplete = 0;
        this.m_pLoaderNum = files.length;
        this.m_pLoaderComplete = callback;
        this.m_pLoaderCompleteThis = callbackThis;
    }
}