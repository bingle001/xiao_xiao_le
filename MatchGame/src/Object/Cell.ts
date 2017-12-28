// 格子
class Cell {

	public CellType: number;		// type cell with 4 : red; 3 : blue; 2 : gray; 1 : transparent.
	public CellPosition: Vector2;	// position vector 2 of cell
	public CellEffect: number;		// 4 : link, 5 : ice

	public constructor() {
	}
}