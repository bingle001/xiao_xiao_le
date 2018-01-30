class MapAcceAction extends Animate {
	private m_pMoveNeedTime: number = 0;//0.01666 * 1.5;
	private m_pAcceleration: number = 0;
	private m_pActionTime: number = 0;
	private m_pMoveSpeed: number = 500;
	private m_pMaxSpeed: number = 3000;
	private m_pCosAcce: number = 0;
	private m_pSinAcce: number = 0;
	private m_pTarget: any;
	private m_pIsMove: boolean = false;

	public lastActionTime: number = 0;
	public lastPosition: egret.Point = new egret.Point(0, 0);
	private m_pActionPosition: egret.Point = new egret.Point(0, 0);

	public constructor() {
		super();
		this.isLife = false;
	}

	public onDestroy(): void {
		this.isLife = false;
		super.onDestroy();
		this.m_pTarget = null;
		egret.Point.release(this.lastPosition);
		this.lastPosition = null;
		egret.Point.release(this.m_pActionPosition);
		this.m_pActionPosition = null;
	}

	public onAccelerMove(target: any, props: egret.Point): void {
		this.m_pTarget = target;
		this.m_pActionPosition = props;
		var subPoint: egret.Point = props.subtract(this.lastPosition);
		var distance: number = egret.Point.distance(props, this.lastPosition);

		this.onCalc(distance, subPoint);
	}

	public onMoveTo(target: any, curProps: egret.Point, toProps: egret.Point): void {
		this.m_pTarget = target;
		this.m_pActionPosition = curProps;
		var subPoint: egret.Point = toProps.subtract(curProps);

		var distance: number = egret.Point.distance(toProps, curProps);

		this.m_pIsMove = true;

		this.onCalc(distance, subPoint, 0);
	}

	private onCalc(distance: number, subPoint: egret.Point, acce: number = 3.8): void {
		var radian: number = Math.atan2(subPoint.y, subPoint.x);

		if (distance > 0) {

			var detalTime = (egret.getTimer() - this.lastActionTime) / 1000;

			this.m_pMoveSpeed = acce == 0 ? distance / 0.01666 : distance / detalTime;

			this.m_pActionTime = 0;
			this.m_pCosAcce = Math.cos(radian);
			this.m_pSinAcce = Math.sin(radian);

			this.m_pMoveSpeed = this.m_pMoveSpeed > this.m_pMaxSpeed ? this.m_pMaxSpeed : this.m_pMoveSpeed;
			this.m_pAcceleration = -(this.m_pMoveSpeed * acce);
			this.m_pMoveNeedTime = distance / this.m_pMoveSpeed;
			this.isLife = true;
		}
	}

	public onEnterFrame(advancedTime: number): void {
		this.m_pActionTime += advancedTime / 1000;
		var speed: number = this.m_pMoveSpeed + this.m_pAcceleration * this.m_pActionTime;

		var sx = this.m_pMoveSpeed * this.m_pActionTime + this.m_pAcceleration * this.m_pActionTime * this.m_pActionTime / 2;
		var x = sx * this.m_pCosAcce;
		var y = sx * this.m_pSinAcce;
		var position: egret.Point = this.m_pActionPosition.add(egret.Point.create(x, y));

		if (speed <= 0) {
			this.isLife = false;
		}

		if (this.m_pIsMove && this.m_pActionTime >= this.m_pMoveNeedTime) {
			this.m_pIsMove = false;
			this.isLife = false;
		}

		this.m_pTarget.onMoveTo(position);
		if (!this.isLife) {
			this.m_pTarget.onMoveEnd(position);
		}
	}
}