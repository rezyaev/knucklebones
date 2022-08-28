<script lang="ts">
	import "./app.css";
	import { random, sum, without } from "lodash-es";
	import Dice from "./lib/Dice.svelte";

	let currentDice = random(1, 6);
	let cells = Array(9).fill(null);

	function putDice(index: number) {
		if (cells[index]) return;

		cells[index] = currentDice;
		currentDice = random(1, 6);
	}

	function getColumnByCell(index: number) {
		if (index >= 0 && index < 3) return cells.slice(0, 3);
		if (index >= 3 && index < 6) return cells.slice(3, 6);
		if (index >= 6 && index < 9) return cells.slice(6, 9);
	}

	function calculateCellMultiplier(value: number, index: number) {
		let column = getColumnByCell(index);
		if (!column) throw new Error("Column not found");

		if (!value) return 1;

		if (without(column, value).length === 0) return 3;
		if (without(column, value).length === 1) return 2;
		return 1;
	}

	function calculateColumnScore(column: number[]) {
		let score = 0;
		for (const cell of column) {
			if (without(column, cell).length === 0) {
				score += cell * 3;
			} else if (without(column, cell).length === 1) {
				score += cell * 2;
			} else {
				score += cell;
			}
		}

		return score;
	}

	function calculateScore(cells: number[]) {
		const col1 = calculateColumnScore(cells.slice(0, 3));
		const col2 = calculateColumnScore(cells.slice(3, 6));
		const col3 = calculateColumnScore(cells.slice(6, 9));
		return { col1, col2, col3, total: col1 + col2 + col3 };
	}

	$: score = calculateScore(cells);

	$: {
		console.log("[App State Updated]");
		console.log({ currentDice, score, cells });
	}
</script>

<main class="flex h-screen w-screen bg-zinc-900">
	<div class="flex h-full flex-1 flex-col items-center justify-end pb-36">
		<h2 class="mb-1 text-2xl font-bold text-zinc-100">Player</h2>
		<h3 class="mb-6 text-2xl font-bold text-zinc-100">{score.total}</h3>
		<div
			class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600"
		>
			<Dice value="{currentDice}" />
		</div>
	</div>

	<div
		class="flex h-full flex-1 flex-col justify-between border-x-8 border-red-700 bg-stone-500 p-12"
	>
		<!-- AI Board -->
		<div class="grid h-2/5 grid-cols-3 grid-rows-3 gap-2">
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
			<div class="bg-stone-800"></div>
		</div>

		<!-- Player Board -->
		<div
			class="relative grid h-2/5 grid-flow-col grid-cols-3 grid-rows-3 gap-2"
		>
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
					on:click="{() => putDice(index)}"
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
	</div>

	<div
		class="flex h-full flex-1 flex-col items-center justify-start gap-4 pt-36"
	>
		<div class="h-24 w-3/4 rounded-xl bg-stone-600"></div>
		<h2 class="text-2xl font-bold text-zinc-100">AI</h2>
	</div>
</main>
