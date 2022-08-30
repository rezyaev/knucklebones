import { random } from "lodash-es";
import type { TBoard } from "../../types";

export function createMoveIndex(board: TBoard): number {
	const availableColumns = board
		.map((column, index) => ({ column, index }))
		.filter(({ column }) => column.includes(null))
		.map(({ index }) => index);
	return availableColumns[random(0, availableColumns.length - 1)];
}
