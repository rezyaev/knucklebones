import { random, without } from "lodash-es";
import { nanoid } from "nanoid";
import { circOut } from "svelte/easing";
import { crossfade } from "svelte/transition";
import type { TBoard, TColumn } from "../../types";

/* === Score === */
export function calculateColumnScore(column: TColumn) {
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
	let score = 0;
	for (const column of board) {
		score += calculateColumnScore(column);
	}

	return score;
}
/* === /Score === */

/* === AI === */
export function createMoveIndex(board: TBoard): number {
	const availableColumns = board
		.map((column, index) => ({ column, index }))
		.filter(({ column }) => column.includes(null))
		.map(({ index }) => index);
	return availableColumns[random(0, availableColumns.length - 1)];
}
/* === /AI === */

/* === ANIMATION === */
export const diceCrossfadeKey = nanoid();
export const diceCrossfade = crossfade({ duration: 250, easing: circOut });
/* === /ANIMATION === */
