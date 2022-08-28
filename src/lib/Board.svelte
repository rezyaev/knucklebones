<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Score } from "../types";
	import Dice from "./Dice.svelte";
	import { without } from "lodash-es";

	const dispatch = createEventDispatcher();

	export let cells: number[];
	export let score: Score;

	function getColumnByCellIndex(index: number) {
		if (index >= 0 && index < 3) return cells.slice(0, 3);
		if (index >= 3 && index < 6) return cells.slice(3, 6);
		if (index >= 6 && index < 9) return cells.slice(6, 9);
	}

	function calculateCellMultiplier(value: number, index: number) {
		let column = getColumnByCellIndex(index);
		if (!column) throw new Error("Column not found");

		if (!value) return 1;

		if (without(column, value).length === 0) return 3;
		if (without(column, value).length === 1) return 2;
		return 1;
	}
</script>

<div class="relative grid h-2/5 grid-flow-col grid-cols-3 grid-rows-3 gap-2">
	<div
		class="absolute -top-10 flex w-full gap-2 text-xl font-bold text-zinc-100"
	>
		<p class="flex-1 text-center">{score.col1}</p>
		<p class="flex-1 text-center">{score.col2}</p>
		<p class="flex-1 text-center">{score.col3}</p>
	</div>

	{#each cells as cell, index}
		<button
			class="flex items-center justify-center bg-stone-800"
			on:click="{() => dispatch('cellClick', index)}"
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
