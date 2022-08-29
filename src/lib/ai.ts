import { random } from "lodash-es";
import type { TPlayer } from "../types";

export function makeMove(ai: TPlayer): TPlayer {
	const emptyCellIndexes = ai.board
		.map((cell, index) => ({ value: cell, index }))
		.filter((cell) => !cell.value)
		.map((cell) => cell.index);
	const cellIndex = emptyCellIndexes[random(0, emptyCellIndexes.length - 1)];

	const updatedBoard = [
		...ai.board.slice(0, cellIndex),
		ai.currentDice,
		...ai.board.slice(cellIndex + 1),
	];

	return {
		board: updatedBoard,
		currentDice: random(1, 6),
	};
}
