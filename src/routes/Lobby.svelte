<script lang="ts">
	import Peer from "peerjs";
	import { nanoid } from "nanoid";
	import { connection } from "../lib/stores/connection";
	import { push } from "svelte-spa-router";
	import Button from "../lib/components/Button.svelte";
	import DicePatternBackground from "../lib/components/DicePatternBackground.svelte";

	const id = nanoid(8);
	const peer = new Peer(id);

	let state: "wait" | "create" | "connect" = "wait";
	let lobbyId: string;

	function handleCreateButtonClick() {
		state = "create";
		peer.on("connection", (conn) => {
			connection.set(conn);
			push("#/match/OPvP/player1");
		});
	}

	function handleConnectButtonClick() {
		state = "connect";
	}

	function handleConnectFormSubmit() {
		connection.set(peer.connect(lobbyId));
		$connection.on("open", () => push("#/match/OPvP/player2"));
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center text-zinc-100">
	<DicePatternBackground />

	{#if state === "wait"}
		<h1 class="mb-24 text-5xl font-bold">Lobby</h1>
		<div class="flex items-center justify-center gap-16">
			<Button type="button" on:click="{handleCreateButtonClick}">Create</Button>
			<Button type="button" on:click="{handleConnectButtonClick}">Connect</Button>
		</div>
	{:else if state === "create"}
		<p class="mb-8 text-3xl font-bold">Your Lobby ID</p>
		<code class="rounded-xl bg-zinc-600 px-12 py-6 font-mono text-5xl font-bold">{id}</code>
	{:else if state === "connect"}
		<form
			class="flex flex-col items-center justify-center"
			on:submit|preventDefault="{handleConnectFormSubmit}"
		>
			<label for="lobby-id" class="mb-8 text-3xl font-bold">Enter Lobby ID</label>
			<input
				type="text"
				id="lobby-id"
				bind:value="{lobbyId}"
				class="mb-12 w-80 rounded-xl bg-zinc-600 px-12 py-6 font-mono text-5xl font-bold"
			/>
			<Button type="submit">Connect</Button>
		</form>
	{/if}
</div>
