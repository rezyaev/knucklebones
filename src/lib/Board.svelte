<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Dice from "./Dice.svelte";
	import { without } from "lodash-es";
	import { calculateColumnScore } from "./score";
	import { getColumnByCellIndex, type TBoard } from "./board";

	const dispatch = createEventDispatcher();

	export let board: TBoard;
	export let columnScorePosition: "top" | "bottom";
	export let disabled: boolean;

	function calculateCellMultiplier(value: number, index: number) {
		let column = getColumnByCellIndex(board, index);
		if (!column) throw new Error("Column not found");

		if (!value) return 1;

		if (without(column, value).length === 0) return 3;
		if (without(column, value).length === 1) return 2;
		return 1;
	}

	function handleCellClick(index: number) {
		if (disabled || board[index]) return;

		dispatch("cellClick", index);
	}
</script>

<div class="relative grid h-2/5 grid-flow-col grid-cols-3 grid-rows-3 gap-2">
	<div
		class="absolute -top-10 flex w-full gap-2 text-xl font-bold text-zinc-100"
		class:-top-10="{columnScorePosition === 'top'}"
		class:-bottom-10="{columnScorePosition === 'bottom'}"
	>
		<p class="flex-1 text-center">{calculateColumnScore(board.slice(0, 3))}</p>
		<p class="flex-1 text-center">{calculateColumnScore(board.slice(3, 6))}</p>
		<p class="flex-1 text-center">{calculateColumnScore(board.slice(6, 9))}</p>
	</div>

	{#each board as cell, index}
		<button
			class="flex items-center justify-center bg-stone-800"
			on:click="{() => handleCellClick(index)}"
		>
			{#if cell}
				<Dice
					value="{cell}"
					multiplier="{calculateCellMultiplier(cell, index)}"
				/>
			{/if}
		</button>
	{/each}
</div>
