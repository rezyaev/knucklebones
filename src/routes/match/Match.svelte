<script lang="ts">
	import { clone, random } from "lodash-es";
	import Dice from "./Dice.svelte";
	import Board from "./Board.svelte";
	import type { TColumn, TGamemode, TBoard } from "../../types";
	import { calculateTotalScore } from "./utils";
	import { createMoveIndex } from "./utils";
	import { connection, isTMessage } from "../../lib/stores/connection";
	import PlayerInfo from "./PlayerInfo.svelte";

	export let params: { gamemode?: TGamemode; turn?: "player1" | "player2" } = {};
	if (!params.gamemode) {
		throw new Error("Gamemode hasn't been passed");
	}

	let gamemode = params.gamemode;
	let winner: "player1" | "player2" | null = null;
	let currentTurn: "player1" | "player2" = params.turn ?? "player1";
	let currentDice = random(1, 6);
	let board = {
		player1: Array(3).fill(Array(3).fill(null)) as TBoard,
		player2: Array(3).fill(Array(3).fill(null)) as TBoard,
	};

	if (gamemode === "OPvP") {
		$connection.on("data", (message) => handleDataConnection(message));
	}

	function getPlayerName(player: "player1" | "player2") {
		if (player === "player1") return "Player 1";

		if (gamemode === "PvAI") return "AI";

		return "Player 2";
	}

	function getLoser(winner: "player1" | "player2") {
		if (winner === "player1") return "player2";
		return "player1";
	}

	function putDice(column: TColumn, dice: number): TColumn {
		const updatedColumn = clone(column);
		updatedColumn[updatedColumn.indexOf(null)] = dice;
		return updatedColumn;
	}

	function putDiceRight(column: TColumn, dice: number): TColumn {
		const updatedColumn = clone(column);
		updatedColumn[updatedColumn.lastIndexOf(null)] = dice;
		return updatedColumn;
	}

	function removeSameDice(column: TColumn, dice: number): TColumn {
		return column.map((cell) => (cell === dice ? null : cell)) as TColumn;
	}

	function checkWinner() {
		if (board.player1.flat().includes(null) && board.player2.flat().includes(null)) {
			return null;
		} else if (calculateTotalScore(board.player1) > calculateTotalScore(board.player2)) {
			return "player1";
		} else {
			return "player2";
		}
	}

	function handleColumnClick(index: number) {
		if (currentTurn === "player1") {
			board.player1[index] = putDice(board.player1[index], currentDice);
			board.player2[index] = removeSameDice(board.player2[index], currentDice);
			currentTurn = "player2";

			if (gamemode === "OPvP") {
				$connection.send({ type: "move", data: { index, dice: currentDice } });
			} else if (gamemode === "PvAI") {
				setTimeout(() => {
					currentDice = random(1, 6);
					handleColumnClick(createMoveIndex(board.player2));
				}, 100);
			}
		} else if (currentTurn === "player2") {
			board.player2[index] = putDiceRight(board.player2[index], currentDice);
			board.player1[index] = removeSameDice(board.player1[index], currentDice);
			currentTurn = "player1";
		}

		currentDice = random(1, 6);
		winner = checkWinner();
	}

	function handleDataConnection(message: unknown) {
		if (!isTMessage(message)) return;
		currentDice = message.data.dice;
		handleColumnClick(message.data.index);
	}
</script>

<div class="flex h-full w-full bg-zinc-900">
	{#if winner}
		<div class="fixed flex h-full w-full items-center justify-center">
			<p class="bg-zinc-900 px-24 py-6 text-5xl font-bold text-zinc-100">
				{getPlayerName(winner)} wins {calculateTotalScore(board[winner])}
				-
				{calculateTotalScore(board[getLoser(winner)])}
			</p>
		</div>
	{/if}

	<div class="flex h-full flex-1 flex-col justify-end pb-36">
		<PlayerInfo
			name="{getPlayerName('player1')}"
			score="{calculateTotalScore(board.player1)}"
			dice="{currentTurn === 'player1' ? currentDice : null}"
		/>
	</div>

	<div
		class="flex h-full flex-1 flex-col justify-between border-x-8 border-red-700 bg-stone-500 px-12 py-3"
	>
		<Board
			board="{board.player2}"
			columnScorePosition="bottom"
			disabled="{gamemode === 'PvAI'}"
			on:columnClick="{(event) => handleColumnClick(event.detail)}"
		/>

		<Board
			board="{board.player1}"
			columnScorePosition="top"
			disabled="{currentTurn !== 'player1'}"
			on:columnClick="{(event) => handleColumnClick(event.detail)}"
		/>
	</div>

	<div class="flex h-full flex-1 flex-col items-center justify-start pt-36">
		<div class="flex h-24 w-3/4 items-center justify-center rounded-xl bg-stone-600">
			{#if currentTurn === "player2" && gamemode !== "OPvP"}
				<Dice value="{currentDice}" />
			{/if}
		</div>
		<h3 class="mt-6 text-2xl font-bold text-zinc-100">
			{calculateTotalScore(board.player2)}
		</h3>
		<h2 class="mt-1 text-2xl font-bold text-zinc-100">{getPlayerName("player2")}</h2>
	</div>
</div>
