export type TBoard = (number | null)[];

export function getColumnByCellIndex(board: TBoard, index: number): TBoard {
	if (index >= 0 && index < 3) return board.slice(0, 3);
	if (index >= 3 && index < 6) return board.slice(3, 6);
	if (index >= 6 && index < 9) return board.slice(6, 9);

	throw new Error("Column not found");
}

export function getColumnIndexesByCellIndex(index: number) {
	if (index >= 0 && index < 3) return [0, 1, 2];
	if (index >= 3 && index < 6) return [3, 4, 5];
	if (index >= 6 && index < 9) return [6, 7, 8];

	throw new Error("Column not found");
}
