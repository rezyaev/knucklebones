<script lang="ts">
	import "./app.css";
	import { clone, random } from "lodash-es";
	import Dice from "./lib/components/Dice.svelte";
	import Board from "./lib/components/Board.svelte";
	import type { TPlayer } from "./types";
	import { calculateTotalScore } from "./lib/utils/score";
	import { createMoveIndex } from "./lib/utils/ai";
	import { getColumnIndexesByCellIndex, type TBoard } from "./lib/utils/board";

	const gamemode: "PvAI" | "LPvP" | "OPvP" = "PvAI";

	let currentTurn: "p1" | "p2" = "p1";
	let player1 = initPlayer();
	let player2 = initPlayer();

	function initPlayer(): TPlayer {
		return {
			board: Array(9).fill(null),
			currentDice: random(1, 6),
		};
	}

	function putDice(board: TBoard, dice: number, index: number): TBoard {
		return [...board.slice(0, index), dice, ...board.slice(index + 1)];
	}

	function removeSameDice(board: TBoard, dice: number, index: number): TBoard {
		const sameColumnIndexes = getColumnIndexesByCellIndex(index);
		const updatedBoard = clone(board);

		for (const index of sameColumnIndexes) {
			updatedBoard[index] = board[index] === dice ? null : board[index];
		}

		return updatedBoard;
	}

	function handleCellClick(index: number) {
		if (currentTurn === "p1") {
			player1.board = putDice(player1.board, player1.currentDice, index);
			player2.board = removeSameDice(player2.board, player1.currentDice, index);
			player1.currentDice = random(1, 6);
			currentTurn = "p2";
		} else if (currentTurn === "p2") {
			player2.board = putDice(player2.board, player2.currentDice, index);
			player1.board = removeSameDice(player1.board, player2.currentDice, index);
			player2.currentDice = random(1, 6);
			currentTurn = "p1";
		}

		if (gamemode === "PvAI" && currentTurn === "p2") {
			handleCellClick(createMoveIndex(player2.board));
		}
	}

	$: {
		console.log("[App State Updated]", { player1, player2 });
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
			board="{player2.board}"
			columnScorePosition="bottom"
			disabled="{gamemode === 'PvAI'}"
			on:cellClick="{(event) => handleCellClick(event.detail)}"
		/>

		<Board
			board="{player1.board}"
			columnScorePosition="top"
			disabled="{currentTurn !== 'p1'}"
			on:cellClick="{(event) => handleCellClick(event.detail)}"
		/>
	</div>

	<div class="flex h-full flex-1 flex-col items-center justify-start pt-36">
		<div
			class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600"
		>
			<Dice value="{player2.currentDice}" />
		</div>
		<h3 class="mt-6 text-2xl font-bold text-zinc-100">
			{calculateTotalScore(player2.board)}
		</h3>
		<h2 class="mt-1 text-2xl font-bold text-zinc-100">AI</h2>
	</div>
</main>
