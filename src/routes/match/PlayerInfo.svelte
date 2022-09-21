<script lang="ts">
	import { random } from "lodash-es";
	import { fly } from "svelte/transition";
	import { bounceOut } from "svelte/easing";
	import Dice from "./Dice.svelte";
	import { diceCrossfade, diceCrossfadeKey } from "./utils";

	const [send, receive] = diceCrossfade;

	export let name: string;
	export let score: number;
	export let dice: number | null = null;
	export let reverse: boolean = false;

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

<div class="flex flex-col items-center justify-end" class:flex-col-reverse="{reverse}">
	<h2 class="text-2xl font-bold text-zinc-100">{name}</h2>
	<h3 class="my-0.5 text-2xl font-bold text-zinc-100">{score}</h3>
	<div class="my-4 flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600">
		{#if dice}
			<div
				in:fly="{{ duration: 1000, x: reverse ? 100 : -100, opacity: 1 }}"
				out:send="{{ key: diceCrossfadeKey }}"
			>
				<div in:fly="{{ duration: 1000, y: -10, opacity: 1, easing: bounceOut }}">
					<Dice value="{displayedDice}" />
				</div>
			</div>
		{/if}
	</div>
</div>
