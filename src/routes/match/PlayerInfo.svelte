<script lang="ts">
	import { random } from "lodash-es";
	import { fly } from "svelte/transition";
	import { bounceOut } from "svelte/easing";

	import Dice from "./Dice.svelte";

	export let name: string;
	export let score: number;
	export let dice: number | null = null;

	let displayedDice: number;

	function createRandomDiceSequence(dice: number) {
		const length = random(2, 5);
		const diceSequence: number[] = [];

		for (let index = 0; index <= length; index++) {
			diceSequence[index] = random(1, 6);
		}

		diceSequence[length + 1] = dice as number;

		return diceSequence;
	}

	$: {
		if (dice) {
			const diceSequence = createRandomDiceSequence(dice);

			for (let index = 0; index < diceSequence.length; index++) {
				setTimeout(() => {
					const randomDice = diceSequence[index];
					displayedDice = randomDice;
				}, 100 * index);
			}
		}
	}
</script>

<div class="flex flex-col items-center justify-end">
	<h2 class="mb-1 text-2xl font-bold text-zinc-100">{name}</h2>
	<h3 class="mb-6 text-2xl font-bold text-zinc-100">{score}</h3>
	<div class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600">
		{#if dice}
			<div in:fly="{{ duration: 1000, x: -100, opacity: 1 }}">
				<div in:fly="{{ duration: 1000, y: -10, opacity: 1, easing: bounceOut }}">
					<Dice value="{displayedDice}" />
				</div>
			</div>
		{/if}
	</div>
</div>
