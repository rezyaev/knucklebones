export type TCell = number | null;
export type TColumn = [TCell, TCell, TCell];
export type TBoard = [TColumn, TColumn, TColumn];

export type TPlayer = {
	board: TBoard;
	currentDice: number;
};
