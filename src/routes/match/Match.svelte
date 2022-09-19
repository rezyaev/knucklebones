<script lang="ts">
	import { clone, random } from "lodash-es";
	import Board from "./Board.svelte";
	import type { TColumn, TGamemode, TBoard } from "../../types";
	import { calculateTotalScore, getPlayerName } from "./utils";
	import { createMoveIndex } from "./utils";
	import { connection, isTMessage } from "../../lib/stores/connection";
	import PlayerInfo from "./PlayerInfo.svelte";
	import GameOver from "./GameOver.svelte";

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
		$connection.on("data", (message) => {
			if (!isTMessage(message)) return;

			if (message.type === "move" && message.data) {
				currentDice = message.data.dice;
				handleColumnClick(message.data.index);
			} else if (message.type === "restart") {
				handleRestartClick({ disableMessage: true });
			}
		});
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
		if (winner) return;

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
				}, 1000);
			}
		} else if (currentTurn === "player2") {
			board.player2[index] = putDiceRight(board.player2[index], currentDice);
			board.player1[index] = removeSameDice(board.player1[index], currentDice);
			currentTurn = "player1";
		}

		currentDice = random(1, 6);
		winner = checkWinner();
	}

	function handleRestartClick({ disableMessage }: { disableMessage?: boolean } = {}) {
		if (gamemode === "OPvP" && !disableMessage) {
			$connection.send({ type: "restart" });
		}

		winner = null;
		currentTurn = params.turn ?? "player1";
		currentDice = random(1, 6);
		board = {
			player1: Array(3).fill(Array(3).fill(null)) as TBoard,
			player2: Array(3).fill(Array(3).fill(null)) as TBoard,
		};
	}
</script>

<div class="flex h-full w-full bg-zinc-900">
	{#if winner}
		<GameOver winner="{winner}" board="{board}" on:restartClick="{() => handleRestartClick()}" />
	{/if}

	<div class="flex h-full flex-1 flex-col justify-end pb-32">
		<PlayerInfo
			name="{getPlayerName('player1', gamemode)}"
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
			disabled="{winner !== null && gamemode !== 'LPvP'}"
			on:columnClick="{(event) => handleColumnClick(event.detail)}"
		/>

		<Board
			board="{board.player1}"
			columnScorePosition="top"
			disabled="{winner !== null && currentTurn !== 'player1'}"
			on:columnClick="{(event) => handleColumnClick(event.detail)}"
		/>
	</div>

	<div class="flex h-full flex-1 flex-col justify-start pt-32">
		<PlayerInfo
			name="{getPlayerName('player2')}"
			score="{calculateTotalScore(board.player2)}"
			dice="{currentTurn === 'player2' ? currentDice : null}"
			reverse="{true}"
		/>
	</div>
</div>
