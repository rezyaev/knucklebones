<script lang="ts">
	import "./app.css";
	import { random } from "lodash-es";
	import Dice from "./lib/Dice.svelte";
	import Board from "./lib/Board.svelte";
	import type { TPlayer } from "./types";
	import { calculateTotalScore } from "./lib/score";

	let currentTurn: "player1" | "ai" = "player1";
	let player1 = initPlayer();
	let ai = initPlayer();

	function initPlayer(): TPlayer {
		return {
			board: Array(9).fill(null),
			currentDice: random(1, 6),
		};
	}

	function updatePlayer(player: TPlayer, cellIndex: number): TPlayer {
		if (player.board[cellIndex]) return player;

		const updatedBoard = [
			...player.board.slice(0, cellIndex),
			player.currentDice,
			...player.board.slice(cellIndex + 1),
		];

		return {
			board: updatedBoard,
			currentDice: random(1, 6),
		};
	}

	function putDice(index: number) {
		if (currentTurn === "player1") {
			player1 = updatePlayer(player1, index);
			currentTurn = "ai";
		} else if (currentTurn === "ai") {
			ai = updatePlayer(ai, index);
			currentTurn = "player1";
		}
	}

	$: {
		console.clear();
		console.log(JSON.stringify({ player1, ai }, null, 4));
	}
</script>

<main class="flex h-screen w-screen bg-zinc-900">
	<div class="flex h-full flex-1 flex-col items-center justify-end pb-36">
		<h2 class="mb-1 text-2xl font-bold text-zinc-100">Player</h2>
		<h3 class="mb-6 text-2xl font-bold text-zinc-100">
			{calculateTotalScore(player1.board)}
		</h3>
		<div
			class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600"
		>
			<Dice value="{player1.currentDice}" />
		</div>
	</div>

	<div
		class="flex h-full flex-1 flex-col justify-between border-x-8 border-red-700 bg-stone-500 p-12"
	>
		<Board
			board="{ai.board}"
			columnScorePosition="bottom"
			disabled="{currentTurn !== 'ai'}"
			on:cellClick="{(event) => putDice(event.detail)}"
		/>

		<Board
			board="{player1.board}"
			columnScorePosition="top"
			disabled="{currentTurn !== 'player1'}"
			on:cellClick="{(event) => putDice(event.detail)}"
		/>
	</div>

	<div class="flex h-full flex-1 flex-col items-center justify-start pt-36">
		<div
			class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600"
		>
			<Dice value="{ai.currentDice}" />
		</div>
		<h3 class="mt-6 text-2xl font-bold text-zinc-100">
			{calculateTotalScore(ai.board)}
		</h3>
		<h2 class="mt-1 text-2xl font-bold text-zinc-100">AI</h2>
	</div>
</main>
