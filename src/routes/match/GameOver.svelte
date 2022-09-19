<script lang="ts">
	import { calculateTotalScore, getPlayerName } from "./utils";
	import Button from "../../lib/components/Button.svelte";
	import type { TBoard } from "src/types";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let winner: "player1" | "player2";
	export let board: { player1: TBoard; player2: TBoard };

	function getLoser(winner: "player1" | "player2") {
		if (winner === "player1") return "player2";
		return "player1";
	}
</script>

<div class="fixed z-50 flex h-full w-full flex-col items-center justify-center">
	<div class="absolute -z-50 h-full w-full bg-zinc-900 opacity-80"></div>
	<p class="mb-12 text-5xl font-bold text-zinc-100">
		{getPlayerName(winner)} wins {calculateTotalScore(board[winner])}
		-
		{calculateTotalScore(board[getLoser(winner)])}
	</p>

	<div class="flex items-center justify-center gap-16">
		<Button type="button" href="#/">Quit</Button>
		<Button type="button" on:click="{() => dispatch('restartClick')}">Restart</Button>
	</div>
</div>
