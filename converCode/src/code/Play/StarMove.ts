/// 星星移动 组件 （挂在star游戏对象下）
class StarMove extends GameObject {

	public constructor() {
		super();
	}

	private X = -1;
	private Y = -1;
	private actived: boolean = false;

	private Start(): void	//IEnumerator
	{
		this.X = 0;
		this.Y = 0;
		// yield return new WaitForSeconds(1f);
		this.actived = true;
		// yield return new WaitForSeconds(0.75f);

		//TODO
		//GameObject.Find("JewelStar").transform.GetChild(0).gameObject.SetActive(true);
		//Destroy(gameObject);
	}

	public Update(): void {

		if (this.actived) {
			this.X = JewelSpawner.spawn.JewelGrib[GameController.action.JewelStar.jewel.JewelPosition.x][GameController.action.JewelStar.jewel.JewelPosition.y].position.x;
			this.Y = JewelSpawner.spawn.JewelGrib[GameController.action.JewelStar.jewel.JewelPosition.x][GameController.action.JewelStar.jewel.JewelPosition.y].position.y;
		}

		if (this.X != -1 && this.X != this.localPosition.x)
			this.MoveToX(this.X);
		if (this.Y != -1 && this.Y != this.localPosition.y)
			this.MoveToY(this.Y);

	}
	private MoveToX(x: number): void {
		if (Math.abs(x - this.localPosition.x) > 0.15) {
			if (this.localPosition.x > x) {
				// this.localPosition -= new Vector3(Time.smoothDeltaTime * 6f, 0, 0);
				this.u3dX -= Time.smoothDeltaTime * 6;
			}
			else if (this.localPosition.x < x) {
				// transform.localPosition += new Vector3(Time.smoothDeltaTime * 6f, 0, 0);
				this.u3dX += Time.smoothDeltaTime * 6;
			}
		}
		else {
			// transform.localPosition = new Vector3(x, transform.localPosition.y, transform.localPosition.z);
			this.u3dX = x;
			this.X = -1;
		}
	}
	private MoveToY(y: number): void {
		if (Math.abs(y - this.localPosition.y) > 0.15) {
			if (this.localPosition.y > y) {
				// transform.localPosition -= new Vector3(0, Time.smoothDeltaTime * 8f, 0);
				this.u3dY -= Time.smoothDeltaTime * 8;
			}
			else if (this.localPosition.y < y) {
				// transform.localPosition += new Vector3(0, Time.smoothDeltaTime * 8f, 0);
				this.u3dY += Time.smoothDeltaTime * 8;
			}
		}
		else {
			// transform.localPosition = new Vector3(transform.localPosition.x, y, transform.localPosition.z);
			this.u3dY = y;
			this.Y = -1;

		}
	}


}