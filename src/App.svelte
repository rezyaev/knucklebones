<script lang="ts">
	import "./app.css";
	import { random, sum } from "lodash-es";
	import Dice from "./lib/Dice.svelte";
	import Cell from "./lib/Cell.svelte";

	let currentDice = random(1, 6);
	let cells = Array(9).fill(null);

	function putDice(index: number) {
		if (cells[index]) return;

		cells[index] = currentDice;
		currentDice = random(1, 6);
	}

	$: score = {
		total: sum(cells),
		col1: sum(cells.slice(0, 3)),
		col2: sum(cells.slice(3, 6)),
		col3: sum(cells.slice(6, 9)),
	};

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
				<Cell dice="{cell}" on:click="{() => putDice(index)}" />
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
