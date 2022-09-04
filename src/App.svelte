<script lang="ts">
	import "./app.css";
	import Router from "svelte-spa-router";
	import Home from "./routes/Home.svelte";
	import Match from "./routes/match/Match.svelte";
	import Lobby from "./routes/Lobby.svelte";

	const routes = {
		"/": Home,
		"/lobby": Lobby,
		"/match/:gamemode/:turn?": Match,
	};
</script>

<main class="h-screen w-screen">
	<Router routes="{routes}" />
</main>
