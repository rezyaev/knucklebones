<script lang="ts">
	import "./app.css";
	import { random } from "lodash-es";
	import Dice from "./lib/Dice.svelte";

	let currentDice = random(1, 6);

	console.log({ currentDice });
</script>

<main class="flex h-screen w-screen bg-zinc-900">
	<div class="flex h-full flex-1 flex-col items-center justify-end gap-4 pb-36">
		<h2 class="text-2xl font-bold text-zinc-100">Player</h2>
		<div
			class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600"
		>
			<Dice value="{currentDice}" />
		</div>
	</div>

	<div
		class="flex h-full flex-1 flex-col justify-between border-x-8 border-red-700 bg-stone-500 p-12"
	>
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
	</div>

	<div
		class="flex h-full flex-1 flex-col items-center justify-start gap-4 pt-36"
	>
		<div class="h-24 w-3/4 rounded-xl bg-stone-600"></div>
		<h2 class="text-2xl font-bold text-zinc-100">AI</h2>
	</div>
</main>
