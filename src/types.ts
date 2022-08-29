export type TBoard = (number | null)[];

export type TPlayer = {
	board: TBoard;
	currentDice: number;
};
