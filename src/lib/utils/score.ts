import { without } from "lodash-es";
import type { TBoard } from "./board";

export function calculateColumnScore(column: TBoard) {
	let score = 0;
	for (const cell of column) {
		if (!cell) {
			score += 0;
		} else if (without(column, cell).length === 0) {
			score += cell * 3;
		} else if (without(column, cell).length === 1) {
			score += cell * 2;
		} else {
			score += cell;
		}
	}

	return score;
}

export function calculateTotalScore(board: TBoard) {
	return (
		calculateColumnScore(board.slice(0, 3)) +
		calculateColumnScore(board.slice(3, 6)) +
		calculateColumnScore(board.slice(6, 9))
	);
}