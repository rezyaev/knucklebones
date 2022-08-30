import { random } from "lodash-es";
import type { TBoard } from "./board";

export function createMoveIndex(board: TBoard): number {
	const emptyCellIndexes = board
		.map((cell, index) => ({ value: cell, index }))
		.filter((cell) => !cell.value)
		.map((cell) => cell.index);
	return emptyCellIndexes[random(0, emptyCellIndexes.length - 1)];
}
