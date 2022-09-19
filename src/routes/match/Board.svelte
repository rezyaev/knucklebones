<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Dice from "../../routes/match/Dice.svelte";
	import { without } from "lodash-es";
	import { calculateColumnScore, diceCrossfade, diceCrossfadeKey } from "./utils";
	import type { TBoard, TCell, TColumn } from "../../types";

	const dispatch = createEventDispatcher();
	const [send, receive] = diceCrossfade;

	export let board: TBoard;
	export let columnScorePosition: "top" | "bottom";
	export let disabled: boolean;

	function calculateCellMultiplier(column: TColumn, value: TCell) {
		if (!value) return 1;

		if (without(column, value).length === 0) return 3;
		if (without(column, value).length === 1) return 2;
		return 1;
	}

	function handleColumnClick(index: number) {
		if (disabled || !board[index].includes(null)) return;

		dispatch("columnClick", index);
	}
</script>

<div class="relative flex h-2/5 gap-2">
	<div
		class="absolute -top-8 flex w-full gap-2 text-center text-xl font-bold text-zinc-100 "
		class:-top-8="{columnScorePosition === 'top'}"
		class:-bottom-8="{columnScorePosition === 'bottom'}"
	>
		{#each board as column}
			<p class="flex-1 text-center">{calculateColumnScore(column)}</p>
		{/each}
	</div>

	{#each board as column, index}
		<button
			class="flex flex-1 flex-col items-stretch gap-2"
			on:click="{() => handleColumnClick(index)}"
		>
			{#each column as cell}
				<div class="flex flex-1 items-center justify-center bg-stone-800">
					{#if cell}
						<div in:receive="{{ key: diceCrossfadeKey }}">
							<Dice value="{cell}" multiplier="{calculateCellMultiplier(column, cell)}" />
						</div>
					{/if}
				</div>
			{/each}
		</button>
	{/each}
</div>
